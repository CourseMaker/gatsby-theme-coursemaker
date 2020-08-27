/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import Curriculum from "./curriculum";

const LecturePage = ({ page }) => (
  <Layout>
    <h1>{page.title}</h1>
    <h2>{page.youtubeId}</h2>
    <MDXRenderer>{page.body}</MDXRenderer>
    <p
      sx={{
        color: 'muted',
        fontSize: 14,
        mt: 2,
        pt: 2,
        borderTop: t => `1px solid ${t.colors.muted}`,
      }}
    >
      This page was updated {page.updated}.
    </p>
    <Curriculum />
  </Layout>
);

export default LecturePage;