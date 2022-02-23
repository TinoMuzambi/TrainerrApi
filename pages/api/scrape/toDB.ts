import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import Route from "../../../models/Route";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = JSON.parse(
			fs.readFileSync("/output.json", {
				encoding: "utf8",
				flag: "r",
			})
		);
		data.forEach((item: Object) => {
			console.log(item);
		});
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}

	res.status(200).json({ success: true });
};
