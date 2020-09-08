require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const axios = require("axios");
const FormData = require("form-data");
const LOGIN_URL = "https://api.coursemaker.io"; // 'http://localhost:1337';
const COURSEMAKER_URL = process.env.CMS_BASE_PATH || "https://cms.coursemaker.io";

// Authenticate with coursemaker cms
// TODO: extract out into plugin
async function getAuthToken() {
  if (process.env.AUTH_HEADER) {
    return process.env.AUTH_HEADER
  }
  if (process.env.AUTH_TOKEN) {
    return `Bearer ${process.env.AUTH_TOKEN}`
  }

  // Otherwise login
  let data = new FormData();
  data.append("username", "test@test.com");
  data.append("password", "password");
  data.append("grant_type", "password");

	return await axios({
		method: "post",
		url: `${LOGIN_URL}/api/v1/login/access-token`,
    headers: data.getHeaders(),
		data: data
	}).then(
		(response) => {
			return `Bearer ${response.data.access_token}`;
		},
		(error) => {
			console.log(error);
			throw error;
		}
	);
}

module.exports = {
	siteMetadata: {
		title: "Marketing School",
		description: "A book and course for programmers who want to learn marketing.",
		author: "CourseMaker Team",
		titleTemplate: "%s · Marketing for Developers",
		url: "https://www.doe.com", // No trailing slash allowed!
		image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
		twitterUsername: "@occlumency",
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: "gatsby-source-graphql",
			options: {
				typeName: "CMS",
				fieldName: "cms",
				url: `${COURSEMAKER_URL}/graphql`,
				headers: async () => {
          console.log(`${COURSEMAKER_URL}/graphql`);
					return {
						Authorization: await getAuthToken(),
					};
				},
				// Additional options to pass to node-fetch
				fetchOptions: {},
			},
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "gatsby-starter-default",
				short_name: "starter",
				start_url: "/",
				background_color: "#663399",
				theme_color: "#663399",
				display: "minimal-ui",
			},
		},
		"gatsby-plugin-offline",
		"gatsby-plugin-postcss",
		"gatsby-plugin-stylus",
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [
					require("tailwindcss"),
					require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
				],
			},
		},
		{
			resolve: `gatsby-plugin-stylus`,
		},
	],
};
