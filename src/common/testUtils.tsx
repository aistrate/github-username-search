import { render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "../app/store";

export { renderWithWrapper };

function renderWithWrapper(ui: ReactElement, routerEntries = ["/"]) {
  const store = createStore();

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={routerEntries}>{children}</MemoryRouter>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper });
}
