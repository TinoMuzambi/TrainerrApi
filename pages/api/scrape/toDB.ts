import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import Route from "../../../models/Route";
import dbConnect from "../../../utils/db";
import { routeTimes } from "../../../interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let pairs: any[] = [];
	try {
		await dbConnect();
		const data = JSON.parse(
			fs.readFileSync("./data/fshsim.json", {
				encoding: "utf8",
				flag: "r",
			})
		);
		let pair: any[] = [];
		data.forEach(async (item: any[]) => {
			item.forEach((el: Object, index: number) => {
				if (index % 2 === 0) {
					pair.push(el);
				} else {
					pair.push(el);
					pairs.push(pair);
					pair = [];
				}
			});
			let times: routeTimes[] = [];
			pairs.forEach(async (route: any) => {
				times.push({
					departingTime: route[0].typeTime,
					arrivingTime: route[1].typeTime,
				});
			});
			await Route.create({
				departingStation: item[0].station,
				arrivingStation: item[1].station,
				trainNumber: item[0].trainNumber,
				times,
				line: item[0].line,
			});
		});
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}

	res.status(200).json({ success: true, pairs });
};

export default handler;
