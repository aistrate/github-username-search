export { ExternalLink };

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
