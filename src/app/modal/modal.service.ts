import { Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ModalInjectionToken } from './injection-token/modal-injection-token';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { ModalRef } from './modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

  public openComponent<T = any>(component: any, injectionData?: T): ModalRef<T> {
    const overlayRef = this.createOverlay();
    const modalRef = new ModalRef<T>(overlayRef, injectionData);
    const componentPortal = this.buildComponentPortal(component, modalRef);
    this.buildModalPortal(overlayRef, componentPortal);
    return modalRef;
  }

  public openTemplate(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef): ModalRef {
    const templatePortal = new TemplatePortal<any>(templateRef, viewContainerRef);
    const overlayRef = this.createOverlay();
    const modalRef = new ModalRef(overlayRef, undefined);
    this.buildModalPortal(overlayRef, templatePortal);
    return modalRef;
  }

  private buildComponentPortal(component: any, modalRef: ModalRef): ComponentPortal<any> {
    const compPortalInjector = ModalInjectionToken.buildPortalInjector(this.injector, modalRef);
    const compPortal = new ComponentPortal(component, null, compPortalInjector);
    return compPortal;
  }

  private buildModalPortal(overlayRef: OverlayRef, portal: ComponentPortal<any> | TemplatePortal) {
    const modalPortal = new ComponentPortal(GenericModalComponent);
    const modalComponentRef = overlayRef.attach(modalPortal);
    modalComponentRef.instance.portal = portal;
  }

  private createOverlay() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay__backdrop',
      disposeOnNavigation: true
    });
  }
}
