import {ErrorHandler} from "@angular/core";

export class AppErrorHandler implements ErrorHandler{

  constructor() {
  }
  handleError(error: any): void {
    this.logError(error);
  }
  logError(error: any){
    // logger1.error(error);
  }
}

