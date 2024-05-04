use externref::{externref, Resource};

#[no_mangle]
#[externref]
pub extern "C" fn run(suspender: &Resource<Suspender>) -> i32 {
    unsafe { getA(suspender) + getB(suspender) + getC(suspender) }
}

pub struct Suspender;

#[externref]
#[link(wasm_import_module = "abc")]
extern "C" {
    fn getA(suspender: &Resource<Suspender>) -> i32;
    fn getB(suspender: &Resource<Suspender>) -> i32;
    fn getC(suspender: &Resource<Suspender>) -> i32;
}
