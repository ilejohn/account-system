const request = require("supertest");
const app = require("../app");
const { appName } = require("../config");
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
  await db('transactions').del();
  await db('accounts').del();
  await db('users').del();
});

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


describe("Test /users route", () => {
  describe("Test POST /users route", () => {
        test("user creation ", async () => {
             const user = {
                name: "Balton Xhang",
                email: "balton@example.com"
              };
 
            try {
                 const response = await request(app).post("/users").send(user);
                 expect(response.statusCode).toBe(201);
                 expect(response.body.data.name).toBe(user.name);
                 expect(response.body.data.email).toBe(user.email);
             } catch (error) {
                 console.log(error);
             }
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
           
           try {
              const response = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
              expect(response.statusCode).toBe(200);
              expect(response.body.data.length).toBe(5);
             } catch (error) {
                 console.log(error)
             }
         });
  });
});


describe("Test /accounts route", () => {

    test("account creation ", async () => {
        try {
            const response = await request(app).post("/accounts").set('Authorization', `Bearer ${token}`);
             
             expect(response.statusCode).toBe(201);
             expect(response.body.message).toBe("Account created successfully.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(0);
             expect(response.body.data.pending_credit_balance).toBe(0);
             
         } catch (error) {
             console.log(error);
         }
    });    
});

describe("Test /transactions route", () => {

    test("account funding ", async () => {
        try {

            await db('accounts').insert({user_id: authUser.id});
            const response = await request(app).post("/transactions/fund-account").send({amount: 1000000}).set('Authorization', `Bearer ${token}`);
             
             expect(response.statusCode).toBe(200);
             expect(response.body.message).toBe("Account funded successfully.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(1000000);
             expect(response.body.data.pending_credit_balance).toBe(0);
             
         } catch (error) {
             console.log(error);
         }
    }); 
    
    test("account transfer ", async () => {
        try {
            
            const accountId = await db('accounts').insert({user_id: authUser.id});
            await db('accounts').where('id', accountId[0]).increment('available_balance', 2000000);

            const id = await db('users').insert({name: "Adam Smith", email: "smith@example.com"});
            await db('accounts').insert({user_id: id[0]});
  
            const recepient = await db('users').where('id', id[0]).first();

            const response = await request(app).post("/transactions/transfer")
                                    .send({amount : 1000000, email: recepient.email})
                                    .set('Authorization', `Bearer ${token}`);
            
            const recepientAccount = await db('accounts').where('user_id', recepient.id).first();
             
             expect(response.statusCode).toBe(200);
             expect(response.body.message).toBe("Transfer successful.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(1000000);
             expect(response.body.data.pending_credit_balance).toBe(0);

             expect(recepientAccount.user_id).toBe(recepient.id);
             expect(recepientAccount.pending_debit_balance).toBe(0);
             expect(recepientAccount.available_balance).toBe(1000000);
             expect(recepientAccount.pending_credit_balance).toBe(0);
             
         } catch (error) {
             console.log(error);
         }
    }); 
});

