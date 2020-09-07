import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ModalAction, ModalActionView, ModalActionType } from './modal-action.interface';

export class ModalRef<T = any> {
  close$ = new Subject<ModalAction<T>>();

  constructor(
    public overlayRef: OverlayRef,
    public data: T) {
      overlayRef.backdropClick().subscribe(_ => this._close(ModalActionView.DISMISS));
  }

  close(data?: T) {
    this._close(ModalActionView.CLOSE, data);
  }

  private _close(type: ModalActionType, data?: T) {
    this.overlayRef.dispose();
    this.close$.next({
      data,
      type
    });
    this.close$.complete();
  }

}
