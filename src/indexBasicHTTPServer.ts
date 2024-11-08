import { error } from 'console';
import http, { IncomingMessage, ServerResponse } from 'http';
import { json } from 'stream/consumers';

const PORT = process.env.PORT || 3000;

// build server
// /
// /about
// /greet?name=prabin or /greet?name='' => /greet {name:'prabin'}
// /sum?a=10&b=20 => /sum => {a:10, b:20}
// {} => {name: string, a: number, b:number}

interface QueryParams {
  name?: string;
  a?: number;
  b?: number;
}

interface JsonPayLoad {
  message?: string;
}

class JSONError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JSONError';
  }
}

const parseQueryString = (querystring: string): Record<string, string> => {
  const queryParams: Record<string, string> = {};
  if (querystring) {
    querystring.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      queryParams[key] = value;
    });
  }
  return queryParams;
};

const parseJsonBody = async (req: IncomingMessage): Promise<JsonPayLoad> => {
  // {"message":"you are awesome"} => {message:"you are awesome"}
  // {message:"Invalid JSON"}
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedData: JsonPayLoad = JSON.parse(body);
        resolve(parsedData);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', err => {
      reject(err);
    });
  });
};
const server = http.createServer(async (req, res) => {
  const fullUrl = req.url || '';
  const [path, querystring] = fullUrl.split('?');
  const queryParams = querystring ? parseQueryString(querystring) : {};
  // qs = 'a=20&b=30'
  //{a:20, b:30}

  if (path === '/') {
    // Home Page route
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Home Page!');
  } else if (path === '/about') {
    // About Page route
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  } else if (path === '/submit') {
    // check if request method is GET
    if (req.method === 'GET') {
      res.end('Please submit your data via POST.');
    } else if (req.method === 'POST') {
      let body = '';

      // read data
      req.on('data', chunk => {
        body += chunk.toString();
      });

      // when data receiving is done
      req.on('end', () => {
        res.writeHead(201, { 'content-type': 'text/plain' });
        // console.log(body);
        res.end(`Data received: ${body}`);
      });

      req.on('error', err => {
        console.error(`Error during data receiving: ${err}`);
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('Internal server error');
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method not allowed');
    }
  } else if (path === '/greet') {
    //  check if name is provided
    const name = queryParams.name || 'guest';
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(`Hi, ${name}`);
  } else if (path === '/sum') {
    const a = parseFloat(queryParams.a);
    const b = parseFloat(queryParams.b);
    if (!isNaN(a) && !isNaN(b)) {
      const sum = a + b;
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end(`Sum of ${a} and ${b} is ${sum}`);
    } else {
      res.writeHead(400, { 'content-type': 'text/plain' });
      res.end('Invalid numbers');
    }
  } else if (path === '/data' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      if (data.message) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ erro: 'message field is missing' }));
      }
    } catch (error) {
      if (error instanceof JSONError) {
        res.writeHead(400, { 'content-type': 'text/plain' });
        res.end(`error: ${error.message}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    }
  } else {
    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`);
});
