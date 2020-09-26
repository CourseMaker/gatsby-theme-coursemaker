import { graphql } from "gatsby";

export const CourseCMSFragment = graphql`
  fragment CourseCMSFragment on CMS_Course {
    title
    subtitle
    description_overview
    description
    cta_section {
      title
      description
    }
    cta_button {
      text_color
      text
      color
    }
    primary_button {
      text_color
      text
      color
    }
    author_photo {
      url
    }
    author_display {
      title
      subtitle
      description
    }
    description_overview
    author {
      username
      email
    }
    sections {
      id
      title
      description
      lectures {
        id
        title
      }
    }
  }
`;
