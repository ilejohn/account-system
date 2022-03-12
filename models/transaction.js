const db = require("../models/index");

const all = () => {
  return db('transactions');
};

const create = async (data) => {
  const checkUser = await db('users').where('email', data.email).first();

  if (checkUser !== undefined) {
    throw new Error('Email already exists');
  }

  const id = await db('users').insert(data);
  
  return db('users').where('id', id[0]).first();
};

const getAuthTransactions = async (account_id) => {
    return db('transactions').where({account_id});
}

module.exports = {
    all, create, getAuthTransactions
}
