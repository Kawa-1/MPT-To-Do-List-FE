import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subtask } from '../task.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Output, EventEmitter } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent {
  @Input()
  tasks: Task[] = [];

  @Input()
  isWorkshop: boolean = false;

  @Input()
  myTasks: boolean = false;

  @Output()
  newTaskAssigned = new EventEmitter<Task | null>();

  subtasks: Subtask[] = [];
  selectedTask: Task | null = null;
  taskStatuses: string[] = ['todo', 'doing', 'done'];

  todo: Subtask[] = [];
  doing: Subtask[] = [];
  done: Subtask[] = [];

  isLoading: boolean = false;

  subtaskName: string = '';
  subsubtaskDescription: string = '';

  closeResult: string = '';
  modalOptions: NgbModalOptions;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  showTaskDetails(task: Task): void {
    this.selectedTask = task;
    this.retrieveSubtasks(task);
  }

  retrieveSubtasks(task: Task| null) {
    let taskId: number = task == null ? 0 : task.tid
    this.taskService.getSubtasks(taskId).subscribe({
      next: (response) => {
        this.subtasks = response;
        this.todo = this.filterSubtasksByStatus('todo');
        this.doing = this.filterSubtasksByStatus('doing');
        this.done = this.filterSubtasksByStatus('done');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterSubtasksByStatus(status: string): Subtask[] {
    return this.subtasks?.filter((subtask) => subtask.status === status) || [];
  }

  drop(event: any, status: 'todo' | 'doing' | 'done'): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const droppedSubtaskId = event.item.data.sid;
    const subtask = this.subtasks.find((st) => st.sid === droppedSubtaskId);
    if (subtask) {
      subtask.status = status;
    }
    this.taskService.updateSubtaskStatus(droppedSubtaskId, status).subscribe({
      next: () => console.log('succ'),
      error: (err) => console.error(err),
    });
  }

  createSubtask(): void {
    this.taskService
      .createSubtask(
        this.selectedTask === null ? 0 : this.selectedTask.tid,
        this.subtaskName,
        this.subsubtaskDescription
      )
      .subscribe({
        next: () => {
          this.subtaskName = '';
          this.subsubtaskDescription = '';
          this.modalService.dismissAll();
          this.retrieveSubtasks(this.selectedTask);
        },
        error: (err) => console.log(err),
      });
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

  assignToMyWorkshop() {
    this.taskService
      .assignTask(this.selectedTask === null ? 0 : this.selectedTask.tid)
      .subscribe({
        next: (resp) => {
          this.newTaskAssigned.emit(this.selectedTask);
        },
        error: (err) => console.error(err),
      });
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
}
