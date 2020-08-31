import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

const Nav = () => {
	const { pathname } = useLocation();
	const { site } = useStaticQuery(query);
	const { title } = site.siteMetadata;
	let homeLinks = [
		["Courses", "#courses"],
		["Overview", "#overview"],
		["Author", "#author"],
		["Login", "/curriculum"],
		["Enrol Now", "/", "btn btn-white"],
	];

	if (pathname !== "/") {
		homeLinks = [
			["My Courses", "/courses"],
			["Logout", "/logout"],
		];
	}

	return (
		<header className="sticky top-0 z-20 text-white bg-green-500 shadow-md">
			<div className="container mx-auto">
				<div className="flex items-center h-24">
					<Link className="inline-flex items-center text-lg logo" to="/">
						<div className="w-12 h-12 mr-4 bg-white rounded-full"></div>
						<span className="font-semibold">{title}</span>
					</Link>

					<nav className="flex items-center ml-auto list-none space-x-6">
						{homeLinks.map((link) => {
							let classes = "";
							if (link[2]) classes = link[2];
							return (
								<li>
									<Link className={classes} to={link[1]}>
										{link[0]}
									</Link>
								</li>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Nav;

const query = graphql`
	query Data {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
