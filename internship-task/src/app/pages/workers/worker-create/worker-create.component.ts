import { FormCheckerService } from './../../../form-checker.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkersService } from '../workers.service';
import { Worker } from './../../../shared/models/worker.model';

@Component({
  selector: 'app-worker-create',
  templateUrl: './worker-create.component.html',
  styleUrls: ['./worker-create.component.css'],
})
export class WorkerCreateComponent implements OnInit {
  worker: Worker = {
    name: '',
    surname: '',
    email: '',
    phone: '',
  };

  constructor(
    private formChecker: FormCheckerService,
    private router: Router,
    private workersService: WorkersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.formChecker.checkForm(this.worker)) {
      return;
    }

    this.workersService.createWorker(this.worker).subscribe((data: any) => {
      this.router.navigate(['../workers-list'], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
