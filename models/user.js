const db = require("../models/index");

const all = () => {
  return db('users');
};

const create = async (data) => {
  const checkUser = await db('users').where('email', data.email).first();

  if (checkUser !== undefined) {
    throw new Error('Email already exists');
  }

  const id = await db('users').insert(data);
  
  return db('users').where('id', id[0]).first();
};

module.exports = {
    all, create
}
