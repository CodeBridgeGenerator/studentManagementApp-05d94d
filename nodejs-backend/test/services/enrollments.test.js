const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("enrollments service", async () => {
  let thisService;
  let enrollmentCreated;
  let usersServiceResults;
  let users;

  const studentsCreated = await app.service("students").Model.create({"student":"parentObjectId","firstName":"new value","lastName":"new value","email":"new value","phone":"new value","enrollmentDate":"2026-11-02T03:03:36.229Z","active":true});
const coursesCreated = await app.service("courses").Model.create({"student":`${studentsCreated._id}`,"firstName":"new value","lastName":"new value","email":"new value","phone":"new value","enrollmentDate":"2026-11-02T03:03:36.229Z","active":true,"course":"parentObjectId","courseName":"new value","description":"new value","instructor":"new value","startDate":"2026-11-02T03:03:36.229Z","endDate":"2026-11-02T03:03:36.229Z"});

  beforeEach(async () => {
    thisService = await app.service("enrollments");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (enrollments)");
  });

  describe("#create", () => {
    const options = {"student":`${studentsCreated._id}`,"firstName":"new value","lastName":"new value","email":"new value","phone":"new value","enrollmentDate":"2026-11-02T03:03:36.229Z","active":true,"course":`${coursesCreated._id}`,"courseName":"new value","description":"new value","instructor":"new value","startDate":"2026-11-02T03:03:36.229Z","endDate":"2026-11-02T03:03:36.229Z","semester":"new value","year":23,"status":true};

    beforeEach(async () => {
      enrollmentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new enrollment", () => {
      assert.strictEqual(enrollmentCreated.student.toString(), options.student.toString());
assert.strictEqual(enrollmentCreated.course.toString(), options.course.toString());
assert.strictEqual(enrollmentCreated.semester, options.semester);
assert.strictEqual(enrollmentCreated.year, options.year);
assert.strictEqual(enrollmentCreated.status, options.status);
assert.strictEqual(enrollmentCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a enrollment by ID", async () => {
      const retrieved = await thisService.Model.findById(enrollmentCreated._id);
      assert.strictEqual(retrieved._id.toString(), enrollmentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"student":`${studentsCreated._id}`,"course":`${coursesCreated._id}`,"semester":"updated value","year":100,"status":false};

    it("should update an existing enrollment ", async () => {
      const enrollmentUpdated = await thisService.Model.findByIdAndUpdate(
        enrollmentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(enrollmentUpdated.student.toString(), options.student.toString());
assert.strictEqual(enrollmentUpdated.course.toString(), options.course.toString());
assert.strictEqual(enrollmentUpdated.semester, options.semester);
assert.strictEqual(enrollmentUpdated.year, options.year);
assert.strictEqual(enrollmentUpdated.status, options.status);
assert.strictEqual(enrollmentUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a enrollment", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("students").Model.findByIdAndDelete(studentsCreated._id);
await app.service("courses").Model.findByIdAndDelete(coursesCreated._id);;

      const enrollmentDeleted = await thisService.Model.findByIdAndDelete(enrollmentCreated._id);
      assert.strictEqual(enrollmentDeleted._id.toString(), enrollmentCreated._id.toString());
    });
  });
});