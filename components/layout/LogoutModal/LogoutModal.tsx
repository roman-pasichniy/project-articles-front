"use client";

import Modal from "@/components/common/Modal/Modal";
import css from "./LogoutModal.module.css";

type LogoutModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Підтвердження виходу">
      <div className={css.content}>
        <h2 className={css.title}>Log out</h2>
        <p className={css.description}>
          Are you sure you want to log out of your account?
        </p>
        <div className={css.actions}>
          <button
            className={css.primaryButton}
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log out"}
          </button>
          <button
            className={css.secondaryButton}
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
