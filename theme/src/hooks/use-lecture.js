import { graphql, useStaticQuery } from 'gatsby';

const useLecture = () => {
  const data = useStaticQuery(graphql`
    query {
      allLecturePage {
        nodes {
          id
          title
          path
        }
      }
    }
  `);

  return data.allLecturePage.nodes;
};

export default useLecture;