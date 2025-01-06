const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const app = require("../app");

describe("Anonymous user accessing", () => {
    test("public endpoint should receive a '200: Success' response", async () => {
        const res = await request(app).get("/api/messages/public");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ "text": "This is a public message." });
    });

    test("protected endpoint should receive a '401: Unauthorized' response", async () => {
        const res = await request(app).get("/api/messages/protected");
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ "message": "Requires authentication" });
    });
    
    test("admin endpoint should receive a '401: Unauthorized' response", async () => {
        const res = await request(app).get("/api/messages/admin");
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ "message": "Requires authentication" });
    });

    test("invalid endpoint should receive a '404: Not Found' response", async () => {
        const res = await request(app).get("/api/messages/invalid");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ "message": "Not Found" });
    });

    test("misc errors should receive a '500: Internal Server Error' response", async () => {
        const res = await request(app).get("/api/messages/error");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ "message": "Internal Server Error" });
    });
});

describe("Authorized user accessing", () => {
    test("public endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/public")
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
            expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is a public message." });
    });
    
    test("protected endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/protected")
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is a protected message." });
    });

    test("admin endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/admin")
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is an admin message." });
    });

    test("invalid endpoint should receive a '404: Not Found' response", async () => {
        const res = await request(app)
            .get("/api/messages/invalid")
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ "message": "Not Found" });
    });

    test("misc errors should receive a '500: Internal Server Error' response", async () => {
        const res = await request(app)
            .get("/api/messages/error")
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ "message": "Internal Server Error" });
    });
});

describe("Unauthorized user accessing", () => {
    test("public endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/public")
            .set('Authorization', `Bearer invalidtoken1234567890`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is a public message." });
    });
    
    test("protected endpoint should receive a '401: Bad Credentials' response", async () => {
        const res = await request(app)
            .get("/api/messages/protected")
            .set('Authorization', `Bearer invalidtoken1234567890`);
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ "message": "Bad credentials" });
    });

    test("admin endpoint should receive a '401: Bad Credentials' response", async () => {
        const res = await request(app)
            .get("/api/messages/admin")
            .set('Authorization', `Bearer invalidtoken1234567890`);
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ "message": "Bad credentials" });
    });

    test("invalid endpoint should receive a '404: Not Found' response", async () => {
        const res = await request(app)
            .get("/api/messages/invalid")
            .set('Authorization', `Bearer invalidtoken1234567890`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ "message": "Not Found" });
    });

    test("misc errors should receive a '500: Internal Server Error' response", async () => {
        const res = await request(app)
            .get("/api/messages/error")
            .set('Authorization', `Bearer invalidtoken1234567890`);
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ "message": "Internal Server Error" });
    });
});
