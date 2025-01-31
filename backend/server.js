const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'https://semenabramov.github.io', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
  
  app.use(express.json());
  
  app.get('/', (req, res) => {
    res.send('Бэкенд работает!');
  });

const triangulateBox = (L, W, H) => {
    return [
        [[0, 0, 0], [L, 0, 0], [L, H, 0]], [[0, 0, 0], [L, H, 0], [0, H, 0]],
        [[0, 0, W], [L, 0, W], [L, H, W]], [[0, 0, W], [L, H, W], [0, H, W]],
        [[0, 0, 0], [0, 0, W], [0, H, W]], [[0, 0, 0], [0, H, W], [0, H, 0]],
        [[L, 0, 0], [L, 0, W], [L, H, W]], [[L, 0, 0], [L, H, W], [L, H, 0]],
        [[0, H, 0], [L, H, 0], [L, H, W]], [[0, H, 0], [L, H, W], [0, H, W]],
        [[0, 0, 0], [L, 0, 0], [L, 0, W]], [[0, 0, 0], [L, 0, W], [0, 0, W]]
    ];
};

app.post('/triangulate', (req, res) => {
    const { length, width, height } = req.body;
    if (!length || !width || !height) {
        return res.status(400).json({ error: 'Missing dimensions' });
    }
    const triangles = triangulateBox(length, width, height);
    res.json({ triangles });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
