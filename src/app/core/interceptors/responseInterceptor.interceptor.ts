import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { CustomToasterService } from "../services/custom-toast";

@Injectable()
export class responseInterceptor implements HttpInterceptor {
  constructor(
    private _toaster: CustomToasterService
  ) {}

  stopHandleErrorsApiUrls = [
    '/passports/scanPassportImage'
  ]
  handledCodes = ["02001016", "02001017", "02001026","02001014"];


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      tap((res: any)=>{
        if(!this.isStopHandleError(request.url)){
          return
        } else {
          let data = res.body
          if(data?.response?.responseCode && data?.response?.responseCode !=="0" && !request.url.includes('checkRegistrationInfo') && !this.isHandledCode(data?.response?.responseCode)){
            this._toaster.handleError(data)
          }
        }
        
      })
    ) as Observable<HttpEvent<any>>;
  }

  isStopHandleError(url: string) {
    let isLoaded = true;
    this.stopHandleErrorsApiUrls.forEach((stopUrl) => {
      isLoaded = !url.includes(stopUrl);
    });
    return isLoaded;
}
  isHandledCode(responseCode: string | null | undefined): boolean {
    if (responseCode == null) {
      return false;
    }
    return this.handledCodes.includes(responseCode);
  }
}