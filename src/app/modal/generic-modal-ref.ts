import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ModalAction, ModalActionView, ModalActionType } from './modal-action.interface';

export class GenericModalRef<T = any> {
  close$ = new Subject<ModalAction<T>>();
  overlayContainer: HTMLElement;

  constructor(
    public overlayRef: OverlayRef,
    public data: T) {
      this.configure();
  }

  configure() {
    this.overlayRef.backdropClick().subscribe(_ => this._close(ModalActionView.DISMISS));
    this.overlayContainer = this.overlayRef.hostElement.parentElement;
    this._addClassToBody();
  }

  close(data?: T) {
    this._close(ModalActionView.CLOSE, data);
  }

  _close(type: ModalActionType, data?: T) {
    this.overlayRef.dispose();
    this._removeClassFromBody();
    this.close$.next({
      data,
      type
    });
    this.close$.complete();
  }

  _addClassToBody() {
    // attach class in body to control overflow
    if (this.overlayContainer.childNodes.length === 0) { return; }
    if (!document.body.classList.contains('modalOpen')) {
      document.body.classList.add('modalOpen');
    }
  }

  _removeClassFromBody() {
    // the backdrop remains after dispose until fade
    if (this.overlayContainer.childNodes.length > 1) { return; }
    document.body.classList.remove('modalOpen');
  }

}
