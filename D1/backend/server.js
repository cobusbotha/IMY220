import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});