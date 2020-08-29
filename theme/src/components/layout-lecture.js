import React from "react";
import PropTypes from "prop-types";
import Section from "./section";
import Header from "./header";
import Footer from "./footer";

const LayoutLecture = ({ children, lecture, sections, totalLectures }) => {
	function random(min, max) {
		const number = Math.random() * (max - min) + min;
		return Math.round(number);
	}

	const randomProgress = random(0, 100);

	return (
		<>
			<Header />
			<section id="lecture">
				<div className="flex-wrap lg:flex">
					<div className="lg:w-9/12">
						{children}
						<div className="hidden lg:block">
							<Footer />
						</div>
					</div>

					<div className="order-last w-full border-t border-gray-300 lg:border-t-0 lg:mt-10 lg:order-none lg:w-3/12 lg:mt-0">
						<div className="container lg:max-w-full">
							<div className="bottom-0 right-0 pt-8 pb-16 overflow-scroll border-l-0 border-gray-300 lg:border-l lg:pb-0 lg:pt-24 lg:h-full lg:w-3/12 lg:fixed sidebar">
								<div className="py-8 text-sm text-gray-600 lg:p-4 progress">
									<div className="relative flex justify-between mb-2">
										<div>{`${randomProgress}%`} Complete</div>
										<div>0/{totalLectures} Lectures</div>
									</div>
									<div className="relative h-2 overflow-hidden bg-gray-400 rounded-lg">
										<div
											className="absolute top-0 bottom-0 left-0 h-2 bg-green-500"
											style={{ width: `${randomProgress}%` }}
										></div>
									</div>
								</div>
								{sections &&
									<div className="curriculum-list space-y-6 lg:space-y-0">
										{sections.map((section) => (
											<Section lecture={lecture} data={section} size="small" key={section.id} />
										))}
									</div>
								}
							</div>
						</div>
					</div>

				</div>
			</section>
			<div className="block lg:hidden">
				<Footer />
			</div>
		</>
	);
};

LayoutLecture.propTypes = {
	children: PropTypes.node.isRequired,
};

export default LayoutLecture;
