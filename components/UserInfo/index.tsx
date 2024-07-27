import styles from "./UserInfo.module.scss";

export const UserInfo = ({
  avatarUrl,
  fullName,
  additionalText,
}: {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
