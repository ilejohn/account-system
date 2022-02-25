const db = require("../models/index");

const all = () => {
  return db('users');
};

const create = async (data) => {
  const checkUser = await db('users').where('email', data.email);

  if (checkUser[0] !== undefined) {
    throw new Error('Email already exists');
  }

  const id = await db('users').insert(data);
  
  return db('users').where('id', id[0])
    .then(insertedData => {
        return insertedData
    });
};

module.exports = {
    all, create
}
