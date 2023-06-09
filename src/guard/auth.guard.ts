import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // written condition loogedIn
    if (this.service.IsloggedIn()) {
      if(route.url.length > 0){
        let menu = route.url[0].path;
        if(menu == 'user'){
          if(this.service.GetUserrole()=='admin'){
            return true;
          }else{
            this.toastr.warning('You dont have Access');
            this.router.navigate(['home']);
            return false;
          }
        }else{
          return true;
        }
      }else{
        return true;
      }

      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
