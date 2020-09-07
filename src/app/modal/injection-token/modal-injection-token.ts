import { InjectionToken, Injector } from '@angular/core';
import { PortalInjector } from '@angular/cdk/portal';
import { ModalRef } from '../modal-ref';

export const MODAL_DATA = new InjectionToken<ModalRef>('ModalRef');

export class ModalInjectionToken {
  public static buildPortalInjector(injector: Injector, modalRef: ModalRef): PortalInjector {
    const injectionTokens = new WeakMap([
      [MODAL_DATA, modalRef]
    ]);
    return new PortalInjector(injector, injectionTokens);
  }
}
