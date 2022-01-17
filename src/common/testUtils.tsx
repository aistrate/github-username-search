import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { createStore } from "../app/store";

export { renderWithWrapper };

function renderWithWrapper(ui: ReactElement, options?: RenderOptions) {
  const store = createStore();

  return render(<Provider store={store}>{ui}</Provider>, options);
}
