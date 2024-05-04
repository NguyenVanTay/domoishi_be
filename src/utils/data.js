/** @format */

import generateCode from "./generateCode";
const prices = [
  { min: 0, max: 1, value: "Dưới 1 triệu" },
  { min: 1, max: 2, value: "Từ 1 đến 2 triệu" },
  { min: 2, max: 3, value: "Từ 2 đến 3 triệu" },
  { min: 3, max: 5, value: "từ 3 đến 5 triệu" },
  { min: 5, max: 7, value: "từ 5 đến 7 triệu" },
  { min: 7, max: 10, value: "từ 7 đến 10 triệu" },
  { min: 10, max: 15, value: "từ 10 đến 15 triệu" },
  { min: 15, max: 999999, value: "Trên 15 triệu" },
];
export const dataPrice = prices.map((item) => ({
  ...item,
  code: generateCode(item.value),
}));

const areas = [
  { min: 0, max: 20, value: "Dưới 20m" },
  { min: 20, max: 30, value: "Từ 20m đến 30m" },
  { min: 30, max: 50, value: "Từ 30m đến 50m" },
  { min: 50, max: 70, value: "Từ 50m đến 70m" },
  { min: 80, max: 90, value: "Từ 70m đến 90m" },
  { min: 90, max: 9999999, value: "Trên 90m" },
];
export const dataArea = areas.map((item) => ({
  ...item,
  code: generateCode(item.value),
}));
