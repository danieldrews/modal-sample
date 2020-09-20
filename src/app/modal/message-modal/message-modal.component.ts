import { Component, OnInit, Inject } from '@angular/core';
import { MODAL_DATA } from '../injection-token/modal-injection-token';
import { GenericModalRef } from '../generic-modal-ref';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  modal: any;

  constructor(
    @Inject(MODAL_DATA) private genericModalRef: GenericModalRef) { }

  ngOnInit(): void {
    this.modal = this.genericModalRef.data;
  }

  close() {
    this.genericModalRef.close();
  }

  btnClick(id: string) {
    this.genericModalRef.close(id);
  }
}
