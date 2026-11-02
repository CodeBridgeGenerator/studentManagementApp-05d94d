
    module.exports = function (app) {
        const modelName = "enrollments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            student: { type: Schema.Types.ObjectId, ref: "students", comment: "Student, dropdown, false, true, true, true, true, true, true, students, students, one-to-one, firstName," },
course: { type: Schema.Types.ObjectId, ref: "courses", comment: "Course, dropdown, false, true, true, true, true, true, true, courses, courses, one-to-one, courseName," },
semester: { type:  String , maxLength: 150, index: true, trim: true, comment: "Semester, p, false, true, true, true, true, true, true, , , , ," },
year: { type: Number, max: 10000000, comment: "Year, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type: Boolean, required: false, comment: "Status, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };