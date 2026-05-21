import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

   console.log("INTERCEPTOR EXECUTOU");
  console.log("TOKEN:", token);
  console.log("URL:", req.url);

  if(token){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)

    });
    return next(authReq);
  }

  return next(req);

};
