import { Injectable } from '@angular/core';
import { IJobListing } from './jobListing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
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

  getRoleByLang(langName, callback: (data) => void) {
    return this.getRoles().subscribe(result => {
     //console.log(result)
      const miniResults = result.map(role => {
        const {languages, company } = role
       console.log(company)
      })
    })
  }


 /* getRoleByLang(langName, callback: (data) => void) {
    return this.getRoles().subscribe(result => {
      console.log('---------');
      console.log(result)
      let returnObj = {};
      const matchedResult = result.map(role => {
        if (role.languages) {
          role.languages.map(lang => {            
            console.log('returning language details ', lang);
            returnObj = lang;             

          })       
        }        
      });
      console.log('---------', returnObj);
     callback(returnObj);  // execute the callback function to act on the matched result;
    
  },
      error => {
        console.log(error);
      }
    );
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T)
    }
  }
}
