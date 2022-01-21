import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import ErrorBoundary from "../common/ErrorBoundary";
import AboutPage from "../features/about/AboutPage";
import HistoryPage from "../features/history/HistoryPage";
import SearchPage from "../features/search/SearchPage";
import Nav from "./Nav";

export default App;

function App() {
  return (
    <AppContainer>
      <Header>{process.env.REACT_APP_APPLICATION_NAME}</Header>
      <Nav />
      <Page />
    </AppContainer>
  );
}

function Page() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <PageContainer data-testid="pageContainer">
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route
            path="/search"
            element={
              <SearchPage
                queryUsername={queryParams.get("username")}
                queryPage={queryParams.get("page")}
              />
            }
          />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/search" replace />} />
        </Routes>
      </ErrorBoundary>
    </PageContainer>
  );
}

const AppContainer = styled.div`
  max-width: 50rem;
  min-width: 20rem;
  min-height: 100vh;
  margin: auto;
`;

const Header = styled.div`
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

const PageContainer = styled.div`
  padding: 1rem;
  overflow-x: hidden;
`;
