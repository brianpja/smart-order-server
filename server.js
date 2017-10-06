const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const users = require('./routes/users.js');
const items = require('./routes/items.js')

app.use(bodyParser.json());

app.use(express.static(path.join('public')));

app.use(users);
app.use(items);


app.use((req, res) => {
  res.send('brian you smart!')
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
