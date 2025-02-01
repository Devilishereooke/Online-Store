import express from 'express';

const app = express();

app.listen(4500, () => {
  console.log('Server is listening on port 4500...');
});