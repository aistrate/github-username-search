import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Search from "./Search";
import History from "./History";

export default App;

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
            <Search />
          </Route>
          <Route path="/history">
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
