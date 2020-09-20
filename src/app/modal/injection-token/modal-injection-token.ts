import { Portal } from '@angular/cdk/portal';
import { InjectionToken, Injector } from '@angular/core';
import { GenericModalRef } from '../generic-modal-ref';

export const MODAL_DATA = new InjectionToken<GenericModalRef>('GenericModalRef');
export const CUSTOM_PORTAL = new InjectionToken<Portal<any>>('CustomPortal');

export class ModalInjectionToken {
  static createGenericModalInjector(genericModalRef: GenericModalRef): Injector {
    return Injector.create({providers: [{ provide: MODAL_DATA, useValue: genericModalRef }]});
  }

  static createCustomPortalInjector(portal: Portal<any>): Injector {
    return Injector.create({providers: [{ provide: CUSTOM_PORTAL, useValue: portal }]});
  }
}
