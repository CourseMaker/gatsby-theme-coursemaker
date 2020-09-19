import { graphql } from "gatsby";

export const SchoolCMSFragment = graphql`
  fragment SchoolCMSFragment on CMS_LandingPage {
      title_and_description {
        title
        description
      }
    }
`;
