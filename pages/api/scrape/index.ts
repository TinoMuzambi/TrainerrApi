import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let content;
	let browser;

	try {
		// Launch browser
		browser = await puppeteer.launch({
			headless: false,
			ignoreHTTPSErrors: true,
		});

		// Navigate to trains website
		const page = await browser.newPage();
		await page.goto("https://cttrains.co.za/ss_route_select.php");

		// Select depart station
		await page.select("#departStation", "1");

		// Select arrival station
		await page.select("#arriveStation", "2");

		// Select travel days
		await page.click(
			"body > form > div:nth-child(5) > ul > li > div:nth-child(2) > input[type=Radio]"
		);

		// Select preferred time
		await page.click("#entireCheck");

		// Submit form and wait for page navigation
		await Promise.all([
			page.click("#time > ul > li > input[type=submit]"),
			page.waitForNavigation({ waitUntil: "domcontentloaded" }),
		]);

		// Get page content.
		content = await page.evaluate(
			() => document?.querySelector("body")?.outerHTML
		);
		console.log(content);
	} catch (error) {
		return res.status(400).json({ success: false, error });
	} finally {
		await browser?.close();
	}

	res.status(200).json({ success: true, siteBody: content });
};

export default handler;
