/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const Button = ({
  to = "/",
  variant = "primary",
  color = "primary",
  text_color = "white",
  size = "lg",
  ...props
}) => (
  <Link
    to={to}
    className={`btn btn-${size}`}
    sx={{
      mx: 1,
      variant: `buttons.${variant}`,
      bg: color,
      color: text_color,
    }}
    {...props}
  >
    {props.text}
  </Link>
);

export const Anchor = ({
  to = "/",
  color = "primary",
  text_color = "yellow",
  ...props
}) => (
  <a href={to} className={`font-semibold text-yellow-300`} {...props}>
    {props.children}
  </a>
);

export default Button;
