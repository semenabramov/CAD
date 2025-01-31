const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Используем PORT из Render

// Настройка CORS
app.use(cors());

// Явно обрабатываем preflight-запросы OPTIONS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://semenabramov.github.io'); // Разрешаем запросы только от GitHub Pages
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Возвращаем "No Content" для preflight-запросов
  }
  
  next();
});

// Middleware для JSON
app.use(express.json());

// Проверочный маршрут
app.get('/', (req, res) => {
  res.send('Бэкенд работает и CORS настроен! 1.0');
});

// Функция триангуляции
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

// Эндпоинт для триангуляции
app.post('/triangulate', (req, res) => {
  const { length, width, height } = req.body;
  
  if (!length || !width || !height) {
    return res.status(400).json({ error: 'Missing dimensions' });
  }

  const triangles = triangulateBox(length, width, height);
  res.json({ triangles });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
