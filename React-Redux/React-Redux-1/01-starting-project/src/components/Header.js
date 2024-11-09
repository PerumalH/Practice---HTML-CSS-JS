import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { AuthAction } from "../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const AuthCheck = useSelector((stat) => stat.Auth.Authenticator);
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        {AuthCheck && (
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={() => dispatch(AuthAction.LogOut())}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
