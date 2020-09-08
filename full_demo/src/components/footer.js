import React from "react";
import { Link } from "gatsby";

const Footer = () => {
	return(
		<footer className="py-8 text-sm">
			<div className="container">
				<div className="flex justify-between">
					<p className="text-center text-gray-500">
						Powered by
						<a
							href="http://coursemaker.org"
							className="font-bold text-green-500"
						>
							{" "}
							CourseMaker
						</a>
					</p>

					<div className="flex ml-auto text-gray-500 space-x-5">
						<Link className="link" to="/terms">Terms</Link>
						<Link className="link" to="/privacy">Privacy</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
