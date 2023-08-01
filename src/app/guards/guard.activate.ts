import { Injectable } from "@angular/core";
import { CanActivate , ActivatedRouteSnapshot , RouterStateSnapshot , UrlTree, Router  } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate { 
    constructor(private router:Router) { }
    
    isLogged: boolean | undefined;
    
   
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> { 
        
        if (localStorage.getItem('user')) {
            this.isLogged = true;
            return this.isLogged
        } else { 
            this.isLogged = false;
            return this.router.createUrlTree(['/login'])
        }
        
        }
    
    
}