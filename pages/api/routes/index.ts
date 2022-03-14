import { NextApiRequest, NextApiResponse } from "next";

import Route from "../../../models/Route";
import { PAGE, PER_PAGE } from "../../../utils";
import dbConnect from "../../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();
	const { method } = req;
	switch (method) {
		case "GET": {
			const line = req.query.line || "";
			const page = Number.parseInt(req.query.page as string) || PAGE;
			const perPage = Number.parseInt(req.query.perPage as string) || PER_PAGE;
			const noDocs = await Route.countDocuments(line ? { line: line } : {});
			const pages = Math.floor(noDocs / perPage);

			try {
				const routes = await Route.find(line ? { line: line } : {})
					.limit(perPage)
					.skip(perPage * page);
				res.status(200).json({ success: true, page, routes, pages });
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
