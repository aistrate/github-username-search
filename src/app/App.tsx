import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import styled from "styled-components/macro";
import AboutPage from "../about/AboutPage";
import ErrorBoundary from "../common/ErrorBoundary";
import HistoryPage from "../history/HistoryPage";
import SearchPage from "../search/SearchPage";
import Nav from "./Nav";

export default App;

function App() {
  return (
    <AppContainer>
      <AppHeader>{process.env.REACT_APP_APPLICATION_NAME}</AppHeader>

      <BrowserRouter>
        <Nav />
        <Content />
      </BrowserRouter>
    </AppContainer>
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

const ContentContainer = styled.div`
  padding: 1rem;
  overflow-x: hidden;
`;
