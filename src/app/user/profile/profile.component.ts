import { Component  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent {

  data: User = {}
  
 
  constructor(private fb: FormBuilder, private userService: UserServicesService) {
    this.userService.getUserData().then((user) => { 
      this.data = {
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
        userId: user?.userId
      }
    })
  }


  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required]],
    phone: [''],
  });

  updateUser() { 
    debugger
    if (this.form.invalid) {
      return;
    }
    const { username, email, phone } = this.form.value;
    const id = this.data.userId
    this.userService.updateUserData(id! , username!, email!, phone!)
  }
}
