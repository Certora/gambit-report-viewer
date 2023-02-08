export function getCircleTranslate(
  node: { x: number; y: number },
  k: number,
  view?: [number, number, number],
) {
  const [zoomX, zoomY] = view || [0, 0, 0];
  return [(node.x - zoomX) * k, (node.y - zoomY) * k] as const;
}

export function degFromArrData(i: number, length: number) {
  return 360 * (i / length) + 90;
}

export function degToRad(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function getCircleCoords(i: number, length: number, r: number) {
  const rad = degToRad(degFromArrData(i, length));
  return [Math.cos(rad) * r, Math.sin(rad) * r] as const;
}
