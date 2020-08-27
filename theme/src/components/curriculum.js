/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import useLecture from '../hooks/use-lecture';

const Curriculum = () => {
  const pages = useLecture();

  return (
    <div>
      <h2>Explore the Course</h2>
      <ul>
        {pages.map(({ id, path, title }) => (
          <li key={id}>
            <Link
              to={path}
              sx={{
                '&.active': {
                  fontStyle: 'italic',
                  textDecoration: 'none',
                  ':after': { content: '" (currently viewing)"' },
                },
              }}
              activeClassName="active"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Curriculum;