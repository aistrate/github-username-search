import { render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import renderer from "react-test-renderer";
import styled from "styled-components";
import { createStore } from "../app/store";

export { renderWithWrapper, createRendererWithWrapper, delay, RoutingLocation };

/**
 * Renderer used by most tests. Uses jsdom as a full DOM implementation in Node.js.
 * Can handle user events (click, etc.) on the page.
 */
function renderWithWrapper(ui: ReactElement, initialRoute = "/") {
  const Wrapper = createWrapper(initialRoute);

  return render(ui, { wrapper: Wrapper });
}

/**
 * Renderer used by snapshot tests.
 */
function createRendererWithWrapper(ui: ReactElement, initialRoute: string) {
  const Wrapper = createWrapper(initialRoute);

  return renderer.create(<Wrapper>{ui}</Wrapper>);
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

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
