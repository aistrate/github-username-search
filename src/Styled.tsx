export { TextInput, Button, Message, LargeHeading, SmallHeading, Row, Link };

function TextInput(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className="TextInput"
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      {...props}
    />
  );
}

function Button({
  disabled = false,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const className = disabled ? "Button Button--disabled" : "Button";
  return <button className={className} disabled={disabled} {...props} />;
}

type MessageProps = {
  error?: string;
  info?: string;
};

function Message({ error, info }: MessageProps) {
  return (
    <div className="Message">
      {error && <div className="Message__error">{error}</div>}
      {info && <div>{info}</div>}
    </div>
  );
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

function Link(props: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" className="Link" {...props} />;
}
