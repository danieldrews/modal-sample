import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import { MessageModal } from './modal/message-modal/message-modal.interface';
import { ModalRef } from './modal/modal-ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'modal-sample';

  componentModalData: MessageModal = {
    title: 'Mussum Ipsum',
    message: 'Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.',
    buttons: [{
      id: 'CACILDS_ID',
      class: 'secondary',
      text: 'Cacilds'
    }, {
      id: 'MUSSUM_ID',
      class: 'primary',
      text: 'Mussum!'
    }]
  };

  componentModalActions = [];

  nestedChildRef: ModalRef;
  nestedParentRef: ModalRef;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef) { }

    openComponentModal(messageModal) {
      const modalRef = this.modalService.openComponent(MessageModalComponent, messageModal);
      modalRef.close$.subscribe(action => {
        this.componentModalActions.push(`action ${action.type} was fired with data: ${action.data}`);
      });
  }

  openTemplate(template) {
    const modalRef = this.modalService.openTemplate(template, this.viewContainerRef);
  }

  openNestedSample(template) {
    this.nestedParentRef = this.modalService.openTemplate(template, this.viewContainerRef);
  }

  openNestedChild(template) {
    this.nestedChildRef = this.modalService.openTemplate(template, this.viewContainerRef);
  }
}
