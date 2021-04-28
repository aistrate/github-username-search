import styles from "./Links.module.css";

export { ExternalLink };

function ExternalLink(props: React.ComponentProps<typeof Link>) {
  return <Link target="_blank" rel="noreferrer" {...props} />;
}

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  nowrap?: boolean;
};

function Link({ nowrap = false, ...props }: LinkProps) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a className={`${styles.Link} ${nowrap ? styles.nowrap : ""}`} {...props} />
  );
}
