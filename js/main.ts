import { error, log } from "./log";
import "./style.css";

if (!("Suspender" in WebAssembly)) {
  // JSPI is not supported
  error("⚠️JSPI is not supported");
}

log("Loading wasm...");

try {
  const mod = await WebAssembly.instantiateStreaming(fetch("/bin.wasm"), {
    abc: {
      // @ts-expect-error
      getA: new WebAssembly.Function(
        { parameters: ["externref"], results: ["i32"] },
        async () => {
          log("getA() is called");
          await sleep(1000);
          log("getA() returns");
          return -1;
        },
        { suspending: "first" },
      ),
      // @ts-expect-error
      getB: new WebAssembly.Function(
        { parameters: ["externref"], results: ["i32"] },
        async () => {
          log("getB() is called");
          await sleep(1000);
          log("getB() returns");
          return 3;
        },
        { suspending: "first" },
      ),
      // @ts-expect-error
      getC: new WebAssembly.Function(
        { parameters: ["externref"], results: ["i32"] },
        async () => {
          log("getC() is called");
          await sleep(1000);
          log("getC() returns");
          return 40;
        },
        { suspending: "first" },
      ),
    },
  });

  // @ts-expect-error
  const run = new WebAssembly.Function(
    { parameters: [], results: ["externref"] },
    mod.instance.exports.run,
    { promising: "first" },
  );

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
