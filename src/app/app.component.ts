import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import { MessageModal } from './modal/message-modal/message-modal.interface';
import { GenericModalRef } from './modal/generic-modal-ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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

  nestedChildRef: GenericModalRef;
  nestedParentRef: GenericModalRef;

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

  openLargeContent() {
    this.modalService.openComponent(MessageModalComponent, {
      title: 'Paisis, filhis, espiritis santis',
      message: 'Diuretics paradis num copo é motivis de denguis. Casamentiss faiz malandris se pirulitá. Posuere libero varius.'.repeat(50),
      buttons: [{
        id: 'b',
        class: 'secondary',
        text: 'atirei'
      }, {
        id: 'a',
        class: 'primary',
        text: 'pau no gatis'
      }]
    });
  }
}
