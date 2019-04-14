import "babel-polyfill";
import request from "supertest";
import { app } from "../../index";
import { Category } from "../../models/category";

describe("/api/category", () => {
  afterEach(async () => {
    await Category.remove({});
  });
  describe("GET", () => {
    it("should get all food categories", async () => {
      await Category.collection.insertMany([
        { name: "fruits" },
        { name: "protein" }
      ]);

      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "fruits")).toBeTruthy();
      expect(res.body.some(g => g.name === "protein")).toBeTruthy();
    });
  });
});
