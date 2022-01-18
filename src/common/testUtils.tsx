import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "../app/store";

export { renderWithWrapper };

interface RenderWithWrapperOptions extends RenderOptions {
  routerEntries?: string[];
}

function renderWithWrapper(
  ui: ReactElement,
  { routerEntries = ["/"], ...renderOptions }: RenderWithWrapperOptions = {}
) {
  window.localStorage.clear();

  const store = createStore();

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={routerEntries}>{ui}</MemoryRouter>
    </Provider>,
    renderOptions
  );
}
