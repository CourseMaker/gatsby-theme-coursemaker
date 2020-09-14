/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const Button = ({ to = "/", variant = "primary", size = "lg", ...props }) => {
  return (
    <Link
      to={to}
      className={`btn btn-${size}`}
      sx={{
        mx: 1,
        variant: `buttons.${variant}`,
      }}
      {...props}
    >
      {props.text}
    </Link>
  );
};

export default Button;
