import { NextApiRequest, NextApiResponse } from "next";

import Route from "../../../models/Route";
import { PAGE, PER_PAGE } from "../../../utils";
import dbConnect from "../../../utils/db";

const getQueryValue = (value: string | string[] | undefined): string =>
	Array.isArray(value) ? value[0] || "" : value || "";

const getBoundedInteger = (
	value: string | string[] | undefined,
	fallback: number,
	maximum: number
): number => {
	const parsed = Number.parseInt(getQueryValue(value), 10);
	return Number.isSafeInteger(parsed) && parsed > 0
		? Math.min(parsed, maximum)
		: fallback;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({
			success: false,
			error: "Method not allowed",
		});
	}

	const line = getQueryValue(req.query.line).trim();
	if (line.length > 80) {
		return res.status(400).json({ success: false, error: "Invalid line" });
	}

	const page = getBoundedInteger(req.query.page, PAGE, 10_000);
	const perPage = getBoundedInteger(req.query.perPage, PER_PAGE, 100);
	const filter = line ? { line } : {};

	try {
		await dbConnect();
		const [noDocs, routes] = await Promise.all([
			Route.countDocuments(filter),
			Route.find(filter)
				.sort({ line: 1, departingStation: 1, arrivingStation: 1 })
				.limit(perPage)
				.skip(perPage * (page - 1))
				.lean(),
		]);

		res.setHeader(
			"Cache-Control",
			"public, s-maxage=300, stale-while-revalidate=3600"
		);
		return res.status(200).json({
			success: true,
			page,
			perPage,
			total: noDocs,
			pages: Math.ceil(noDocs / perPage),
			routes,
		});
	} catch (error) {
		console.error("Unable to fetch routes", error);
		return res.status(503).json({
			success: false,
			error: "The timetable service is temporarily unavailable",
		});
	}
};

export default handler;
