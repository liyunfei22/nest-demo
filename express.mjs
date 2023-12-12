import express from 'express';
import { urlencoded, json } from 'body-parser';

const app = express();
const port = 3000;

// 使用中间件解析 URL-encoded 和 JSON 格式的请求体
app.use(urlencoded({ extended: false }));
app.use(json());

// 路由处理
app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

app.post('/api/user', (req, res) => {
  const { name, age } = req.body;
  res.json({ name, age });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
