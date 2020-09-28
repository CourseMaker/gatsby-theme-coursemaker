# gatsby-theme-coursemaker
Make Online Courses

## 🗝 Elevator Pitch 
This Gatsby theme allows you to create a fully-featured, commercial online course website **for free**. 
Key features:
- Easily create courses and lectures using tools you love (git, markdown)
- Sales pages out of the box, with easy configuration options
- Gated content (via integration with Auth0's free plan)
- Payments (via integration with Stripe Checkout)
- Hosting (via Netlify, AWS or many other options)
- Responsive design (looks good on mobile + tablets for your students)
- SEO optimized
- Google analytics integration
- Blazing fast 
- Serious documentation & support - we use this theme for our commercial product. It's not going quiet. And naturally,
we've created a course explaining how to use this theme ;)
- Fully customizable via [gatsby shadowing](https://www.gatsbyjs.com/docs/themes/shadowing/) made even easier
by our use of gatsby-theme-ui. 

## Installation

#### Dependencies
* Ensure node.js is installed
* Install the gatsby-cli: `npm install -g gatsby-cli`
* Create a new site: `gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world`
* `cd` into your directory (in the above example it would be "gatsby-site"), then run the site: `gatsby develop`

#### Add the theme
* Run `yarn add @coursemaker/gatsby-theme-coursemaker`
* In your gatsby-config.js, add the theme to your plugins array as [described in the docs
here](https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/)

There are many configuration options for the coursemaker theme which we discuss below.


## 🚀 Configuring A Course Website

*note* if you prefer a real code example, the `course_demo_site` contains just that. You can see it running
on netlify here: TODO
 
### Concepts

An entire site, potentially with many courses, is a school. When you install the 
@coursemaker/gatsby-theme-coursemaker theme and run `gatsby develop`, you will see a directory
called "school" created in your project root. This houses all your courses and lecture data.

### 📚 School Config Options (all underneath `siteMetaData`)
#### Text fields
* `title`: The school name
* `owner.email`: The contact email address which students are shown on the school landing page
* `landing_page.title_and_description.title`: The School name that will appear on your overall landing page
* `landing_page.title_and_description.description`: The School description that will appear on your overview section of the landing page
* `landing_page.primary_button.text`: The call to action text on your school's main button, e.g. "View Course(s)"
* `landing_page.cta_button.text`: The call to action text on your school's CTA button
* `landing_page.cta_section.title`: The title of the call to action section on your school's landing page
* `landing_page.cta_section.description`: The descriptive text of the call to action section on your school's landing page

###  🎉 How to Create & Configure a Course
* Every directory directly underneath the `school/courses` directory represents a course. 
* Every course is configured via the index.mdx file in its root directory. 

#### The Course index.mdx
Many aspects of your course are configured in the index.mdx file frontmatter at the course directory
root. These include:

* `courseImage` which looks in the `/assets` directory of your course folder for the file you indicate.
This image will appear on your school and course landing pages. 


#### 💰 Gated Content Feature
* GATSBY_ENABLE_PAYMENTS
* GATSBY_USE_AUTH

#### Gotchas working with markdown and local data
When you delete courses or sections, they will still appear unless you delete the gatsby cache via the cli command
`gatsby clean`