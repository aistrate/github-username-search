import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import SearchPage from "./SearchPage";
import HistoryPage from "./HistoryPage";
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
      </ul>
    </nav>
  );
}

function Content() {
  return (
    <div className="Content">
      <Switch>
        <Route path="/search">
          <WindowTitle value={`Search - ${appName}`} />
          <SearchPage />
        </Route>
        <Route path="/history">
          <WindowTitle value={`History - ${appName}`} />
          <HistoryPage />
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
