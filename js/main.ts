import { error, log } from "./log";
import "./style.css";

if (!("Suspender" in WebAssembly)) {
  // JSPI is not supported
  error("⚠️JSPI is not supported");
}

log("Loading wasm...");

try {
  const mod = await WebAssembly.instantiateStreaming(
    fetch("/rust_wasm_jspi.wasm"),
    {
      abc: {
        getA: () => -1,
        getB: () => 3,
        getC: () => 40,
      },
    },
  );

  const exports = mod.instance.exports as { run: () => number };

  log("Running run()");

  const result = exports.run();
  log("result: ", result);
} catch (err) {
  console.error(err);
  error("Error! (see console)");
}
