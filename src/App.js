import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Layout from "./containers/Layout";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import PrivateRoute from "./routes/privateRoutes";
import PublicRoute from "./routes/publicRoutes";

function App() {
  return (
    <>
      <ToastProvider autoDismiss placement="bottom-right">
        <Router>
          <Switch>
            <PublicRoute restricted component={Login} path="/login" />
            <PublicRoute
              restricted
              component={CreateAccount}
              path="/create-account"
            />
            <PrivateRoute component={Layout} path="/app" />
            <Redirect to="login" from="/" />
          </Switch>
        </Router>
      </ToastProvider>
    </>
  );
}

export default App;
