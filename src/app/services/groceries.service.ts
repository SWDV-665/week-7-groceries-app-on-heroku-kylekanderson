import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseUrl = "https://groceries-api-server.herokuapp.com";

  constructor(
    public http: HttpClient
  ) {
    console.log('Hello Groceries Service');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getItems() {
    return this.http.get(this.baseUrl + '/api/groceries');
  }

  removeItem(item) {
    console.log('removing item: ' + item._id);
    this.http.delete(this.baseUrl + '/api/groceries/' + item._id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  addItem(item) {
    console.log('adding item: ', item);
    this.http.post(this.baseUrl + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  editItem(item, itemId) {
    console.log('updating item: ', itemId)
    this.http.put(this.baseUrl + '/api/groceries/' + itemId, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }
}
