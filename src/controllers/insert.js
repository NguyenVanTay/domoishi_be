/** @format */

import * as insertService from "../services/insert";
export const insertController = async (req, res) => {
  try {
    const response = await insertService.createPricesAndAreas();
    // const response = await insertService.insertService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at auth controller: " + error,
    });
  }
};
