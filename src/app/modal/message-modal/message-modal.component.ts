import { Component, OnInit, Inject } from '@angular/core';
import { MODAL_DATA } from '../injection-token/modal-injection-token';
import { ModalRef } from '../modal-ref';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  modal: any;

  constructor(
    @Inject(MODAL_DATA) private modalRef: ModalRef) { }

  ngOnInit(): void {
    this.modal = this.modalRef.data;
  }

  close() {
    this.modalRef.close();
  }

  btnClick(id: string) {
    this.modalRef.close(id);
  }
}
