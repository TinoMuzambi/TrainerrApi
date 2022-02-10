import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	throw new Error("An error occured please refresh or contact the developer.");
}

let cached: {
	conn: null | typeof mongoose;
	promise: null | Promise<typeof mongoose>;
} = { conn: null, promise: null };

if (!cached) {
	cached = { conn: null, promise: null };
}

/**
 * Connect to the database.
 * @returns A mongoose object.
 */
const dbConnect: Function = async (): Promise<typeof mongoose> => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(MONGO_URI as string, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
};

export default dbConnect;
