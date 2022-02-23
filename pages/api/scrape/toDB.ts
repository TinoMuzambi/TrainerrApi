import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import Route from "../../../models/Route";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let pairs: any[] = [];
	try {
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
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}

	res.status(200).json({ success: true, pairs });
};

export default handler;
