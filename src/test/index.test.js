const request = require("supertest");
const app = require("../../app");
const { appName } = require("../../config");

describe("Test root and undefined paths", () => {
    test(`Should return the root path text: ${appName} is Online!`, async () => {
        const response = await request(app).get("/");
        expect(response.text).toBe(`${appName} is Online!`);
    });

    test("Should return the root path status 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("Should return 404 for route not found", async () => {
        const response = await request(app).get("/some-undefined-route");
        expect(response.statusCode).toBe(404);
    });

    test("Should return Cannot GET /some-undefined-route", async () => {
        const response = await request(app).get("/some-undefined-route");
        expect(response.body.message).toBe("Cannot GET /some-undefined-route");    
    });
});
