import { Component  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { User } from 'src/app/types/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent {

  data: User = {}
  
 
  constructor(private fb: FormBuilder, private fire: FireServiceService) {
    this.fire.getUserData().then((user) => { 
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
    //TODO: this
    debugger
    if (this.form.invalid) {
      return;
    }
    const { username, email, phone } = this.form.value;
    const id = this.data.userId
    this.fire.updateUserData(id! , username!, email!, phone!)
  }
}
