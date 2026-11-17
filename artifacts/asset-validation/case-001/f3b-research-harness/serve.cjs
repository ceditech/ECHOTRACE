"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const config = require("./research-config.js");
const ROOT = path.resolve(__dirname, "../../../..");
const candidate = path.join(ROOT, "artifacts/asset-validation/case-001/controlled-combination-validation/candidate");
const inputPaths = Object.freeze({ original: path.join(candidate, "CCV-C1a-C2a-B0-Original-960.png"), changed: path.join(candidate, "CCV-C1a-C2a-B0-Changed-960.png") });
function verifyInputs() {
  for (const [role, file] of Object.entries(inputPaths)) {
    const bytes = fs.readFileSync(file);
    if (crypto.createHash("sha256").update(bytes).digest("hex") !== config.inputs[role].hash) throw new Error(`${role}: hash mismatch`);
    if (bytes.subarray(0,8).toString("hex") !== "89504e470d0a1a0a" || bytes.readUInt32BE(16) !== 960 || bytes.readUInt32BE(20) !== 540) throw new Error(`${role}: invalid PNG dimensions`);
  }
}
function createServer() {
  verifyInputs();
  const routes = new Map([
    ["/", [path.join(__dirname,"index.html"),"text/html; charset=utf-8"]],
    ...["index.html","viewer.css","viewer.js","research-config.js"].map(name => ["/"+name,[path.join(__dirname,name),name.endsWith("css")?"text/css":name.endsWith("js")?"text/javascript":"text/html"]]),
    ...Object.entries(inputPaths).map(([role,file]) => [config.inputs[role].url,[file,"image/png"]])
  ]);
  return http.createServer((req,res) => {
    const headers = { "Cache-Control":"no-store", "X-Content-Type-Options":"nosniff", "Referrer-Policy":"no-referrer", "Content-Security-Policy":"default-src 'self'; img-src 'self' blob:; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'" };
    if (!/^(127\.0\.0\.1)(:\d+)?$/.test(req.headers.host || "")) {res.writeHead(403,headers);res.end();return;}
    if (req.method!=="GET" && req.method!=="HEAD") {res.writeHead(405,headers);res.end();return;}
    if (req.url==="/favicon.ico") {res.writeHead(204,headers);res.end();return;}
    const pathname = (req.url || "").split("?")[0];
    const route = routes.get(pathname);
    if (!route) {res.writeHead(404,headers);res.end("Not allowed");return;}
    fs.readFile(route[0],(error,data) => {
      if(error){res.writeHead(503,headers);res.end("Resource unavailable");return;}
      res.writeHead(200,{...headers,"Content-Type":route[1],"Content-Length":data.length});res.end(req.method==="HEAD"?undefined:data);
    });
  });
}
module.exports = { createServer, verifyInputs, inputPaths, ROOT };
if(require.main===module){
  try {
    const server=createServer();server.on("error",error=>{console.error(error.message);process.exitCode=1;});
    server.listen(0,"127.0.0.1",()=>console.log(`F3B_SYNTHETIC_URL=http://127.0.0.1:${server.address().port}/ PID=${process.pid}`));
    const stop=()=>server.close(()=>process.exit(0));process.on("SIGINT",stop);process.on("SIGTERM",stop);
  } catch(error){console.error(error.message);process.exitCode=1;}
}
