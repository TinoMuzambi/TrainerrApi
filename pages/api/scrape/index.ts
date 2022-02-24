import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let browser;
	let pages = [];

	try {
		// Launch browser
		browser = await puppeteer.launch({
			headless: true,
			ignoreHTTPSErrors: true,
		});

		// Navigate to trains website
		const page = await browser.newPage();
		await page.goto("https://cttrains.co.za/cf_route_select.php");

		// Get options length
		const optionsLength = await page.$eval(
			"#departStation",
			(node) => node.children.length
		);
		let pageContent;
		for (let i = 0; i < optionsLength; i++) {
			pageContent = {};

			for (let j = i + 1; j < optionsLength; j++) {
				// Select depart station
				await page.select("#departStation", `${i + 1}`);

				// Select arrival station
				await page.select("#arriveStation", `${j + 1}`);

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
				let lineNode = await page.$eval("body > div.lineHeading_top", (node) =>
					node.innerHTML.split(" ")
				);
				lineNode.length = lineNode.length - 1;
				const line = lineNode.join(" ");

				const trainNumbers = await page.$$eval(
					"body > .bgMiddle > table > tbody > tr > td",
					(nodes) =>
						nodes.map((node) => Number.parseInt(node.innerHTML.split(" ")[2]))
				);
				const departArriveTimes = await page.$$eval(
					"body > .bgBottom > table > tbody > tr",
					(nodes) => nodes.map((node) => node.innerHTML.replace("\n", ""))
				);
				const departArriveTimesObj = departArriveTimes.map((time) => {
					let type: string = "";
					let typeTime: string = "";
					let station: string = "";
					type = time.substring(time.indexOf(">") + 1, time.indexOf(":<"));
					const strippedTime = time.substring(time.indexOf(type));
					const stationTime = strippedTime.substring(
						strippedTime.indexOf("color:black") + 13,
						strippedTime.lastIndexOf("<")
					);

					let stationTimeSplit = stationTime
						.split(" ")
						.filter((el) => el !== "");

					typeTime = stationTimeSplit[stationTimeSplit.length - 1];
					stationTimeSplit.length = stationTimeSplit.length - 1;
					station = stationTimeSplit.join(" ");

					return { type, station, typeTime, line };
				});

				pageContent = departArriveTimesObj.map((obj, index) => {
					return {
						...obj,
						trainNumber: trainNumbers[Math.floor(index / 2)],
					};
				});

				await page.goto("https://cttrains.co.za/cf_route_select.php");
				pages.push(pageContent);
			}
		}
	} catch (error) {
		return res.status(400).json({ success: false, error });
	} finally {
		await browser?.close();
	}

	fs.writeFileSync(
		"./data/capeflats.json",
		JSON.stringify(pages.filter((item: any[]) => item.length > 0)),
		{
			flag: "a",
		}
	);
	res.status(200).json({ success: true, pages });
};

export default handler;
