import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { from } from 'rxjs';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  rolelist: any;
  editdata: any;

  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private service:AuthService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatepopupComponent>){

  }
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res;
    })
    if(this.data.usercode ! = null && this.data.usercode != ''){
      this.service.Getbycode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.updateform.setValue({
          id:this.editdata.id,
          name:this.editdata.name,
          email:this.editdata.email,
          password:this.editdata.password,
          role:this.editdata.role,
          gender:this.editdata.gender,
          isactive:this.editdata.isactive})
      });
    }
  }

  updateform = this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    email:this.builder.control(''),
    password:this.builder.control(''),
    gender:this.builder.control('male'),
    role:this.builder.control('',Validators.required),
    isactive:this.builder.control(true),
  });

  updateuser(){
    if(this.updateform.valid){
      this.service.Updateuser(this.updateform.value.id,this.updateform.value).subscribe(res => {
        console.log(this.updateform);
        this.toastr.success('Updated successfully.');
        this.dialogRef.close();
      });
    }else{
      this.toastr.warning('Please Select Role.')
    }
  }

}
