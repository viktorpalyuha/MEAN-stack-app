const express = require('express');
const app = express();
const workersRoute = express.Router();

let Worker = require('../models/workers');

// Add Worker
workersRoute.post('/create', (request, response) => {
  let newWorker = new Worker({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    phone: request.body.phone
  });

  Worker.create(newWorker, (error, data) => {
    if (error) {
      throw error;
    } else {
      response.json(data);
    }
  });
});

// Get All Workers
workersRoute.get('/', (_, response) => {
  Worker.findAll((error, data) => {
    if (error) {
      throw error;
    } else {
      response.json(data)
    }
  })
})

// Get One Worker
workersRoute.get('/read/:id', (request, response) => {
  Worker.findWorker(request.params.id, (error, data) => {
    if (error) {
      throw error;
    } else {
      response.json(data)
    }
  });
})

// Update worker
workersRoute.put('/update/:id', (request, response) => {
  Worker.updateWorker(
    request.params.id,
    {
      $set: request.body
    },
    (error, data) => {
      if (error) {
        throw error;
      } else {
        response.json(data);
      }
    }
  );
});

// Delete worker
workersRoute.delete('/delete/:id', (request, response) => {
  Worker.findByIdAndDelete(request.params.id, (error, data) => {
    if (error) {
      throw error;
    } else {
      response.json(data)
    }
  });
});

module.exports = workersRoute;
