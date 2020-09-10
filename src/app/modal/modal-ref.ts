import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ModalAction, ModalActionView, ModalActionType } from './modal-action.interface';

export class ModalRef<T = any> {
  close$ = new Subject<ModalAction<T>>();

  constructor(
    public overlayRef: OverlayRef,
    public data: T) {
      overlayRef.backdropClick().subscribe(_ => this._close(ModalActionView.DISMISS));
      this.addClassToBody();
  }

  close(data?: T) {
    this._close(ModalActionView.CLOSE, data);
  }

  _close(type: ModalActionType, data?: T) {    
    this.removeClassFromBody();
    this.overlayRef.dispose();
    this.close$.next({
      data,
      type
    });
    this.close$.complete();
  }

  addClassToBody() {
    // attempt to control body overflow
    if (this.overlayRef.hostElement.parentElement.childNodes.length > 0) {
      if(!document.body.classList.contains('modalOpen')) {
        document.body.classList.add('modalOpen');
      }
    }
  }

  removeClassFromBody() {
    // attempt to control body overflow
    if(!this.overlayRef.hasAttached()) return;
    document.body.classList.remove('modalOpen');
  }

}
