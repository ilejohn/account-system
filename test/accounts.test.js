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
  await db('accounts').del();
  await db('users').del();
});

describe("Test /accounts route", () => {

    test("account creation ", async () => {
            const response = await request(app).post("/accounts").set('Authorization', `Bearer ${token}`);
             
             expect(response.statusCode).toBe(201);
             expect(response.body.message).toBe("Account created successfully.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(0);
             expect(response.body.data.pending_credit_balance).toBe(0);

    });    
});
