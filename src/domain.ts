export function quoteStay(
  base: number,
  room: string,
  flexible: boolean,
  nightCount: number,
  rooms: number,
  usePoints: boolean,
) {
  if (
    !Number.isInteger(nightCount) ||
    nightCount < 1 ||
    !Number.isInteger(rooms) ||
    rooms < 1 ||
    rooms > 9
  )
    throw new Error("Choose valid dates and between 1 and 9 rooms.");
  const nightly =
    base +
    (room === "Suite" ? 2000 : room === "Twin" ? 300 : 0) +
    (flexible ? 400 : 0);
  const subtotal = nightly * nightCount * rooms;
  const tax = Math.round(subtotal * 0.12);
  return {
    nightly,
    subtotal,
    tax,
    total: usePoints ? 0 : subtotal + tax,
    points: usePoints ? 12000 * nightCount * rooms : 0,
  };
}
export function roomFits(room: string, adults: number, children: number) {
  return (
    Number.isInteger(adults) &&
    Number.isInteger(children) &&
    adults >= 1 &&
    children >= 0 &&
    adults <= (room === "Suite" ? 3 : 2) &&
    children <= 2
  );
}
export function refundablePoints(room: string, points: number, status: string) {
  return status === "Upcoming" && !room.includes("Advance") ? points : 0;
}
