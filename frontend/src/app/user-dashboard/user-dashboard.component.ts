import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModal, NgbModalOptions, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  isLoading:boolean = false;
  carname:string = '';
  model:string = '';
  productionYear:string = '';
  problemDescription: string = '';
  modalOptions: NgbModalOptions;
  closeResult: string = '';
  showSuccess: boolean = true;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  handleShowMyOrders() {

  }


  openModal(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  tryCreateOrder() {
    console.log('Create');
    this.modalService.dismissAll();
    this.showSuccess = true;
  }

}
