import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Input from '../components/input';

/* { pageContext } */
const LoginPage = ({ pageContext }) => {
    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    return (
        <Layout pageContext={pageContext} schoolThemeStyle={schoolThemeStyle}>
            <section className="py-16 bg-indigo-100 md:py-24">
                <div className="container">
                    <div className="mb-8 text-center">
                        <h1>Welcome Back</h1>
                        <p className="text-xl font-light text-gray-500 md:text-3xl">Sign in to continue</p>
                    </div>

                    <div className="mx-auto form-wrapper md:w-7/12 lg:w-4/12">
                        <form className="px-8 py-10 bg-white rounded-lg shadow-lg md:px-10 md:py-12">
                            <div className="input-fields space-y-6">
                                <Input type="email" label="Email" placeholder="chris@example.com" />
                                <Input type="password" label="Password" placeholder="Your Password" />
                                <input
                                    type="submit"
                                    value="Sign in"
                                    className={`block w-full text-center btn btn-lg text-white bg-${schoolThemeStyle.primaryColor}-500`}
                                />
                                <div className="text-center">
                                    <Link to="/forgot" className={`text-${schoolThemeStyle.primaryColor}-500`}>
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <p className="mt-5 text-center text-gray-500">
                            <span>Don't have an account? </span>
                            <Link to="/register" className={`text-${schoolThemeStyle.primaryColor}-500`}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default LoginPage;
