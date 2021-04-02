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
    <div className="App">
      <Router>
        <Header />
        <Nav />
        <Content />
      </Router>
    </div>
  );
}

function Header() {
  return <div className="Header">{appName}</div>;
}

function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav__list">
        <li className="Nav__list-item">
          <NavLink
            to="/search"
            className="Nav__link"
            activeClassName="Nav__link--active"
          >
            Search
          </NavLink>
        </li>
        <li className="Nav__list-item">
          <NavLink
            to="/history"
            className="Nav__link"
            activeClassName="Nav__link--active"
          >
            History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Content() {
  return (
    <div className="Content">
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
  );
}
