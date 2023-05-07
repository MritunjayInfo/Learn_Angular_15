import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private service:AuthService, private router: Router){

  }

  registerform = this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(true),
  });

  proceedregisteration(){
    if(this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(res =>{
        console.log(this.registerform);
        this.toastr.success('Please contact admin for enable access','Registered Successfully');
        this.router.navigate(['login']);
      });

    }else{
      this.toastr.warning('Please enter valid data')
    }
  }

}
