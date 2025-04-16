const request = require("supertest");
const express = require("express");
const userController = require("./userController");

jest.mock("../services/userService");
const userService = require("../services/userService");

const app = express();
app.use(express.json());

// Mock logger middleware
app.use((req, res, next) => {
  req.logger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
  };
  next();
});

app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

describe("userController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      userService.getUsers.mockResolvedValue([
        { id: 1, name: "A", email: "a@a.com" }
      ]);
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: "A", email: "a@a.com" }]);
    });
    it("should handle errors", async () => {
      userService.getUsers.mockRejectedValue(new Error("fail"));
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(500);
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      userService.getUserById.mockResolvedValue({
        id: 1,
        name: "A",
        email: "a@a.com"
      });
      const res = await request(app).get("/users/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ id: 1, name: "A", email: "a@a.com" });
    });
    it("should return 404 if not found", async () => {
      userService.getUserById.mockResolvedValue(null);
      const res = await request(app).get("/users/99");
      expect(res.statusCode).toBe(404);
    });
    it("should handle errors", async () => {
      userService.getUserById.mockRejectedValue(new Error("fail"));
      const res = await request(app).get("/users/1");
      expect(res.statusCode).toBe(500);
    });
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      userService.createUser.mockResolvedValue({
        id: 2,
        name: "B",
        email: "b@b.com"
      });
      const res = await request(app)
        .post("/users")
        .send({ name: "B", email: "b@b.com" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ id: 2, name: "B", email: "b@b.com" });
    });
    it("should validate input", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "", email: "bad" });
      expect(res.statusCode).toBe(400);
    });
    it("should handle errors", async () => {
      userService.createUser.mockRejectedValue(new Error("fail"));
      const res = await request(app)
        .post("/users")
        .send({ name: "B", email: "b@b.com" });
      expect(res.statusCode).toBe(500);
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      userService.updateUser.mockResolvedValue({
        id: 1,
        name: "C",
        email: "c@c.com"
      });
      const res = await request(app)
        .put("/users/1")
        .send({ name: "C", email: "c@c.com" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ id: 1, name: "C", email: "c@c.com" });
    });
    it("should validate input", async () => {
      const res = await request(app)
        .put("/users/1")
        .send({ name: "", email: "bad" });
      expect(res.statusCode).toBe(400);
    });
    it("should return 404 if not found", async () => {
      userService.updateUser.mockResolvedValue(null);
      const res = await request(app)
        .put("/users/99")
        .send({ name: "C", email: "c@c.com" });
      expect(res.statusCode).toBe(404);
    });
    it("should handle errors", async () => {
      userService.updateUser.mockRejectedValue(new Error("fail"));
      const res = await request(app)
        .put("/users/1")
        .send({ name: "C", email: "c@c.com" });
      expect(res.statusCode).toBe(500);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      userService.deleteUser.mockResolvedValue(true);
      const res = await request(app).delete("/users/1");
      expect(res.statusCode).toBe(204);
    });
    it("should return 404 if not found", async () => {
      userService.deleteUser.mockResolvedValue(false);
      const res = await request(app).delete("/users/99");
      expect(res.statusCode).toBe(404);
    });
    it("should handle errors", async () => {
      userService.deleteUser.mockRejectedValue(new Error("fail"));
      const res = await request(app).delete("/users/1");
      expect(res.statusCode).toBe(500);
    });
  });
});
