import "babel-polyfill";
import request from "supertest";
import { app } from "../../index";
import { Food } from "../../models/food";

describe("/api/foods", () => {
  describe("GET", () => {
    it("should get all foods", async () => {
      const res = await request(app).get("/api/foods");
      expect(res.status).toBe(200);
    });
  });
});
