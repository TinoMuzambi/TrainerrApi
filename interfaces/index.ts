export type RouteTime = {
	departingTime: string;
	arrivingTime: string;
};

export interface RouteModel {
	line: string;
	departingStation: string;
	arrivingStation: string;
	times: RouteTime[];
	trainNumber: number;
}
