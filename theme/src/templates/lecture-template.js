import React from 'react';
import { graphql } from 'gatsby';
import LecturePage from '../components/lecture';

export const query = graphql`
  query($pageID: String!) {
    page: lecturePage(id: { eq: $pageID }) {
      title
      updated(fromNow: true)
      body
      youtubeId
    }
  }
`;

const LecturePageTemplate = ({ data }) => <LecturePage page={data.page} />;

export default LecturePageTemplate;