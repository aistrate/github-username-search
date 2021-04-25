import React from "react";
import { Message } from "../Shared/Styled";

type ErrorBoundaryProps = {
  children?: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  render() {
    if (this.state.error) {
      return <Message type="error">{this.state.error.toString()}</Message>;
    }

    return this.props.children;
  }
}
