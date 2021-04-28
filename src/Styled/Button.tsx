import styles from "./Button.module.css";

export default Button;

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button className={styles.Button} {...props} />;
}
