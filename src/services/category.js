/** @format */

import db from "../models";

// get all category

export const getCategoriesService = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      reslove({
        err: reslove ? 0 : 1,
        msg: response ? "Ok" : "Failed to get categories.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
