import request from "supertest";
import app from "../app";

import * as userService from "../services/user.service";

jest.mock("../services/user.service");
describe("User API", () => {
  describe("GET /api/users", () => {
    it("should return status 200", async () => {

      (userService.getAllUsersService as jest.Mock)
        .mockResolvedValue([
          {
            id: 1,
            name: "Bhavya"
          }
        ]);

      const response = await request(app)
        .get("/api/users");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        data: [
          {
            id: 1,
            name: "Bhavya"
          }
        ]
      });
    });
  });
});