// filepath: c:\Users\USER\OneDrive\Desktop\JV-Hobbies\aniWEB\FINAL\JVWEB\src\scripts\walalang.js
// index.js

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});