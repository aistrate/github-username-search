import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "../app/store";

export { renderWithWrapper };

function renderWithWrapper(ui: ReactElement, routerEntries = ["/"]) {
  const store = createStore();

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={routerEntries}>{ui}</MemoryRouter>
    </Provider>
  );
}
