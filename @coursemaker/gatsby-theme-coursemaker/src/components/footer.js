/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

const Footer = ({ schoolThemeStyle = { primaryColor: 'blue' } }) => (
    <footer className="py-8 text-sm">
        <div className="container">
            <div className="flex justify-between">
                <p className="text-center text-gray-500">
                    Powered by
                    <a
                        href="https://coursemaker.org"
                        className={`font-bold text-${schoolThemeStyle?.primaryColor}-500`}
                    >
                        {' '}
                        CourseMaker
                    </a>
                </p>

                <div className={`flex ml-auto space-x-5 text-${schoolThemeStyle?.primaryColor}-500`}>
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy">Privacy</Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
