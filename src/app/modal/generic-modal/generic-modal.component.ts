import { Component, ViewChild, AfterViewInit, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
import { CdkPortalOutlet, PortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericModalComponent implements AfterViewInit {

  //@HostBinding('class') class = 'modal';

  @ViewChild(CdkPortalOutlet, {static: false}) portalOutlet: PortalOutlet;

  portal: ComponentPortal<any> | TemplatePortal;

  constructor() { }

  ngAfterViewInit(): void {
    const componentRef = this.portalOutlet.attach(this.portal);
    componentRef.changeDetectorRef?.detectChanges();
  }
}
