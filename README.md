# gatsby-theme-coursemaker
Make Online Courses

## TODO
Add slug to strapi courses

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


## Configuring A Course Website

### Introduction

An entire site, potentially with many courses, is a school. When you install the 
@coursemaker/gatsby-theme-coursemaker theme and run `gatsby develop`, you will see a directory
called "school" created in your project root. This houses all your courses and lecture data.

### School Config Options (all underneath `siteMetaData`)
#### Text fields
* `title`: The school name
* `landing_page.title_and_description.title`: The School name that will appear on your overall landing page
* `landing_page.title_and_description.description`: The School description that will appear on your overview section of the landing page
* `landing_page.primary_button.text`: The call to action text on your school's main button, e.g. "Enroll"


#### Gated Content Feature
* GATSBY_ENABLE_PAYMENTS
* GATSBY_USE_AUTH