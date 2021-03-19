# gatsby-theme-coursemaker
Make Online Courses

## Theme Status: Alpha
The theme is in alpha, and is subject to significant, breaking changes.

## 🗝 Elevator Pitch 
This Gatsby theme allows you to create a fully-featured, commercial online course website **for free**. 
Key features:
- Easily create courses and lectures using tools you love (git, markdown)
- Sales pages out of the box, with easy configuration options
- Gated content via integration with Auth0's free plan and YouTube private videos
- Payments via integration with Stripe Checkout (coming soon)
- Hosting (via Netlify, AWS or many other options)
- Responsive design (looks good on mobile + tablets for your students)
- SEO optimized
- Google analytics integration
- Blazing fast 
- Serious documentation & support - we use this theme for our commercial product. It's not going quiet. And naturally,
we've created a course explaining how to use this theme ;)
- Fully customizable via [gatsby shadowing](https://www.gatsbyjs.com/docs/themes/shadowing/) made even easier
by our use of gatsby-theme-ui. 

## 🚀 Hosted Option
Don't want to host it yourself, and want access to:
- Truly gated videos
- Student progress reports
- Easy payment collection integration (Stripe)
- EU VAT reports
- Interactive coding lectures (coming soon)
- Discount coupons
- File downloads
- Course dashboard
- Easy memberships
- 24/7 Support

Checkout [CourseMaker](https://coursemaker.org)

---
## Installation

#### Dependencies
* Ensure **node.js >= v14** is installed
* Install the gatsby-cli: `npm install -g gatsby-cli`
* Create a new site: `gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world`
* `cd` into your directory (in the above example it would be "gatsby-site"), then run the site: `gatsby develop`

#### Add the theme
* Run `yarn add @coursemaker/gatsby-theme-coursemaker`
* In your gatsby-config.js, add the theme to your plugins array as [described in the docs
here](https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/)

There are many configuration options for the coursemaker theme which we discuss below.


## 🚀 Configuring A Course Website

*note* if you prefer a real code example, the `course_demo_site` contains just that.
 
### Concepts

An entire site, potentially with many courses, is a school. When you install the 
@coursemaker/gatsby-theme-coursemaker theme and run `gatsby develop`, you will see a directory
called "school" created in your project root. This houses all your courses and lecture data.

### 📚 School Config Options
All school-level config is in `siteMetaData`, which you configure in your `gatsby-config.js` file.

[Example](https://github.com/letsreinvent/yfop-online-course/blob/main/yfop/gatsby-config.js#L2)

###  🎉 How to Create & Configure a Course
* Every directory directly underneath the `school/courses` directory represents a course. 
* Every course is configured via the index.mdx file in its root directory. 

#### The Course index.mdx
Many aspects of your course are configured in the index.mdx file frontmatter at the course directory
root. These include:

* `courseImage` which looks in the `/assets` directory of your course folder for the file you indicate.
This image will appear on your school and course landing pages. 

[Example](https://github.com/letsreinvent/yfop-online-course/blob/main/yfop/school/courses/youth-leadership/index.mdx)

#### 💰 Gated Content Feature
By default `GATSBY_ENABLE_AUTH` is set to `false` and this means that all your lectures can be viewed without
a user sign up. If you set the environment variable `GATSBY_ENABLE_AUTH=true` this will trigger the requirement
for user sign-up to view gated content. You will also need to set the following Auth0 config vars for this to work: 
* GATSBY_AUTH0_CLIENTID
* GATSBY_AUTH0_DOMAIN
* GATSBY_AUTH0_CALLBACK

You'll need to create a free Auth0 account and setup your project there. See the [Auth0 docs](https://auth0.com/docs/quickstart/spa/vanillajs/01-login) for details. See this
Netlify config for a [working example](https://github.com/letsreinvent/yfop-online-course/blob/main/netlify.toml)

#### Gotchas working with markdown and local data
When you delete courses or sections, they will still appear unless you delete the gatsby cache via the cli command
`gatsby clean`