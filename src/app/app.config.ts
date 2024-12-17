import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { DatePipe } from '@angular/common';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { AppErrorHandler } from './core/classes/app-error-handler';
import { MessagesModule } from 'primeng/messages';
import { NGXLogger } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { responseInterceptor } from './core/interceptors/responseInterceptor.interceptor';
export let logger1: NGXLogger;

export const appConfig: ApplicationConfig = {

  
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
      MessagesModule,
      HttpClientModule, // Ensure HttpClientModule is imported
      BrowserAnimationsModule, // Required for ToastrModule
      ToastrModule.forRoot(
       {
        positionClass: 'toast-top-right',
        enableHtml: true,
       }
      ), // ToastrModule added
      // NgxSpinnerModule.forRoot(), // NgxSpinnerModule added
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }),
      NgxWebstorageModule.forRoot({
        prefix: 'pms',
        separator: '-',
        caseSensitive: true,
      }),
      
    ]),
    provideHttpClient(), // Provide HttpClient
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: responseInterceptor, multi: true },

    DatePipe
  ],
  
};
