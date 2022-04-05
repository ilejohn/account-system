const request = require("supertest");
const app = require("../../app");
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


describe("Test /transactions route", () => {

    test("account funding ", async () => {
            await db('accounts').insert({user_id: authUser.id});
            const response = await request(app).post("/transactions/fund-account").send({amount: 1000000}).set('Authorization', `Bearer ${token}`);
             
             expect(response.statusCode).toBe(200);
             expect(response.body.message).toBe("Account funded successfully.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(1000000);
             expect(response.body.data.pending_credit_balance).toBe(0);

    });

    test("account funding with invalid data", async () => {
       await db('accounts').insert({user_id: authUser.id});
       const response = await request(app).post("/transactions/fund-account").send({amount: 'fourty thousand naira'}).set('Authorization', `Bearer ${token}`);

       expect(response.statusCode).toBe(422);
       expect(response.body.status).toBe("error");
       expect(response.body.message).toBe('Invalid amount supplied. Amount must be a positive number');
    });
    
    test("account transfer ", async () => {
            
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
    });

    test("account transfer with invalid data", async () => {
            
      const accountId = await db('accounts').insert({user_id: authUser.id});
      await db('accounts').where('id', accountId[0]).increment('available_balance', 2000000);

      const id = await db('users').insert({name: "Adam Smith", email: "smith@example.com"});
      await db('accounts').insert({user_id: id[0]});

      const response = await request(app).post("/transactions/transfer")
                              .send({amount : 1000000, email: 'some_random_stuff@elv.com'})
                              .set('Authorization', `Bearer ${token}`);
       
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe('Recepient is not registered');
    });
    
    test("account withdrawal ", async () => {

            const accountId = await db('accounts').insert({user_id: authUser.id});
            await db('accounts').where('id', accountId[0]).increment('available_balance', 2000000);
            const response = await request(app).post("/transactions/withdraw").send({amount: 1900000}).set('Authorization', `Bearer ${token}`);
             
             expect(response.statusCode).toBe(200);
             expect(response.body.message).toBe("Withdrawal successful.");
             expect(response.body.data.user_id).toBe(authUser.id);
             expect(response.body.data.pending_debit_balance).toBe(0);
             expect(response.body.data.available_balance).toBe(100000);
             expect(response.body.data.pending_credit_balance).toBe(0);
    });

    test("account withdrawal with no funds in balance", async () => {

       await db('accounts').insert({user_id: authUser.id});
       const response = await request(app).post("/transactions/withdraw").send({amount: 7000}).set('Authorization', `Bearer ${token}`);

       expect(response.statusCode).toBe(400);
       expect(response.body.status).toBe("error");
       expect(response.body.message).toBe('Your balance is insufficient for this withdrawal, please fund your account and try again');
    });
});
