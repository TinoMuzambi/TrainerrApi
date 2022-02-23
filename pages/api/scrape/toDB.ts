import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import moment from "moment";

import Route from "../../../models/Route";
import dbConnect from "../../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let pairs: any[] = [];
	try {
		await dbConnect();
		const data = JSON.parse(
			fs.readFileSync("./output.json", {
				encoding: "utf8",
				flag: "r",
			})
		);
		let pair: any[] = [];
		data.forEach((item: [Object]) => {
			item.forEach((el: Object, index: number) => {
				if (index % 2 === 0) {
					pair.push(el);
				} else {
					pair.push(el);
					pairs.push(pair);
					pair = [];
				}
			});
		});

		pairs.forEach(async (route: any) => {
			await Route.create({
				departingStation: route[0].city,
				arrivingStation: route[1].city,
				departingTime: route[0].typeTime,
				arrivingTime: route[1].typeTime,
				trainNumber: route[0].trainNumber,
			});
		});
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}

	res.status(200).json({ success: true, pairs });
};

export default handler;
