import Head from "next/head";

import { MetaProps } from "../interfaces";
import { BASE_URL } from "../utils";

const Meta: React.FC<MetaProps> = ({
	title,
	description,
	keywords,
	url,
	image,
}): JSX.Element => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<meta name="keywords" content={keywords} />
		<meta name="description" content={description} />

		{/* <!-- Google / Search Engine Tags --> */}
		<meta itemProp="name" content={title} />
		<meta itemProp="description" content={description} />
		<meta itemProp="image" content={image} />

		{/* <!-- Facebook Meta Tags --> */}
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />

		{/* <!-- Twitter Meta Tags --> */}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />

		<meta charSet="utf-8" />
		<link rel="icon" href="/logo.svg" />
		<meta name={title} content={description} />
		<link rel="apple-touch-icon" href="/logo.svg" />
		<link rel="manifest" href="/manifest.json" />
		<title>{title}</title>

		{/* Add your preconnect links here  */}
		<link rel="preconnect" href="https://a.storyblok.com" />
	</Head>
);

Meta.defaultProps = {
	title: "Trainerr",
	keywords:
		"next.js, typescript, cape town, cape town trains, train, trains, schedule",
	description:
		"Trainerr - An easier way to view schedules for Cape Town trains.",
	image: "https://unsplash.it/1000",
	url: BASE_URL,
};

export default Meta;
