import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
		const trainNumbers = await page.$$eval(
			"body > .bgMiddle > table > tbody > tr > td",
			(nodes) => nodes.map((node) => node.innerHTML)
		);
		const departArriveTimes = await page.$$eval(
			"body > .bgBottom > table > tbody > tr",
			(nodes) => nodes.map((node) => node.innerHTML.replace("\n", ""))
		);
		const departArriveTimesObj = departArriveTimes.map((time, index) => {
			let type: string = "";
			let typeTime: string = "";
			let city: string = "";
			type = time.substring(time.indexOf(">") + 1, time.indexOf(":<"));
			const strippedTime = time.substring(time.indexOf(type));
			const cityTime = strippedTime.substring(
				strippedTime.indexOf("color:black") + 13,
				strippedTime.lastIndexOf("<")
			);

			let cityTimeSplit = cityTime.split(" ").filter((el) => el !== "");

			typeTime = cityTimeSplit[cityTimeSplit.length - 1];
			cityTimeSplit.length = cityTimeSplit.length - 1;
			city = cityTimeSplit.join(" ");

			return { type, city, typeTime };
		});

		console.log(departArriveTimesObj);
	} catch (error) {
		return res.status(400).json({ success: false, error });
	} finally {
		await browser?.close();
	}

	res.status(200).json({ success: true });
};

export default handler;
