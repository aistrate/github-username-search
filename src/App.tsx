import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import styled from "styled-components/macro";
import { ErrorBoundary } from "./Shared/ErrorBoundary";
import SearchPage from "./Search/SearchPage";
import HistoryPage from "./History/HistoryPage";
import AboutPage from "./About/AboutPage";

export default App;

function App() {
  return (
    <AppContainer>
      <AppHeader>{process.env.REACT_APP_APPLICATION_NAME}</AppHeader>

      <Router>
        <Nav />
        <Content />
      </Router>
    </AppContainer>
  );
}

function Nav() {
  return (
    <nav>
      <NavList>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/history">History</NavItem>
        <NavItem to="/about">About</NavItem>
      </NavList>
    </nav>
  );
}

function Content() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
}

type NavItemProps = {
  to: string;
  children?: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavItemContainer>
      <StyledNavLink to={to} activeClassName="active">
        {children}
      </StyledNavLink>
    </NavItemContainer>
  );
}

const AppContainer = styled.div`
  max-width: 50rem;
  min-width: 20rem;
  min-height: 100vh;
  margin: auto;
`;

const AppHeader = styled.div`
  background-color: #1b4371;
  color: white;
  font-size: 2.25rem;
  text-align: center;
  padding: 0.6em 0;

  @media (max-width: 50em) {
    & {
      font-size: calc(1.25rem + 2vw);
    }
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0.85);
  font-size: 1.25rem;
`;

const NavItemContainer = styled.li`
  float: left;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  color: rgb(255, 255, 255, 0.5);
  font-weight: 600;
  padding: 0.4em 0.8em;
  text-align: center;
  text-decoration: none;

  :hover {
    color: white;
    background-color: rgb(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
  }
`;

const ContentContainer = styled.div`
  padding: 1rem;
  overflow-x: hidden;
`;
