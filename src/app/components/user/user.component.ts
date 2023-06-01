import { Component,OnInit,Input } from '@angular/core';
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

 password : string = ''
  confirmpassword: string ='';

  constructor(public service : UserService, private router: Router){
    this.user = this.service.getuserByIndex(0)

    


  }

  ngOnInit(): void {
    
  }
 onSubmit(): void{

    if(this.password == this.confirmpassword && this.password!="" && this.confirmpassword!="" &&this.user.first_name!="" && this.user.last_name!="" && this.user.email!="" && this.user.nickname!="")
    {
      this.user.password=this.password
      this.service.modifyuser(this.user);
      this.router.navigate(['/profil']);
    }
    else{
    if (this.user.first_name!="" && this.user.last_name!="" && this.user.email!="" && this.user.nickname!="")
      {
        this.service.modifyuser(this.user);
        this.router.navigate(['/profil']);

    }
    else{

    }
  }

 }
  
} 
