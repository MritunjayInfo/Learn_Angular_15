import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  Api_Url = 'http://localhost:3000/users';

  GetAll(){
    return this.http.get(this.Api_Url);
  }

  Getbycode(code:any){
    return this.http.get(this.Api_Url+'/'+code);
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.Api_Url,inputdata);
  }

  Updateuser(code:any,inputdata:any){
    return this.http.put(this.Api_Url+'/'+code, inputdata);
  }

  GetAllRole(){
    return this.http.get('http://localhost:3000/role');
  }

  IsloggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  GetUserrole(){
    return sessionStorage.getItem('userrole')!=null? sessionStorage.getItem('userrole')?.toString():'';
  }

  deleteUser(code: any) {
    return this.http.delete(this.Api_Url + '/' + code);
  }
  
}
