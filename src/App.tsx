import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SearchPage from "./Search/SearchPage";
import HistoryPage from "./History/HistoryPage";
import AboutPage from "./About/AboutPage";

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
  const queryParams = useQueryParams();

  return (
    <div className="Content">
      <Switch>
        <Route path="/search">
          <SearchPage
            appName={appName}
            queryUsername={queryParams.get("q")}
            queryPage={queryParams.get("page")}
          />
        </Route>
        <Route path="/history">
          <HistoryPage appName={appName} />
        </Route>
        <Route path="/about">
          <AboutPage appName={appName} />
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

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
