const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./views/form.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else if (req.url === "/calculate" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { num1, num2, operation } = querystring.parse(body);
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let result;

      switch (operation) {
        case "add":
          result = a + b;
          break;
        case "sub":
          result = a - b;
          break;
        case "mul":
          result = a * b;
          break;
        case "div":
          result = b !== 0 ? a / b : "Cannot divide by zero";
          break;
        default:
          result = "Invalid Operation";
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h2>Result: ${result}</h2><a href="/">Back</a>`);
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
