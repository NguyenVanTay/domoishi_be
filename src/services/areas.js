/** @format */

import db from "../models";

// get all Price

export const getAreasService = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Area.findAll({
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
