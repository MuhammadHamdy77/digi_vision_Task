import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {

  successString: string = '';
  errorString: string = '';
  constructor(private _toasterService: ToastrService) {
    let cuurentLanguage = localStorage.getItem('lang');
    if (cuurentLanguage == 'ar') {
      this.successString = 'تم بنجاح';
      this.errorString = 'خطأ';
    } else if (cuurentLanguage == 'en') {
      this.successString = 'Success';
      this.errorString = 'Error';
    } else {
      this.successString = 'Success';
      this.errorString = 'Error';
    }
  }


  handleSuccess(res: any) {
    this._toasterService.success(this.successString, '');
  }

  handleError(res: any) {
    this._toasterService.error(res?.response?.responseDesc, '');
  }

  handleCustomSuccess(customMessage: string) {
    this._toasterService.success(customMessage, ''); // this.successString
  }

  handleCustomError(customMessage: any) {
    this._toasterService.error(customMessage, ''); // this.errorString
  }
}
