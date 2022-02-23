import mongoose, { Schema } from "mongoose";

import { RouteModel } from "../interfaces";

const Route: Schema = new mongoose.Schema(
	{
		departingStation: {
			type: String,
			required: [true, "Route needs a departing station"],
		},
		arrivingStation: {
			type: String,
			required: [true, "Route needs an arriving station"],
		},
		departingTime: {
			type: String,
			required: [true, "Route needs a departing time"],
		},
		arrivingTime: {
			type: String,
			required: [true, "Route needs an arriving time"],
		},
		trainNumber: {
			type: Number,
			required: [true, "Route needs a train number"],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Route ||
	mongoose.model<RouteModel>("Route", Route, "routes");