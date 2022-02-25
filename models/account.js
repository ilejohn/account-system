const db = require("../models/index");

const all = () => {
  return db('accounts');
};

const create = async (data) => {
  const id = await db('accounts').insert(data);
  
  return db('accounts').where('id', id[0])
    .then(insertedData => {
        return insertedData
    });
};

const get = (data) => {
  return db('accounts').where(data);
};

module.exports = {
  all, create, get
}
