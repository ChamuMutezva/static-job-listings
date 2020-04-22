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
 /*
  getRoleByLang(langName, callback: (data) => void) {
    return this.getRoles().subscribe(result => {
      let returnObj = {};      
      const miniResults = result.map(listings => {
        const { languages } = listings
        if (languages == undefined) {
          return
        } else {         
          const langResults = languages.filter(lang => {
            if (lang == "JavaScript") {
              console.log(languages)
              returnObj = listings
            }
          })
        }         
      })
      callback(returnObj)
    })   
  }*/


   getRoleByRole(roleName, callback: (data) => void) {
     return this.getRoles().subscribe(result => {
       console.log('---------');
       console.log(result)
       let returnObj = {};
       const matchedResult = result.map(posRole=> {
         const {role} = posRole;
         console.log(role);
           if(role == roleName) {
              console.log("Returning country...", posRole);
              returnObj = posRole;
            }
                
       });
       console.log('---------', returnObj);
      callback(returnObj);  // execute the callback function to act on the matched result;
     
   },
       error => {
         console.log(error);
       }
     );
   } 


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T)
    }
  }
}
