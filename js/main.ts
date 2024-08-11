import { error, log } from "./log";
import "./style.css";

declare global {
  namespace WebAssembly {
    export const Suspending: new (func: () => Promise<unknown>) => any;
    export const promising: (func: any) => any;
  }
}

if (!("promising" in WebAssembly)) {
  // JSPI is not supported
  error("⚠️JSPI is not supported");
}

log("Loading wasm...");

try {
  const mod = await WebAssembly.instantiateStreaming(fetch("/bin.wasm"), {
    abc: {
      getA: new WebAssembly.Suspending(async () => {
        log("getA() is called");
        await sleep(1000);
        log("getA() returns");
        return -1;
      }),
      getB: new WebAssembly.Suspending(async () => {
        log("getB() is called");
        await sleep(1000);
        log("getB() returns");
        return 3;
      }),
      getC: new WebAssembly.Suspending(async () => {
        log("getC() is called");
        await sleep(1000);
        log("getC() returns");
        return 40;
      }),
    },
  });

  const run = WebAssembly.promising(mod.instance.exports.run);

  log("Started running run()");

  const result = await run();
  log("result: ", result);
} catch (err) {
  console.error(err);
  error("Error! (see console)");
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
