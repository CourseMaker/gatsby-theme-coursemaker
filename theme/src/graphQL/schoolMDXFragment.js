import { graphql } from "gatsby";

export const SchoolMDXFragment = graphql`
  fragment SchoolMDXFragment on Site {
      siteMetadata {
        landing_page {
          title_and_description {
            title
            description
          }
        }
      }
    }
`;
