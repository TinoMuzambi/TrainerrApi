import Image from "next/image";
import { WrapperProps } from "../interfaces";

import Meta from "./Meta";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<>
			<header>
				<Image src="/logo.svg" alt="Trainerr Logo" height={100} width={100} />
			</header>
			<Meta />
			{children}
		</>
	);
};

export default Wrapper;
