import { Fragment } from "react";
import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import User from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const AuthCheck = useSelector((stat) => stat.Auth.Authenticator);
  return (
    <Fragment>
      <Header />
      {!AuthCheck && <Auth />}
      {AuthCheck && <User />}
      <Counter />
    </Fragment>
  );
}

export default App;
