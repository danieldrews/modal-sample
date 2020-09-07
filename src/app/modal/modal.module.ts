import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

@NgModule({
  declarations: [GenericModalComponent, MessageModalComponent],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ]
})
export class ModalModule { }
