import { createServer } from 'http';
import { parse } from 'url';
import { parse as _parse } from 'querystring';

const routes = {
  '/': {
    GET: (req, res, parsedUrl) => {
      const queryParams = parsedUrl.query;

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Home Page\nQuery Parameters: ${JSON.stringify(queryParams)}`);
    },
  },
  '/about': {
    GET: (req, res, parsedUrl) => {
      const queryParams = parsedUrl.query;

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`About Page\nQuery Parameters: ${JSON.stringify(queryParams)}`);
    },
  },
  '/api/user': {
    GET: (req, res, parsedUrl) => {
      const queryParams = parsedUrl.query;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ route: '/api/user', method: 'GET', queryParams }),
      );
    },
    POST: (req, res, parsedUrl, bodyParams) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ route: '/api/user', method: 'POST', bodyParams }),
      );
    },
  },
  '/api/user/:id': {
    GET: (req, res, parsedUrl) => {
      const { queryParams, params } = parsedUrl;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          route: '/api/user',
          method: 'GET',
          queryParams,
          params,
        }),
      );
    },
  },
  '/api/user/:id/books/:bookId': {
    GET: (req, res, parsedUrl) => {
      const { queryParams, params } = parsedUrl;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          route: '/api/user/:id/books/:bookId',
          method: 'GET',
          queryParams,
          params,
        }),
      );
    },
  },
  // 添加更多路由...
};

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 查找路由并执行相应的处理函数
  const { handler, parsedParams } = findRouteHandler(
    pathname,
    req.method,
    parsedUrl,
  );

  // 处理POST请求的请求体
  if (method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const bodyParams = _parse(body);
      handler(req, res, parsedParams, bodyParams);
    });
  } else {
    handler(req, res, parsedParams);
  }
});

const notFoundHandler = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
};

const findRouteHandler = (pathname, method, parsedUrl) => {
  for (const route in routes) {
    const { handler, params } = matchRoute(pathname, route, method, parsedUrl);

    if (handler) {
      return { handler, parsedParams: { ...parsedUrl, params } };
    }
  }

  return { handler: notFoundHandler, parsedParams: parsedUrl };
};

const matchRoute = (pathname, route, method) => {
  const routeRegex = new RegExp(`^${route.replace(/:[^/]+/g, '([^/]+?)')}$`);
  const match = pathname.match(routeRegex);

  if (match) {
    const paramNames = (route.match(/:[^/]+/g) || []).map((param) =>
      param.slice(1),
    );
    const params = paramNames.reduce((acc, paramName, index) => {
      acc[paramName] = match[index + 1];
      return acc;
    }, {});

    return { handler: routes[route][method], params };
  }

  return { handler: null, params: null };
};

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
