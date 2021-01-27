const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const dataBase = require('./config/db');
const routes = require('./routes/routes');
const workersRoutes = require('./routes/workers.routes');

const app = express();

const port = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dataBase.db, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', routes);
app.use('/workers', workersRoutes);

app.get('/', (_, res) => {
  res.send('Main page');
});

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running and the port is: ${port}`);
});
