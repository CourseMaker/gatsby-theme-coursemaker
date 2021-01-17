/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

const Button = ({ to = '/', variant = 'primary', color = 'primary', text_color = 'white', size = 'lg', ...props }) => (
    <Link to={to} className={`btn text-white bg-${color}-500 text-${size} btn-${size}`} {...props}>
        {props.text}
    </Link>
);

export default Button;
