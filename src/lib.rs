#[no_mangle]
pub extern "C" fn run() -> i32 {
    unsafe { getA() + getB() + getC() }
}

#[link(wasm_import_module = "abc")]
extern "C" {
    fn getA() -> i32;
    fn getB() -> i32;
    fn getC() -> i32;
}
