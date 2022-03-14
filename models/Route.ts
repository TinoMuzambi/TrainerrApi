import mongoose, { Schema } from "mongoose";

import { RouteModel } from "../interfaces";

const Route: Schema = new mongoose.Schema(
	{
		line: {
			type: String,
			required: [true, "Route needs a line"],
		},
		departingStation: {
			type: String,
			required: [true, "Route needs a departing station"],
		},
		arrivingStation: {
			type: String,
			required: [true, "Route needs an arriving station"],
		},
		times: {
			type: [Object],
			required: [true, "Route needs times"],
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
// Duplicate the ID field.
Route.virtual("id").get(function () {
	return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Route.set("toJSON", {
	virtuals: true,
});

export default mongoose.models.Route ||
	mongoose.model<RouteModel>("Route", Route, "routes");
