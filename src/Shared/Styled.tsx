import { forwardRef } from "react";

export {
  TextInput,
  Button,
  Message,
  Loading,
  LargeHeading,
  SmallHeading,
  Row,
  ExternalLink,
};

const TextInput = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<"input">,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <input
      className="TextInput"
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      ref={ref}
      {...props}
    />
  )
);

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button className="Button" {...props} />;
}

type MessageProps = {
  type: "info" | "error";
  children?: React.ReactNode;
};

function Message({ type, children }: MessageProps) {
  const className = type === "error" ? "Message Message__error" : "Message";

  return <div className={className}>{children}</div>;
}

type LoadingProps = {
  isLoading: boolean;
};

function Loading({ isLoading }: LoadingProps) {
  return <>{isLoading && <div className="Loading">Loading...</div>}</>;
}

function LargeHeading(props: React.ComponentPropsWithoutRef<"h2">) {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h2 className="LargeHeading" {...props}></h2>;
}

function SmallHeading(props: React.ComponentPropsWithoutRef<"h3">) {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h3 className="SmallHeading" {...props}></h3>;
}

type RowProps = {
  label: string;
  children?: React.ReactNode;
};

function Row({ label, children }: RowProps) {
  return (
    <div className="Row">
      <dt className="Row__label">{label}:</dt>
      <dd className="Row__content">{children}</dd>
    </div>
  );
}

function ExternalLink(props: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" className="Link" {...props} />;
}
