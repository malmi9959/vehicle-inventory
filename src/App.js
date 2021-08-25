import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Login from "./pages/Login";
import PublicRoute from "./routes/publicRoutes";

function App() {
  return (
    <>
      <ToastProvider autoDismiss placement="bottom-right">
        <Router>
          <Switch>
            <PublicRoute restricted component={Login} path="/login" />
            <Redirect to="login" from="/" />
          </Switch>
        </Router>
      </ToastProvider>
    </>
  );
}

export default App;
