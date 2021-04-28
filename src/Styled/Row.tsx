import styles from "./Row.module.css";

export default Row;

type RowProps = {
  label?: React.ReactNode;
  labelSuffix?: string;
  children?: React.ReactNode;
};

function Row({ label, labelSuffix = ":", children }: RowProps) {
  return (
    <div className={styles.Row}>
      <dt className={styles.label}>
        {label}
        {labelSuffix}
      </dt>
      <dd className={styles.content}>{children}</dd>
    </div>
  );
}
