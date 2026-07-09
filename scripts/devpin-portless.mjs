import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { StringDecoder } from "node:string_decoder";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const probePort = Number(process.env.PORT);

if (!Number.isInteger(probePort) || probePort < 1 || probePort > 65535) {
  console.error("devpin-portless: PORT is not set. Run via devpin.");
  process.exit(1);
}

let webReady = false;
let apiReady = false;
let probeServer;

function startProbe() {
  if (probeServer || !webReady || !apiReady) {
    return;
  }

  probeServer = createServer((_, response) => {
    response.writeHead(204);
    response.end();
  });

  probeServer.listen(probePort, "127.0.0.1", () => {
    console.log(`devpin: ready probe listening on http://127.0.0.1:${probePort}`);
  });
}

function handleLine(line) {
  if (line.includes("[csc-cat]") && line.includes("Local:")) {
    webReady = true;
  }

  if (line.includes("[api.csc-cat]") && line.includes("Ready on")) {
    apiReady = true;
  }

  startProbe();
}

function pipeAndWatch(stream, target) {
  const decoder = new StringDecoder("utf8");
  let buffer = "";

  stream.on("data", (chunk) => {
    target.write(chunk);
    buffer += decoder.write(chunk);

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newlineIndex).replace(/\r$/, "");
      buffer = buffer.slice(newlineIndex + 1);
      handleLine(line);
    }
  });

  stream.on("end", () => {
    buffer += decoder.end();
    if (buffer) {
      handleLine(buffer.replace(/\r$/, ""));
    }
  });
}

const portless = spawn("pnpm", ["exec", "portless"], {
  cwd: repoRoot,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

pipeAndWatch(portless.stdout, process.stdout);
pipeAndWatch(portless.stderr, process.stderr);

let forwardedSignal;

portless.on("error", (error) => {
  console.error(`devpin-portless: failed to start portless: ${error.message}`);
  process.exit(1);
});

portless.on("exit", (code, signal) => {
  probeServer?.close();

  if (signal && signal !== forwardedSignal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    forwardedSignal = signal;
    portless.kill(signal);
  });
}
