import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AlertMessage, GMessagesService} from "elm-common-standards";
import {MessageService} from 'primeng/api';
import {logger1} from "../../app.config";


@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public postObservable<T>(url: string, requestBody: any, headers?: any, responseType?: 'json'): Observable<T> {
    return this.http.post<any>(url, requestBody, {headers, responseType}).pipe(
      map((data: any) => {
        if (data.response.responseCode != "0") {
          this.showErrorMessageList(data.response);
          logger1.error(this.prepareErrorInfo(data.response, url))
        }
        //TODO return specification
        return data;
      }),
    );
  }

  public getObservable<T>(url: string, headers?: any): Observable<T> {
    const headersInfo = headers ? {headers} : {}
    return this.http.get<any>(url, headersInfo).pipe(
      map((data: any) => {
        if (data.response.responseCode != "0") {
          logger1.error(this.prepareErrorInfo(data.response, url))
          this.showErrorMessageList(data.response)
        }
        return data;
      })
    );
  }

  private prepareErrorInfo(response: any, url: string): {} {
    try {
      return {
        'FailurePoint': "HttpCommonService",
        'ResponseCode': response.responseCode,
        'Service-URL': url,
        'Request-UUID': response.requestUUID,
        'Description': response.responseDesc
      }
    } catch (e) {
      return {
        'FailurePoint': "HttpCommonService",
        'Service-URL': url,
      }
    }

  }


  private showErrorMessageList(response: any) {
    this.showErrorMessageListTemporary(response);
  }

  private showErrorMessageListTemporary(response: any) {

    this.messageService.clear();

    let alertMessages: AlertMessage[] = new Array<AlertMessage>;
    let messages = this.getStringTokens(response.responseDesc);
    for (let message of messages) {
      alertMessages.push({severity: 'error', summary: '', detail: message});
    }

    this.messageService.addAll(alertMessages);
  }

  // private showErrorMessageList(response: any) {
  //   let messages = this.getStringTokens(response.responseDesc);
  //
  //   for (let message of messages) {
  //     this.gMessageService.showError("", message, false);
  //   }
  // }

  private getStringTokens(errorString: string): string[] {
    return errorString.split('\\$\\$');
  }

  private yearsUrl = 'assets/layout/data/years.json';
  private hijriYearsUrl = 'assets/layout/data/hijri-years.json';

  getYears(isHijri: boolean): Observable<any> {

    return this.http.get<any>(isHijri ? this.hijriYearsUrl : this.yearsUrl);
  }
}
