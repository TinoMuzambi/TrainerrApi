import { NextApiRequest, NextApiResponse } from "next";

import Route from "../../../models/Route";
import dbConnect from "../../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();
	const { method } = req;
	switch (method) {
		case "GET": {
			const line = req.query.line || "";
			try {
				const routes = await Route.find(line ? { line: line } : {});
				res.status(200).json({ success: true, routes });
			} catch (error) {
				res.status(400).json({ success: false, error });
			}
			break;
		}
		case "POST": {
			try {
				const body = await Route.create(req.body);
				res.status(201).json({ success: true, ...body });
			} catch (error) {
				res.status(400).json({ success: false, error });
			}
			break;
		}
		default: {
			return res.status(400).json({ success: false });
		}
	}
};

export default handler;
