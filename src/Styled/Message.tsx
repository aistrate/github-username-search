import styles from "./Message.module.css";

export default Message;

type MessageProps = {
  type: "info" | "error";
  children?: React.ReactNode;
};

function Message({ type, children }: MessageProps) {
  return (
    <div
      className={`${styles.Message} ${type === "error" ? styles.error : ""}`}
    >
      {children}
    </div>
  );
}
