import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";
import Search from "./Search";
import History from "./History";

export default App;

const appName = "GitHub Username Search";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/search" activeStyle={{ fontWeight: "bold" }}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" activeStyle={{ fontWeight: "bold" }}>
                History
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/search">
            <Helmet>
              <title>Search - {appName}</title>
            </Helmet>
            <Search />
          </Route>
          <Route path="/history">
            <Helmet>
              <title>History - {appName}</title>
            </Helmet>
            <History />
          </Route>
          <Route path="*">
            <Redirect to="/search" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
