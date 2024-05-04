let logArea: HTMLElement | undefined;
export function log(...message: readonly (string | number)[]) {
  logArea ??= document.getElementById("logs") ?? undefined;
  if (logArea === undefined) {
    throw new Error("logArea not found");
  }
  const p = document.createElement("p");
  p.append(...message.map((m) => String(m)));
  logArea.append(p);
  return p;
}

export function error(...message: readonly (string | number)[]) {
  const p = log(...message);
  p.classList.add("error");
  return p;
}
