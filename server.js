const express = require('express');

const app = express();

//Serve static file from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>My first server!!</h1>');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
