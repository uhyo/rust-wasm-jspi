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
          await sleep(1000);
          return -1;
        },
        { suspending: "first" },
      ),
      getB: () => 3,
      getC: () => 40,
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
