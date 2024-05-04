let logArea: HTMLElement | undefined;
export function log(...message: readonly (string | number)[]) {
  logArea ??= document.getElementById("logs") ?? undefined;
  if (logArea === undefined) {
    throw new Error("logArea not found");
  }
  const p = document.createElement("p");
  p.append(...message.map((m) => String(m)));
  const now = new Date();
  const time = document.createElement("time");
  time.dateTime = now.toISOString();
  time.append(now.toLocaleTimeString());
  p.prepend(time);

  logArea.append(p);
  return p;
}

export function error(...message: readonly (string | number)[]) {
  const p = log(...message);
  p.classList.add("error");
  return p;
}
