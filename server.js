const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const db = new Datastore({ filename: 'formdata.db', autoload: true });

app.post('/submit', (req, res) => {
  const formData = req.body;

  db.insert(formData, (err, newDoc) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Form data stored successfully.');
    res.status(200).send('Form data submitted successfully!');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
