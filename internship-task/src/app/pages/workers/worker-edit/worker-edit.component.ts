import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkersService } from './../workers.service';
import { Worker } from './../../../shared/models/worker.model';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css'],
})
export class WorkerEditComponent implements OnInit {
  @Output() saveClicked = new EventEmitter<Worker>();
  worker: Worker = {
    name: '',
    surname: '',
    email: '',
    phone: '',
  };
  id: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private workersService: WorkersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.getWorker(this.id);
  }

  getWorker(id): void {
    this.workersService.getWorker(id).subscribe((data) => {
      this.worker = data;
    });
  }

  onSaveClick(): void {
    this.workersService.updateWorker(this.id, this.worker).subscribe((_) => {
      this.router.navigate(['workers/workers-list']);
    });
  }

  onCancelClick(): void {
    this.router.navigate(['workers/workers-list']);
  }
}
