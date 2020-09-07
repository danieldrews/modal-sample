export type ModalActionType = 'DISMISS' | 'CLOSE';

export class ModalActionView {
  public static DISMISS: ModalActionType = 'DISMISS';
  public static CLOSE: ModalActionType = 'CLOSE';
}

export interface ModalAction<T> {
  type: ModalActionType;
  data: T;
}
