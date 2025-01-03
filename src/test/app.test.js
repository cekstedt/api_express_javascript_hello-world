const request = require("supertest");
const app = require("../app");
const messagesService = require("../messages/messages.service");

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
            .set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNCczltYXFaZXBKSlRzM09aLTV5QSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MGszeDJnYnhxbzYzZTZrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZWxsby13b3JsZC5leGFtcGxlLmNvbSIsImlhdCI6MTczNTg0Njc1OCwiZXhwIjoxNzM1OTMzMTU4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudiJ9.lK6r_b6smW1Y0eqjvE9T95pjbzwVeluEOYo0XJzYv7YjlhJNImT6Q4hEjLDjfGper64UqUlHctPlBzMaEZSZF5E5Fx307ytmfJOf1Evuj344_FSGycotqDZlCGiGaUbNzIuw6dFC70PnPqA2BykSGyB3r8-zvn1ICAuZa7sLxriKu3Vn4qDhGRGo4SUYzfEaEHFnBVC494HoUth51WWabssANoXNfnvF15gYZz22uSFlKrOqSOVrxfNH2txJN-ZBxUWQs5toqXCLgALYKP_wTfWQwjaTY_gZBZ8YWIDICBSKil1Q2BjStUOYKJJAI3M30luQEzHREqPAdvyxe4ZCtQ`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is a public message." });
    });
    
    test("protected endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/protected")
            .set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNCczltYXFaZXBKSlRzM09aLTV5QSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MGszeDJnYnhxbzYzZTZrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZWxsby13b3JsZC5leGFtcGxlLmNvbSIsImlhdCI6MTczNTg0Njc1OCwiZXhwIjoxNzM1OTMzMTU4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudiJ9.lK6r_b6smW1Y0eqjvE9T95pjbzwVeluEOYo0XJzYv7YjlhJNImT6Q4hEjLDjfGper64UqUlHctPlBzMaEZSZF5E5Fx307ytmfJOf1Evuj344_FSGycotqDZlCGiGaUbNzIuw6dFC70PnPqA2BykSGyB3r8-zvn1ICAuZa7sLxriKu3Vn4qDhGRGo4SUYzfEaEHFnBVC494HoUth51WWabssANoXNfnvF15gYZz22uSFlKrOqSOVrxfNH2txJN-ZBxUWQs5toqXCLgALYKP_wTfWQwjaTY_gZBZ8YWIDICBSKil1Q2BjStUOYKJJAI3M30luQEzHREqPAdvyxe4ZCtQ`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is a protected message." });
    });

    test("admin endpoint should receive a '200: Success' response", async () => {
        const res = await request(app)
            .get("/api/messages/admin")
            .set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNCczltYXFaZXBKSlRzM09aLTV5QSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MGszeDJnYnhxbzYzZTZrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZWxsby13b3JsZC5leGFtcGxlLmNvbSIsImlhdCI6MTczNTg0Njc1OCwiZXhwIjoxNzM1OTMzMTU4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudiJ9.lK6r_b6smW1Y0eqjvE9T95pjbzwVeluEOYo0XJzYv7YjlhJNImT6Q4hEjLDjfGper64UqUlHctPlBzMaEZSZF5E5Fx307ytmfJOf1Evuj344_FSGycotqDZlCGiGaUbNzIuw6dFC70PnPqA2BykSGyB3r8-zvn1ICAuZa7sLxriKu3Vn4qDhGRGo4SUYzfEaEHFnBVC494HoUth51WWabssANoXNfnvF15gYZz22uSFlKrOqSOVrxfNH2txJN-ZBxUWQs5toqXCLgALYKP_wTfWQwjaTY_gZBZ8YWIDICBSKil1Q2BjStUOYKJJAI3M30luQEzHREqPAdvyxe4ZCtQ`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ text: "This is an admin message." });
    });

    test("invalid endpoint should receive a '404: Not Found' response", async () => {
        const res = await request(app)
            .get("/api/messages/invalid")
            .set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNCczltYXFaZXBKSlRzM09aLTV5QSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MGszeDJnYnhxbzYzZTZrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZWxsby13b3JsZC5leGFtcGxlLmNvbSIsImlhdCI6MTczNTg0Njc1OCwiZXhwIjoxNzM1OTMzMTU4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudiJ9.lK6r_b6smW1Y0eqjvE9T95pjbzwVeluEOYo0XJzYv7YjlhJNImT6Q4hEjLDjfGper64UqUlHctPlBzMaEZSZF5E5Fx307ytmfJOf1Evuj344_FSGycotqDZlCGiGaUbNzIuw6dFC70PnPqA2BykSGyB3r8-zvn1ICAuZa7sLxriKu3Vn4qDhGRGo4SUYzfEaEHFnBVC494HoUth51WWabssANoXNfnvF15gYZz22uSFlKrOqSOVrxfNH2txJN-ZBxUWQs5toqXCLgALYKP_wTfWQwjaTY_gZBZ8YWIDICBSKil1Q2BjStUOYKJJAI3M30luQEzHREqPAdvyxe4ZCtQ`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ "message": "Not Found" });
    });

    test("misc errors should receive a '500: Internal Server Error' response", async () => {
        const res = await request(app)
            .get("/api/messages/error")
            .set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNCczltYXFaZXBKSlRzM09aLTV5QSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MGszeDJnYnhxbzYzZTZrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZWxsby13b3JsZC5leGFtcGxlLmNvbSIsImlhdCI6MTczNTg0Njc1OCwiZXhwIjoxNzM1OTMzMTU4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3WnNBN0xDWk5mU0ZsMHdaY0lZcU14eDNoRDVNV0tudiJ9.lK6r_b6smW1Y0eqjvE9T95pjbzwVeluEOYo0XJzYv7YjlhJNImT6Q4hEjLDjfGper64UqUlHctPlBzMaEZSZF5E5Fx307ytmfJOf1Evuj344_FSGycotqDZlCGiGaUbNzIuw6dFC70PnPqA2BykSGyB3r8-zvn1ICAuZa7sLxriKu3Vn4qDhGRGo4SUYzfEaEHFnBVC494HoUth51WWabssANoXNfnvF15gYZz22uSFlKrOqSOVrxfNH2txJN-ZBxUWQs5toqXCLgALYKP_wTfWQwjaTY_gZBZ8YWIDICBSKil1Q2BjStUOYKJJAI3M30luQEzHREqPAdvyxe4ZCtQ`);
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
