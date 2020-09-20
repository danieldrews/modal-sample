import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ModalInjectionToken } from './injection-token/modal-injection-token';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { GenericModalRef } from './generic-modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private overlay: Overlay) { }

  openComponent = <T = any>(component: any, injectionData?: T): GenericModalRef<T> => 
    this._open(_ => this._getComponentPortal(component, _), injectionData);

  openTemplate = (templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef): GenericModalRef => 
    this._open(_ => new TemplatePortal<any>(templateRef, viewContainerRef));

  _open<T = any>(generateCdkPortal: (_ :GenericModalRef) => Portal<any>, injectionData?: T) {
    const overlayRef = this._createOverlay();
    
    const genericModalRef = new GenericModalRef<T>(overlayRef, injectionData);

    const portal = generateCdkPortal(genericModalRef);

    this._attachPortalInGenericModal(overlayRef, portal);

    return genericModalRef;
  }

  _getComponentPortal = <T = any>(component: any, genericModalRef: GenericModalRef<T>) =>
    new ComponentPortal(component, null, ModalInjectionToken.createGenericModalInjector(genericModalRef));

  _attachPortalInGenericModal = (overlayRef: OverlayRef, portal: Portal<any>) => 
    overlayRef.attach(new ComponentPortal(GenericModalComponent, null, ModalInjectionToken.createCustomPortalInjector(portal)));

  _createOverlay = () => this.overlay.create({
    hasBackdrop: true,
    backdropClass:
    'overlay__backdrop',
    panelClass: 'modal',
    scrollStrategy: this.overlay.scrollStrategies.noop()
  })
}
