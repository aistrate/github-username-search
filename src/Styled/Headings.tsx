import { forwardRef } from "react";
import styles from "./Headings.module.css";

export { LargeHeading, SmallHeading };

const LargeHeading = forwardRef((
  props: React.ComponentPropsWithoutRef<"h2">,
  ref: React.ForwardedRef<HTMLHeadingElement>
  // eslint-disable-next-line jsx-a11y/heading-has-content
) => <h2 className={styles.LargeHeading} ref={ref} {...props}></h2>);

type SmallHeadingProps = React.ComponentPropsWithoutRef<"h3"> & {
  largeMarginTop?: boolean;
};

function SmallHeading({ largeMarginTop = false, ...props }: SmallHeadingProps) {
  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      className={`${styles.SmallHeading} ${
        largeMarginTop ? styles.largeMarginTop : ""
      }`}
      {...props}
    ></h3>
  );
}
