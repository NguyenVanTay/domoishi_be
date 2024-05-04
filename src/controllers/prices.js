/** @format */
import * as services from "../services/prices";

export const getPricesController = async (req, res) => {
  try {
    const response = await services.getPricesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller " + error,
    });
  }
};
