import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import styles from "./App.module.css";
import { ErrorBoundary } from "./Shared/ErrorBoundary";
import SearchPage from "./Search/SearchPage";
import HistoryPage from "./History/HistoryPage";
import AboutPage from "./About/AboutPage";

export default App;

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        {process.env.REACT_APP_APPLICATION_NAME}
      </div>

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
      <ul className={styles.Nav}>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/history">History</NavItem>
        <NavItem to="/about">About</NavItem>
      </ul>
    </nav>
  );
}

function Content() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={styles.Content}>
      <ErrorBoundary key={location.pathname}>
        <Switch>
          <Route path="/search">
            <SearchPage
              queryUsername={queryParams.get("q")}
              queryPage={queryParams.get("page")}
            />
          </Route>
          <Route path="/history">
            <HistoryPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="*">
            <Redirect to="/search" />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

type NavItemProps = {
  to: string;
  children?: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <li className={styles.NavItem}>
      <NavLink to={to} className={styles.link} activeClassName={styles.active}>
        {children}
      </NavLink>
    </li>
  );
}
