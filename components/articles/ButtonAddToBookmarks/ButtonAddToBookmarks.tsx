import styles from "./ButtonAddToBookmarks.module.css";

export default function ButtonAddToBookmarks() {
  return (
    <button className={styles.button} type="button" aria-label="Save article">
      <svg className={styles.icon} aria-hidden="true">
        <use href="/icons/sprite.svg#icon-save" />
      </svg>
    </button>
  );
}
