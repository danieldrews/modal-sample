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
    this.open(_ => this.getComponentPortal(component, _), injectionData);

  openTemplate = (templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef): GenericModalRef => 
    this.open(_ => new TemplatePortal<any>(templateRef, viewContainerRef));

  private open<T = any>(generateCdkPortal: (_ :GenericModalRef) => Portal<any>, injectionData?: T) {
    const overlayRef = this.createOverlay();
    
    const genericModalRef = new GenericModalRef<T>(overlayRef, injectionData);

    const portal = generateCdkPortal(genericModalRef);

    this.attachPortalInGenericModal(overlayRef, portal);

    return genericModalRef;
  }

  private getComponentPortal = <T = any>(component: any, genericModalRef: GenericModalRef<T>) =>
    new ComponentPortal(component, null, ModalInjectionToken.createGenericModalInjector(genericModalRef));

  private attachPortalInGenericModal = (overlayRef: OverlayRef, portal: Portal<any>) => 
    overlayRef.attach(new ComponentPortal(GenericModalComponent, null, ModalInjectionToken.createCustomPortalInjector(portal)));

  private createOverlay = () => this.overlay.create({
    hasBackdrop: true,
    scrollStrategy: this.overlay.scrollStrategies.noop(),
    positionStrategy: this.overlay.position()
    .global().centerHorizontally().centerVertically()
  })
}
