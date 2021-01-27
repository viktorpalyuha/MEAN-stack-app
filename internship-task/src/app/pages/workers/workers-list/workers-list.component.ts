import { Component, OnInit } from '@angular/core';
import { WorkersService } from './../workers.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css'],
})
export class WorkersListComponent implements OnInit {
  workers: Worker[] = [];

  constructor(private workersService: WorkersService) {
    this.readWorkers();
  }

  ngOnInit(): void {}

  readWorkers(): void {
    this.workersService.getWorkers().subscribe((data) => {
      this.workers = data;
    });
  }

  removeWorker(id: string): void {
    this.workersService.deleteWorker(id).subscribe((data) => {
      const workersCopy = [...this.workers].filter(
        (item: any) => item._id !== data._id
      );
      this.workers = workersCopy;
    });
  }
}
