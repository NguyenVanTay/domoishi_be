/** @format */
import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import generateCode from "../utils/generateCode";
import { dataPrice, dataArea } from "../utils/data";
import { getNumberFromString } from "../utils/common";
import chothuematbang from "../../data/chothuematbang.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuephongtro from "../../data/chothuephongtro.json";
require("dotenv").config();
const dataBody = chothuecanho.body;
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataBody.forEach(async (item) => {
        let postId = v4();
        let labelCode = generateCode(item?.header?.class?.classType);
        let attributesId = v4();
        let userId = v4();
        let overviewId = v4();
        let imageId = v4();
        let currentArea = getNumberFromString(
          item?.header?.attributes?.acreage
        );
        let currentPrice = getNumberFromString(item?.header?.attributes?.price);
        await db.Post.create({
          id: postId,
          title: item?.header?.title,
          star: item?.header?.star,
          labelCode,
          address: item?.header?.adress,
          attributesId: attributesId,
          categoryCode: "CTPT",
          description: JSON.stringify(item?.mainContent?.content),
          userId,
          overviewId,
          ImagesId: imageId,
          areaCode: dataArea.find(
            (area) => area.max > currentArea && area.min <= currentArea
          )?.code,
          priceCode: dataPrice.find(
            (area) => area.max > currentPrice && area.min <= currentPrice
          )?.code,
        });

        await db.Attribute.create({
          id: attributesId,
          price: item?.header?.attributes?.price,
          acreage: item?.header?.attributes?.acreage,
          published: item?.header?.attributes?.published,
          hashtag: item?.header?.attributes?.hashtag,
        });

        await db.Image.create({
          id: imageId,
          image: JSON.stringify(item?.image),
        });
        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: item?.header?.class?.classType,
          },
        });
        await db.Overview.create({
          id: overviewId,
          code: item?.overview?.content?.find((i) => i.name === "Mã tin:")
            ?.content,
          area: item?.overview?.content?.find((i) => i.name === "Khu vực:")
            ?.content,
          type: item?.overview?.content?.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: item?.overview?.content?.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: item?.overview?.content?.find((i) => i.name === "Gói tin:")
            ?.content,
          created: item?.overview?.content?.find((i) => i.name === "Ngày đăng:")
            ?.content,
          expired: item?.overview?.content?.find(
            (i) => i.name === "Ngày hết hạn:"
          )?.content,
        });
        await db.User.create({
          id: userId,
          name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
            ?.content,
          code: hashPassword("123456"),
          phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
            ?.content,
          zalo: item?.contact?.content.find((i) => i.name === "Zalo:")?.content,
        });
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item) => {
        await db.Price.create({
          id: v4(),
          code: item.code,
          value: item.value,
        });
      });
      dataArea.forEach(async (item) => {
        await db.Area.create({
          id: v4(),
          code: item.code,
          value: item.value,
        });
      });
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
