import { WrapperProps } from "../interfaces";

import Meta from "./Meta";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<>
			<Meta />
			{children}
		</>
	);
};

export default Wrapper;
