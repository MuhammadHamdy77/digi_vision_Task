import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import {Observable, finalize} from 'rxjs';
import {HelperService} from '../services/helper.service';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    requestCounter = 0;
    constructor(private _helperService: HelperService) {
    }
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        this.requestCounter++;
        if (this.requestCounter > 0) {
            setTimeout(() => {
                switch (request.method) {
                    case 'DELETE':
                        this._helperService.loader.next({show: true, type: 'wave'});
                        break;
                    case 'PUT':
                        this._helperService.loader.next({show: true, type: 'wave'});
                        break;

                    case 'POST':
                        if (request.url.indexOf("UploadFiles") > -1) {
                            this._helperService.innerLoader.next({
                                show: true,
                                type: "wave",
                            });
                            break;
                        } else {
                            this._helperService.loader.next({show: true, type: "wave"});
                            break;
                        }
                    case 'GET':
                        if (!this.isLoadedApiUrl(request.url)) {
                            break;
                        } else {
                            this._helperService.loader.next({show: true, type: 'wave'});
                            break;
                        }
                }
            }, 100);
        }
        return next.handle(request).pipe(
            finalize(() => {
                this.requestCounter--;
                if (this.requestCounter === 0) {
                    setTimeout(() => {
                        this._helperService.loader.next(null);
                    }, 100);
                }
            })
        );
    }
    isLoadedApiUrl(url: string) {
        let isLoaded = true;
        return isLoaded;
    }
}
