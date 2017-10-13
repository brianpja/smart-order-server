const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const users = require('./routes/users.js');
const items = require('./routes/items.js');
const orders = require('./routes/orders.js');
const distributors = require('./routes/distributors.js');
const token = require('./routes/token.js');

app.use(bodyParser.json());

app.use(express.static(path.join('public')));

app.use(users);
app.use(items);
app.use(orders);
app.use(distributors);
app.use(token);


app.use((req, res) => {
  res.send('brian you messing up!')
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
