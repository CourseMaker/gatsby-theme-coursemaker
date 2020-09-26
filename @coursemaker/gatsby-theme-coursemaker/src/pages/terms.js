import React from "react";
import ReactMarkdown from "react-markdown"
import Layout from "../components/layout";

const Terms = () => {

	// TODO: enable filesystem source
	const terms_and_conditions = "TODO";
	return (
		<Layout>
			<section className="bg-indigo-100 section-header">
				<div className="container mx-auto lg:w-7/12">
					<div className="py-8 md:py-12">
						<h2>Terms of Service</h2>
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto lg:w-7/12">
					<article className="leading-relaxed space-y-5">
						<ReactMarkdown source={terms_and_conditions} />
					</article>
				</div>
			</section>
		</Layout>
	);
};

export default Terms;