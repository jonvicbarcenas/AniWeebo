import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules do not have __dirname by default, so this is how to replicate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

