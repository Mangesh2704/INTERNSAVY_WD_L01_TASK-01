const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (in this case, the HTML and background image)
app.use(express.static('public'));

// Initialize NeDB database
const db = new Datastore({ filename: 'formdata.db', autoload: true });

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Insert form data into NeDB
  db.insert(formData, (err, newDoc) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Form data stored successfully.');
    res.status(200).send('Form data submitted successfully!');
  });
});

// Serve the HTML file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
