import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Courses from "../components/courses";
import Button from "../components/button";

const IndexPage = ({data}) => {
	const { school } = data.cms.siteBuild;
	const owner = school.owner;
	const {
		title_and_description,
		cta_section,
		primary_button,
		cta_button,
	} = school.landing_page;

	return (
		<Layout>
			<section className="py-16 pb-8 text-center md:pt-40">
				<div className="container">
					<h1 className="mb-4">{title_and_description.title}</h1>
					<p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12">
						{title_and_description.description}
					</p>
					{primary_button && (
						<Button
							text={primary_button.text}
							color={primary_button.text_color}
							bg={primary_button.color}
						/>
					)}
					<div className="mt-12 scroll-to">
						<svg
							className="block w-6 mx-auto"
							data-name="Layer 1"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill="none"
								stroke="#999"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M20.59 7.66l-8.69 8.68-8.49-8.48"
							/>
						</svg>
					</div>
				</div>
			</section>

			<section id="overview" className="py-16 text-center bg-gray-100 md:py-32">
				<div className="container">
					<div className="mx-auto inner lg:w-7/12">
						<h2 className="mb-4 lg:mb-6">Overview</h2>
						<div className="leading-loose text-left text-gray-700 space-y-6">
							<p>
								Learn how to integrate Stripe (and SCA support!) with Ruby on
								Rails 6 including one-time payments, subscriptions, upgrades,
								downgrades, refunds, webhooks and more.
							</p>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book.
							</p>
						</div>
						<div className="mt-8 btn-wrapper">
							{primary_button && (
								<Button
									text={primary_button.text}
									color={primary_button.text_color}
									bg={primary_button.color}
								/>
							)}
						</div>
					</div>
				</div>
			</section>

			<Courses courses={school.courses} />

			<section
				id="author"
				className="py-16 text-center text-white bg-gray-900 lg:py-32"
			>
				<div className="container">
					<div className="mx-auto inner lg:w-5/12">
						<h2 className="mb-4 md:mb-6">{cta_section.title}</h2>
						<div className="leading-loose text-gray-200 space-y-6">
							<p>{cta_section.description}</p>
						</div>
						<div className="mt-8 btn-wrapper">
							{cta_button && (
								<Button
									text={cta_button.text}
									color={cta_button.text_color}
									bg={cta_button.color}
								/>
							)}
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 text-center bg-gray-100 md:py-32">
				<div className="container">
					<div className="mx-auto inner lg:w-5/12">
						<h2 className="mb-4 mb:mb-6">Questions?</h2>
						<div className="text-xl text-gray-700 space-y-6">
							<p>
								<span>Any questions? Send an email to</span><br/>
								{owner && (
									<a href={`mailto:${owner.email}`} className="link">
										{owner.email}
									</a>
								)}
							</p>
						</div>
						<div className="mt-8 btn-wrapper">
							{primary_button && (
								<Button
									text={primary_button.text}
									color={primary_button.text_color}
									bg={primary_button.color}
								/>
							)}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default IndexPage;

export const query = graphql`
	query IndexQuery($build_id: ID!) {
		cms {
			siteBuild(id: $build_id) {
				school {
					name
					owner {
						username
						email
					}
					landing_page {
						title_and_description {
							description
							title
						}
						cta_section {
							description
							title
						}
						cta_button {
							text
							text_color
							color
						}
						primary_button {
							text_color
							text
							color
						}
					}
					courses {
						id
						author_display {
							title
						}
						cover_photo {
							url
						}
						description_overview
						title
					}
				}
			}
		}
	}
`;
