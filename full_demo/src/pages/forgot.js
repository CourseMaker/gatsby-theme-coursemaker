import React from "react";
import Layout from "../components/layout";
import Input from "../components/input";

const Forgot = () => {
	return (
		<Layout>
			<section className="py-16 bg-indigo-100 md:py-24">
				<div className="container">
					<div className="mx-auto mb-8 text-center lg:w-4/12">
						<h2>Forgot your account?</h2>
						<p className="text-xl font-light text-gray-500 md:text-xl">Input your email below and we'll send you a new password</p>
					</div>

					<div className="mx-auto form-wrapper md:w-7/12 lg:w-4/12">
						<form className="px-8 py-10 bg-white rounded-lg shadow-lg md:px-10 md:py-12">
							<div className="input-fields space-y-6">
								<Input
									type="email"
									label="Email"
									placeholder="chris@example.com"
								/>
								<input
									type="submit"
									value="Submit"
									className="block w-full text-center btn btn-default btn-lg"
								/>
							</div>
						</form>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Forgot;
