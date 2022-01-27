import { render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import styled from "styled-components";
import { createStore } from "../app/store";

export { renderWithWrapper, RoutingLocation };

function renderWithWrapper(ui: ReactElement, initialRoute = "/") {
  const Wrapper = createWrapper(initialRoute);

  return render(ui, { wrapper: Wrapper });
}

function createWrapper(initialRoute: string) {
  const store = createStore();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </Provider>
  );

  return Wrapper;
}

function RoutingLocation() {
  const location = useLocation();

  return (
    <Container data-testid="routingLocation">
      {location.pathname + location.search}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
`;
