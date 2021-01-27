import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  baseURL = 'workers';
  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  createWorker(data): Observable<any> {
    const url = `${this.baseURL}/create`;
    return this.http.post(url, data);
  }

  getWorkers(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getWorker(id): Observable<any> {
    const url = `${this.baseURL}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }

  updateWorker(id, data): Observable<any> {
    const url = `${this.baseURL}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers });
  }

  deleteWorker(id): Observable<any> {
    const url = `${this.baseURL}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
