# Rust wasm JSPI example

This is a simple example of how to use Rust to create a WebAssembly module that supports JavaScript-Promise Integration (JSPI).

# Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/en/download/)

Also, configure your browser to enable JSPI. For Chrome, you need to [configure](https://v8.dev/blog/jspi#how-can-i-use-it-today%3F) the experimental feature.

# Build

1. `npm run wasm` to build the Rust code into a WebAssembly module.
2. `npm run dev` to start a Vite dev server.
3. Navigate to `http://localhost:5173/` to see JSPI in action.

# Explanation

No explanation provided for now. See `js/main.ts` for details.

# License

MIT
