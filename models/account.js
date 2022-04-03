const db = require("../models/index");

const all = () => {
  return db('accounts');
};

const create = async (data) => {
  const id = await db('accounts').insert(data);
  
  return db('accounts').where('id', id[0]).first();
};

const get = (data) => {
  return db('accounts').where(data).first();
};

const fund = async (user_id, amount) => {
    const account = await db('accounts').where('user_id', user_id).first();

    if(!account) {
        throw new Error('You do not have an account, please create one');
    }

    try {
        await db.transaction(async trx => {

            await trx('accounts').where('id', account.id).increment('available_balance', amount)

            await trx('transactions').insert({
                account_id: account.id,
                type: 'CREDIT',
                debit: 0,
                credit: amount,
                narration: 'Account funded',
                status: 'SUCCESS'
            });
           
        });

        return db('accounts').where('user_id', user_id).first(); 
      } catch (error) {
        
        throw new Error(`${error.message}. Account funding failed`); 
      }

};

const transfer = async (userId, userName, amount, recepientEmail) => {
    const account = await db('accounts').where('user_id', userId).first();

    if(!account) {
        throw new Error('You do not have an account, please create one and fund it');
    }

    if (account.available_balance < amount) {
        throw new Error('Your balance is insufficient for this transfer, please fund your account and try again');
    }

    const recepient = await db('users').where('email', recepientEmail).first(); 

    if (!recepient) {
        throw new Error('Recepient is not registered'); 
    }

    const recepientAccount = await db('accounts').where('user_id', recepient.id).first();

    if(!recepientAccount) {
        throw new Error('Recepient does not have an account');
    }

    try {
        await db.transaction(async trx => {

            await trx('accounts').where('id', account.id).decrement('available_balance', amount).increment('pending_debit_balance', amount);

            const senderTransaction = await trx('transactions').insert({
                account_id: account.id,
                type: 'DEBIT',
                debit: amount,
                credit: 0,
                narration: 'Account transfer in process',
                status: 'PENDING'
            });

            const received = await trx('accounts').where('id', recepientAccount.id).increment('available_balance', amount);

            await trx('transactions').insert({
                account_id: recepientAccount.id,
                type: 'CREDIT',
                debit: 0,
                credit: amount,
                narration: `Your account has received a transfer from ${userName}`,
                status: 'SUCCESS'
            });

            if(received) {
                await trx('accounts').where('id', account.id).decrement('pending_debit_balance', amount);

                await trx('transactions').where('id', senderTransaction[0]).update({
                    narration: 'Account transfer successful',
                    status: 'SUCCESS'
                });
            }
           
        });

        return db('accounts').where('user_id', userId).first(); 
      } catch (error) {

        await db('transactions').insert({
            account_id: account.id,
            type: 'DEBIT',
            debit: amount,
            credit: 0,
            narration: 'Account transfer failed, try again later',
            status: 'FAILED'
        });

        throw new Error('Account transfer failed', error.message); 
      }
};

const withdraw = async(userId, amount) => {
    const account = await db('accounts').where('user_id', userId).first();

    if(!account) {
        throw new Error('You do not have an account, please create one and fund it');
    }

    if (account.available_balance < amount) {
        throw new Error('Your balance is insufficient for this withdrawal, please fund your account and try again');
    }

    try {
        await db.transaction(async trx => {

            await trx('accounts').where('id', account.id).decrement('available_balance', amount)

            await trx('transactions').insert({
                account_id: account.id,
                type: 'DEBIT',
                debit: amount,
                credit: 0,
                narration: 'Withdrawal successful',
                status: 'SUCCESS'
            });
           
        });

        return db('accounts').where('user_id', userId).first(); 
      } catch (error) {

        await db('transactions').insert({
            account_id: account.id,
            type: 'DEBIT',
            debit: amount,
            credit: 0,
            narration: 'Account withdrawal failed, try again later',
            status: 'FAILED'
        });

        throw new Error(`${error.message}. Withdrawal failed`); 
      }
};

module.exports = {
  all, create, get, fund, transfer, withdraw
}
