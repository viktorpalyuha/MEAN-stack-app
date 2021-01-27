import { Injectable } from '@angular/core';
import { Form } from './shared/models/form.model';
import { Worker } from './shared/models/worker.model';

@Injectable({
  providedIn: 'root',
})
export class FormCheckerService {
  constructor() {}

  checkForm(form: Form | Worker): boolean {
    let incorrectInput: string;
    Object.keys(form).map((item) => {
      return form[item]
        ? null
        : (incorrectInput = 'Incorrect input has been found');
    });
    return incorrectInput ? false : true;
  }
}
