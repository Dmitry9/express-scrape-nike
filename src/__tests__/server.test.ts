import supertest from "supertest";
import { createServer } from "../server";

jest.mock("../helpers/worker.ts", () => ({
  scrapeNikeProduct: jest.fn(), // TODO create tests for scrapeNikeProduct
}));

describe("server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/healthz")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
});
