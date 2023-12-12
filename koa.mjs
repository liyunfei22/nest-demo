const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const port = 3000;

// 使用中间件解析 URL-encoded 和 JSON 格式的请求体
app.use(bodyParser());

// 路由处理
router.get('/about', async (ctx) => {
  ctx.body = 'About page';
});

router.get('/api/user/:id', async (ctx) => {
  const userId = ctx.params.id;
  ctx.body = { userId };
});

router.post('/api/user', async (ctx) => {
  const { name, age } = ctx.request.body;
  ctx.body = { name, age };
});

// 将路由注册到 Koa 应用上
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Koa server is running on port ${port}`);
});
