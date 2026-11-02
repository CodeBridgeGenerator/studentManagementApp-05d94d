
    module.exports = function (app) {
        const modelName = "students";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            firstName: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "First Name, p, false, true, true, true, true, true, true, , , , ," },
lastName: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Last Name, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , maxLength: 150, index: true, trim: true, comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
enrollmentDate: { type: Date, comment: "Enrollment Date, p_date, false, true, true, true, true, true, true, , , , ," },
active: { type: Boolean, required: false, comment: "Active, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };