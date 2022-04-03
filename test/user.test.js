const request = require("supertest");
const app = require("../app");
const db = require("../models/index");

let token;
let authUser;

// before each request, create a user and log them in
beforeEach(async () => {
    await db('users').insert({name: "Biola Alfred", email: "biolaalfred@example.com"});
    let response = await request(app).post('/auth/login').send({email: "biolaalfred@example.com"});
    token = response.body.data.token;
    authUser = response.body.data.user;
});

// remove all records
afterEach(async () => {
  await db('users').del();
});

describe("Test /users route", () => {
  describe("Test POST /users route", () => {
        test("user creation ", async () => {
             const user = {
                name: "Balton Xhang",
                email: "balton@example.com"
              };
 
                 const response = await request(app).post("/users").send(user);
                 expect(response.statusCode).toBe(201);
                 expect(response.body.data.name).toBe(user.name);
                 expect(response.body.data.email).toBe(user.email);

        });    
  });
 
  describe("Test GET /users route", () => {
         test("fetching all users", async () => {
             const users = [
                 { name: 'Martin Albert', email: "martin@example.com"},
                 { name: 'Victoria Smith', email: "victoria@example.com"},
                 { name: 'John Doe', email: "john@example.com"},
                 { name: 'Deborah Peters', email: "deborah@example.com"}
             ];
         
             await db('users').insert(users);

              const response = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
              expect(response.statusCode).toBe(200);
              expect(response.body.data.length).toBe(5);

         });
  });
});

