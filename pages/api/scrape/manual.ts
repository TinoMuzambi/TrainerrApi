import { NextApiRequest, NextApiResponse } from "next";

import Route from "../../../models/Route";
import dbConnect from "../../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let body = {};
	try {
		await dbConnect();
		body = await Route.create(req.body);
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}
	res.status(201).json({ success: true, ...body });
};

export default handler;
