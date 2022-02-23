export interface WrapperProps {
	children: JSX.Element | JSX.Element[];
}

export interface MetaProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

export interface RouteModel {
	departingStation: string;
	arrivingStation: string;
	departingTime: Date;
	arrivingTime: Date;
	trainNumber: number;
}
