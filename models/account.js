const db = require("../models/index");

const all = () => {
  return db('accounts');
};

const create = async (data) => {
  const account = await db('accounts').where(data).first();
  
  if (account) {
    throw new Error('You already have an account');
  }
  const id = await db('accounts').insert(data);
  
  return db('accounts').where('id', id[0])
    .then(insertedData => {
        return insertedData
    });
};

const get = (data) => {
  return db('accounts').where(data);
};

const fund = async (user_id, amount) => {
    const account = await db('accounts').where('user_id', user_id).first();

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
        console.error(error);
        throw new Error('Account funding failed'); 
      }

}

module.exports = {
  all, create, get, fund
}
