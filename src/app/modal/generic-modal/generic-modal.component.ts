import { Component, ViewChild, AfterViewInit, ViewEncapsulation, Inject, ChangeDetectorRef } from '@angular/core';
import { CdkPortalOutlet, PortalOutlet, Portal } from '@angular/cdk/portal';
import { CUSTOM_PORTAL } from '../injection-token/modal-injection-token';

@Component({
  template: `<div class="modal__dialog"><ng-container *cdkPortalOutlet></ng-container></div>`,
  styleUrls: ['./generic-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericModalComponent implements AfterViewInit {

  @ViewChild(CdkPortalOutlet, {static: false}) portalOutlet: PortalOutlet;

  constructor(
    @Inject(CUSTOM_PORTAL) private portal: Portal<any>,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.portalOutlet.attach(this.portal);
    this.cdr.detectChanges();
  }
}
