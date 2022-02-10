import Image from "next/image";
import Link from "next/link";
import { WrapperProps } from "../interfaces";

import Meta from "./Meta";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<>
			<header>
				<Link href="/">
					<a>
						<Image
							src="/logo.svg"
							alt="Trainerr Logo"
							height={100}
							width={100}
						/>
					</a>
				</Link>
			</header>
			<Meta />
			{children}
		</>
	);
};

export default Wrapper;
