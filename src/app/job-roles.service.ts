import { Injectable } from '@angular/core';
import { IJobListing } from './jobListing';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobRolesService {
  private rolesUrl = 'assets/data.json'

  constructor(private http: HttpClient) {
    console.log(this.rolesUrl)
  }


  getRoles(): Observable<IJobListing[]> {
    return this.http.get<IJobListing[]>(this.rolesUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T)
    }
  }
}
