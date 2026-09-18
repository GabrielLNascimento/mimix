import { Link } from "react-router";
import "./Button.css"

const ButtonLink = ({ text, path, func }) => {
    return (
        <Link className="button-component" to={path} onClick={func} >
            {text}
        </Link>
    );
};

export default ButtonLink;
