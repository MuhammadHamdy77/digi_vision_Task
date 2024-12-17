import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, catchError, map, retry, throwError, Subject} from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  headers:any;
  private subjectName = new Subject<any>();
  constructor(private _http:HttpClient) {
    
   }

  // Handle request
  public handleError(error: HttpErrorResponse) {   
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Get All Data Of Apis
  getAll(apiRoute:string):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}`)
    .pipe(
      
      catchError(this.handleError)
    )
  }
  // Get All Data Of Apis
  getExecutivePlanGetDepartmentPrograms(apiRoute:string,DepartmentId:any,year:any):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}/${DepartmentId}/${year}`)
    .pipe(
      
      catchError(this.handleError)
    )
  }

  // Get Data By Id
  getById(id:number,apiRoute:string):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}/${id}`,)
    .pipe(
      
      catchError(this.handleError)
    )
  }
  getByIdYear(id:number,apiRoute:string,year:any):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}/${id}/${year}`,)
    .pipe(
      
      catchError(this.handleError)
    )
  }

  deleteByIdYear(id:number,apiRoute:string,year:any):Observable<any>{
    return this._http.delete<any>(`${environment.baseUrl}${apiRoute}/${id}/${year}`,)
    .pipe(
      
      catchError(this.handleError)
    )
  }
  
  // Get Data By Id
  getByIdQ(apiRoute:string):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}`,)
    .pipe(
      
      catchError(this.handleError)
    )
  }

  // Add Data To Api
  post(newObject:any,apiRoute:string):Observable<any>{
    return this._http.post<any>(`${environment.baseUrl}${apiRoute}` , newObject,)
    .pipe(
      
      catchError(this.handleError)
    )
  }

  // Update Data By Id
  put(newObject:any,apiRoute:string):Observable<any>{
    return this._http.put<any>(`${environment.baseUrl}${apiRoute}` , newObject,)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Delete Data From Api By Id
  delete(id:number,apiRoute:string):Observable<any>{
    return this._http.delete<any>(`${environment.baseUrl}${apiRoute}/${id}`,)
    .pipe(
      catchError(this.handleError)
    )
  }
  deleteByYear(id:number,year:any,apiRoute:string):Observable<any>{
    return this._http.delete<any>(`${environment.baseUrl}${apiRoute}/${id}/${year}`,)
    .pipe(
      catchError(this.handleError)
    )
  }


  // Delete file From Api By Id
  deleteFileByName(apiRoute:string):Observable<any>{
    return this._http.delete<any>(`${environment.baseUrl}${apiRoute}`,)
    .pipe(
      catchError(this.handleError)
    )
  }

  // DownloadFamilyAttach(familyId:any , id:any):Observable<any> {
  //   return this._http.get(`${environment.baseUrl}FamilyAttachementDetail/Download?FamilyId=${familyId}&id=${id}` , {responseType:'blob'})
  // }

  DownloadFamilyAttach(familyId:any , id:any):Observable<any> {
    return this._http.get(`${environment.baseUrl}FamilyAttachementDetail/Download?FamilyId=${familyId}&id=${id}` , {observe:'response' , responseType:'blob'})
  }

  public findInvalidControls(form:FormGroup) {
    var invalid = [];
    var controls = form.controls;
    for (var name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

Download(apiroute:string):Observable<any> {
  return this._http.get(`${environment.baseUrl}${apiroute}` , {observe:'response' , responseType:'blob'})
}

DownloadWithFilter(data:any,apiroute:string):Observable<any> {
  return this._http.post(`${environment.baseUrl}${apiroute}`,data , {observe:'response' , responseType:'blob'})
}

DownloadWithOutFilter(apiroute:string):Observable<any> {
  return this._http.get(`${environment.baseUrl}${apiroute}` , {observe:'response' , responseType:'blob'})
}

GetFile(apiroute:string):Observable<any> {
  return this._http.get(`${environment.baseUrl}${apiroute}`, {observe:'response' , responseType:'blob'})
}
GetFileWithProgress(apiroute:string):Observable<any> {
  return this._http.get(`${environment.baseUrl}${apiroute}`, {observe:'events' , responseType:'blob' , reportProgress:true})
}
GetFileWithFilter(data:any,apiroute:string):Observable<any> {
  return this._http.post(`${environment.baseUrl}${apiroute}`,data , {observe:'response' , responseType:'blob'})
}

  sendUpdate(message: string) { //the component that wants to update something, calls this fn
    this.subjectName.next({ text: message }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver function will subscribe
  }
}
