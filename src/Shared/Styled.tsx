import { forwardRef } from "react";

export {
  TextInput,
  Button,
  Loading,
  Message,
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

type LoadingProps = {
  isLoading: boolean;
};

function Loading({ isLoading }: LoadingProps) {
  return <>{isLoading && <div className="Loading">Loading...</div>}</>;
}

type MessageProps = {
  type: "info" | "error";
  children?: React.ReactNode;
};

function Message({ type, children }: MessageProps) {
  return (
    <div className={`Message ${type === "error" ? "Message__error" : ""}`}>
      {children}
    </div>
  );
}

const LargeHeading = forwardRef((
  props: React.ComponentPropsWithoutRef<"h2">,
  ref: React.ForwardedRef<HTMLHeadingElement>
  // eslint-disable-next-line jsx-a11y/heading-has-content
) => <h2 className="LargeHeading" ref={ref} {...props}></h2>);

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

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  nowrap?: boolean;
};

function Link({ nowrap = false, ...props }: LinkProps) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className={`Link ${nowrap ? "Link--nowrap" : ""}`} {...props} />;
}
