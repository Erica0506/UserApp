import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(request: HttpRequest <any>, next: HttpHandler): 
    Observable < HttpEvent < any> > {
      request = request.clone({
        setHeaders:{
          "mykey": "muvalue"
        }
      });
      return next.handle(request);
    }
}
