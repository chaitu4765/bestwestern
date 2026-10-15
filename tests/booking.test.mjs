import test from "node:test";
import assert from "node:assert/strict";
import { quoteStay, roomFits, refundablePoints } from "../src/domain.ts";
import { nights, addDays, hotels, pages } from "../src/data.ts";
test("two-night flexible King quote includes simulated tax", () => {
  assert.deepEqual(quoteStay(4800, "King", true, 2, 1, false), {
    nightly: 5200,
    subtotal: 10400,
    tax: 1248,
    total: 11648,
    points: 0,
  });
});
test("multi-room points redemption scales with nights and rooms", () => {
  const q = quoteStay(4200, "Twin", true, 3, 2, true);
  assert.equal(q.points, 72000);
  assert.equal(q.total, 0);
});
test("invalid dates and occupancy cannot create a quote", () => {
  for (const n of [0, -1, NaN, 1.5])
    assert.throws(() => quoteStay(4800, "King", true, n, 1, false));
  assert.throws(() => quoteStay(4800, "King", true, 2, 10, false));
  assert.equal(roomFits("King", 3, 0), false);
  assert.equal(roomFits("Suite", 3, 2), true);
  assert.equal(roomFits("King", 2, 3), false);
});
test("point refunds apply once and respect rate conditions", () => {
  assert.equal(refundablePoints("King · Flexible", 24000, "Upcoming"), 24000);
  assert.equal(refundablePoints("King · Flexible", 24000, "Cancelled"), 0);
  assert.equal(refundablePoints("King · Advance", 24000, "Upcoming"), 0);
});
test("night arithmetic crosses month, year and leap boundaries", () => {
  assert.equal(nights("2026-12-31", "2027-01-02"), 2);
  assert.equal(addDays("2028-02-28", 2), "2028-03-01");
  assert.equal(nights("2028-02-28", "2028-03-01"), 2);
});
test("all catalog content links point to implemented route families or external services", () => {
  const base = new Set([
    "/",
    "/hotels",
    "/account",
    "/join",
    "/login",
    "/reservations",
    "/brands",
    "/rewards/catalog",
    "/support/faq",
    "/forgot-password",
    ...Object.keys(pages),
  ]);
  for (const page of Object.values(pages))
    for (const section of page.sections)
      if (
        section.href &&
        !section.href.startsWith("http") &&
        !section.href.startsWith("tel:") &&
        !section.href.startsWith("/account/")
      )
        assert.ok(base.has(section.href), section.href);
  assert.equal(hotels.length, 2);
});
