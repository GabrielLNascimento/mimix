import { Link } from "react-router";
import "./Button.css"

const Button = ({ text, path }) => {
    return (
        <Link className="button-component" to={path}>
            {text}
        </Link>
    );
};

export default Button;
