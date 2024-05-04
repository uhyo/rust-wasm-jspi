import { log } from "./log";
import "./style.css";

log("Loading wasm...");

const mod = await WebAssembly.instantiateStreaming(
  fetch("/rust_wasm_jspi.wasm"),
  {},
);

const exports = mod.instance.exports as { run: () => number };

log("Running run()");

const result = exports.run();
log("result: ", result);
