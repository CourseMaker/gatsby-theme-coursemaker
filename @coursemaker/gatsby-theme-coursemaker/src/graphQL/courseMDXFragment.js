import { graphql } from "gatsby";

export const CourseMDXFragment = graphql`
  fragment CourseMDXFragment on Course {
    id
    title
    slug
    sections: Sections {
      id
      slug
      title
      lectures: Lectures {
        id
        slug
        title
      }
    }
  }
`;
