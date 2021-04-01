import {
  BrowserRouter as Router,
  Link,
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
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
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
