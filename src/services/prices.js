/** @format */

import db from "../models";

// get all Price

export const getPricesService = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      reslove({
        err: reslove ? 0 : 1,
        msg: response ? "Ok" : "Failed to get prices.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
