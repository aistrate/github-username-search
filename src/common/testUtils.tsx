import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "../app/store";

export { renderWithWrapper };

function renderWithWrapper(ui: ReactElement, options?: RenderOptions) {
  window.localStorage.clear();

  const store = createStore();

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
    options
  );
}
