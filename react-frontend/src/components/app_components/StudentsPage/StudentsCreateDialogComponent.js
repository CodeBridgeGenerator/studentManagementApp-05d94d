import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const StudentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {active: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.firstName)) {
                error["firstName"] = `First Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.lastName)) {
                error["lastName"] = `Last Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.email)) {
                error["email"] = `Email field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            firstName: _entity?.firstName,lastName: _entity?.lastName,email: _entity?.email,phone: _entity?.phone,enrollmentDate: _entity?.enrollmentDate,active: _entity?.active || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("students").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Students created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Students" });
        }
        setLoading(false);
    };

    

    

    

    
    
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Students" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="students-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstName">First Name:</label>
                <InputText id="firstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstName} onChange={(e) => setValByKey("firstName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstName"]) ? (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lastName">Last Name:</label>
                <InputText id="lastName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lastName} onChange={(e) => setValByKey("lastName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lastName"]) ? (
              <p className="m-0" key="error-lastName">
                {error["lastName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="email">Email:</label>
                <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["email"]) ? (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phone">Phone:</label>
                <InputText id="phone" className="w-full mb-3 p-inputtext-sm" value={_entity?.phone} onChange={(e) => setValByKey("phone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phone"]) ? (
              <p className="m-0" key="error-phone">
                {error["phone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="enrollmentDate">Enrollment Date:</label>
                <Calendar id="enrollmentDate"  value={_entity?.enrollmentDate ? new Date(_entity?.enrollmentDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("enrollmentDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["enrollmentDate"]) ? (
              <p className="m-0" key="error-enrollmentDate">
                {error["enrollmentDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="active">Active:</label>
                <Checkbox id="active" className="ml-3" checked={_entity?.active} onChange={(e) => setValByKey("active", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["active"]) ? (
              <p className="m-0" key="error-active">
                {error["active"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StudentsCreateDialogComponent);
