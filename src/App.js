import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Redirect to="login" from="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
