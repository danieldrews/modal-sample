import { ModalButton } from './moda-button.interface';

export interface MessageModal {
  title: string;
  message: string;
  buttons: Array<ModalButton>;
}
