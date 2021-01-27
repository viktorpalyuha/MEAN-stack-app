import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkersService } from './../workers.service';
import { Worker } from './../../../shared/models/worker.model';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent implements OnInit {
  @Input() worker: Worker;
  @Output() deleteClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onDeleteClick(): void {
    this.deleteClicked.emit(this.worker._id);
  }
}
