export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://trainerr-api.vercel.app"
		: "http://localhost:3000";

export const PER_PAGE = 10;
export const PAGE = 1;
