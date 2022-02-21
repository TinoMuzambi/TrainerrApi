import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			ignoreHTTPSErrors: true,
		});
		const page = await browser.newPage();
		await page.goto("https://cttrains.co.za");
		await page.screenshot({ path: "example.png" });
		await browser.close();
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}

	res.status(200).json({ message: "Hello there" });
};

export default handler;
