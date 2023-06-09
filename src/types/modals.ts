import { ReactElement } from "react";

type IModalType = "ok" | "warning" | "error" | "text";

interface IModalProps {
  className?: string;
  style?: object;
  onCancel: () => void;
  show: boolean;
  children?: ReactElement | string | ReactElement[];
}

interface ISimplifiedModalProps {
  onCancel: () => void;
  show: boolean;
  type: IModalType;
}

interface IConfirmationModalProps extends IModalProps {
  onCancel: () => void;
  show: boolean;
  type: IModalType;
  prompt?: string;
  onConfirm?: () => void;
  cancellationPrompt?: string;
  confirmationPrompt?: string;
}

export type {
  IModalType,
  IModalProps,
  ISimplifiedModalProps,
  IConfirmationModalProps,
};
