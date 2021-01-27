const mongoose = require('mongoose');
const dataBase = require('../config/db');

const WorkerSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    surname: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  {
    collection: 'workers'
  }
);

const Workers = (module.exports = mongoose.model('Workers', WorkerSchema));

module.exports.create = (newWorker, callback) => {
  newWorker.save(callback);
};

module.exports.findAll = (query, callback) => {
  Workers.find(query, callback);
};

module.exports.findWorker = (id, callback) => {
  Workers.findById(id, callback);
};

module.exports.updateWorker = (id, update, callback) => {
  Workers.findByIdAndUpdate(id, update, { new: true }, callback);
};

module.exports.findByIdAndRemove = (id, callback) => {
  Workers.findByIdAndRemove(id, callback);
};
