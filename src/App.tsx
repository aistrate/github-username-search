import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SearchPage from "./SearchPage";
import HistoryPage from "./HistoryPage";
import AboutPage from "./AboutPage";
import { WindowTitle } from "./Utils";

export default App;

const appName = "GitHub Username Search";

function App() {
  return (
    <div className="App">
      <div className="App__header">{appName}</div>

      <Router>
        <Nav />
        <Content />
      </Router>
    </div>
  );
}

function Nav() {
  return (
    <nav>
      <ul className="Nav">
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/history">History</NavItem>
        <NavItem to="/about">About</NavItem>
      </ul>
    </nav>
  );
}

function Content() {
  const urlParams = useUrlParams();
  const queryString = urlParams.get("q") || "";

  return (
    <div className="Content">
      <Switch>
        <Route path="/search">
          <WindowTitle
            value={`${
              queryString === "" ? "Search" : queryString
            } - ${appName}`}
          />
          <SearchPage queryString={queryString} />
        </Route>
        <Route path="/history">
          <WindowTitle value={`History - ${appName}`} />
          <HistoryPage />
        </Route>
        <Route path="/about">
          <WindowTitle value={`About - ${appName}`} />
          <AboutPage />
        </Route>
        <Route path="*">
          <Redirect to="/search" />
        </Route>
      </Switch>
    </div>
  );
}

type NavItemProps = {
  to: string;
  children?: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="NavItem">
      <NavLink
        to={to}
        className="NavItem__link"
        activeClassName="NavItem__link--active"
      >
        {children}
      </NavLink>
    </li>
  );
}

function useUrlParams() {
  return new URLSearchParams(useLocation().search);
}
