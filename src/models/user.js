const db = require("../models/index");

const all = () => {
  return db('users');
};

const getUserByEmail = async (email) => {
  return await db('users').where('email', email).first(); 
};

const create = async (data) => {
  const id = await db('users').insert(data);
  
  return db('users').where('id', id[0]).first();
};

module.exports = {
    all, getUserByEmail, create
}
