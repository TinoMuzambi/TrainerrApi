module.exports = {
	webpack5: true,
	env: {
		// Ensure you've added this in an .env file.
		MONGO_URI: process.env.MONGO_URI,
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/api/scrape",
				permanent: true,
			},
		];
	},
};
