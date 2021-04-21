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
  Link,
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

type SmallHeadingProps = React.ComponentPropsWithoutRef<"h3"> & {
  largeMarginTop?: boolean;
};

function SmallHeading({ largeMarginTop = false, ...props }: SmallHeadingProps) {
  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      className={`SmallHeading ${
        largeMarginTop ? "SmallHeading--largeMarginTop" : ""
      }`}
      {...props}
    ></h3>
  );
}

type RowProps = {
  label?: React.ReactNode;
  labelSuffix?: string;
  children?: React.ReactNode;
};

function Row({ label, labelSuffix = ":", children }: RowProps) {
  return (
    <div className="Row">
      <dt className="Row__label">
        {label}
        {labelSuffix}
      </dt>
      <dd className="Row__content">{children}</dd>
    </div>
  );
}

function ExternalLink(props: React.ComponentProps<typeof Link>) {
  return <Link target="_blank" rel="noreferrer" {...props} />;
}

function Link(props: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className="Link" {...props} />;
}
