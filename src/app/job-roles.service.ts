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
getMovie(movieID, callback: (data) => void) { 
        return this.getMovies().subscribe(result => {            
          // check the api.json for the movieID           
          console.log('---------');
          let returnObj = {};
          const matchedResult = result.map(movie=>{
            if(movie.objectId == movieID){
                console.log('returning movie details ', movie);
                returnObj = movie;
            }
          });          
          console.log('---------');
          callback(returnObj);  // execute the callback function to act on the matched result;
        },
          error => {
            console.log(error);
          }
        );
      }
  */
  getRoleByLang(langName, callback: (data) => void) {
    return this.getRoles().subscribe(result => {
      let returnObj = {};
      // console.log(result)
      const miniResults = result.map(listings => {
        const { languages } = listings
        if (languages == undefined) {
          return
        } else {
         // console.log(listings.languages.length)
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
