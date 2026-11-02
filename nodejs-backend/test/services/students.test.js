const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("students service", async () => {
  let thisService;
  let studentCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("students");

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
    assert.ok(thisService, "Registered the service (students)");
  });

  describe("#create", () => {
    const options = {"firstName":"new value","lastName":"new value","email":"new value","phone":"new value","enrollmentDate":"2026-11-02T03:03:36.201Z","active":true};

    beforeEach(async () => {
      studentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new student", () => {
      assert.strictEqual(studentCreated.firstName, options.firstName);
assert.strictEqual(studentCreated.lastName, options.lastName);
assert.strictEqual(studentCreated.email, options.email);
assert.strictEqual(studentCreated.phone, options.phone);
assert.strictEqual(studentCreated.enrollmentDate.toISOString(), options.enrollmentDate);
assert.strictEqual(studentCreated.active, options.active);
assert.strictEqual(studentCreated.active, options.active);
    });
  });

  describe("#get", () => {
    it("should retrieve a student by ID", async () => {
      const retrieved = await thisService.Model.findById(studentCreated._id);
      assert.strictEqual(retrieved._id.toString(), studentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"firstName":"updated value","lastName":"updated value","email":"updated value","phone":"updated value","enrollmentDate":"2026-11-02T03:03:36.201Z","active":false};

    it("should update an existing student ", async () => {
      const studentUpdated = await thisService.Model.findByIdAndUpdate(
        studentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(studentUpdated.firstName, options.firstName);
assert.strictEqual(studentUpdated.lastName, options.lastName);
assert.strictEqual(studentUpdated.email, options.email);
assert.strictEqual(studentUpdated.phone, options.phone);
assert.strictEqual(studentUpdated.enrollmentDate.toISOString(), options.enrollmentDate);
assert.strictEqual(studentUpdated.active, options.active);
assert.strictEqual(studentUpdated.active, options.active);
    });
  });

  describe("#delete", async () => {
    it("should delete a student", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const studentDeleted = await thisService.Model.findByIdAndDelete(studentCreated._id);
      assert.strictEqual(studentDeleted._id.toString(), studentCreated._id.toString());
    });
  });
});