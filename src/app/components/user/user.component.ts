import { Component,OnInit,Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/classes/User';
import { FormGroup,Validators,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user!: User;

  selectedFile: File |null =null;

  



  password : string = ''
  confirmpassword: string ='';
  photo:string="";
  finalpicture :string[]=[];
  constructor(public service : UserService, private router: Router){
    this.user = this.service.getuserByIndex(0)


  }

  

  ngOnInit(): void {
    
  }

  




 onSubmit(): void{

    if(this.password == this.confirmpassword && this.password!="" && this.confirmpassword!="" &&this.user.first_name!="" && this.user.last_name!="" && this.user.email!="" && this.user.nickname!="" && this.user.address.number!=0 && this.user.address.street!="" && this.user.address.city!="" && this.user.address.zip_code!="" &&this.user.picture!="" )
    {
      this.finalpicture=this.user.picture.split("\\",3)
        this.user.picture=this.finalpicture[2];
      this.user.password=this.password
      this.service.modifyuser(this.user);
      this.router.navigate(['/profil']);
    }
    else{
    if (this.user.first_name!="" && this.user.last_name!="" && this.user.email!="" && this.user.nickname!=""&& this.user.address.number!=0 && this.user.address.street!="" && this.user.address.city!="" && this.user.address.zip_code!=""&&this.user.picture!="")
      {
        this.finalpicture=this.user.picture.split("\\",3)
        this.user.picture=this.finalpicture[2];
        this.user.picture="assets/profilpictures/"+this.user.picture
        this.service.modifyuser(this.user);
        this.router.navigate(['/profil']);

    }
    else{window.alert("Vous ne respectez pas les consignes")

    }
  }

 }
  
} 
