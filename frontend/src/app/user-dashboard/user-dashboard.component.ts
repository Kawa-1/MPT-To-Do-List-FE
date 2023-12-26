import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../task.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  isLoading: boolean = false;

  orderCarId: string = '';
  orderProblemDescription: string = '';
  orderName: string = '';

  carName: string = '';
  carDescription: string = '';

  modalOptions: NgbModalOptions;
  closeResult: string = '';

  showSuccess: boolean = false;
  showError: boolean = false;
  showMainPanel: boolean = true;
  showOrders: boolean = false;

  constructor(private modalService: NgbModal, private taskService: TaskService, private carService: CarService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  handleShowMyOrders() {
    this.showMainPanel = false;
    this.showOrders = true;
  }

  openModal(content: any) {
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  tryCreateOrder() {
    console.log('Create');
    this.modalService.dismissAll();
    this.showSuccess = true;
  }

  tryCreateCar() {
    this.carService.addCar({name:this.carName, description: this.carDescription, authToken: ''}).subscribe({
      next: (response) => {
        this.showSuccess = true;
        setTimeout(() => (this.showSuccess = false), 5000);
      },
      error: () => {
        this.showError = true;
        setTimeout(() => (this.showError = false), 5000);
      }
    });
    this.modalService.dismissAll();
    this.showSuccess = true;
  }
}
