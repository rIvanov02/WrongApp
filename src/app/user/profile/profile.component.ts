import { Component, OnDestroy, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { User } from 'src/app/types/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent implements OnInit , OnDestroy{

  private subscription: Subscription|undefined
  userData:User|undefined
 
  constructor(private fb: FormBuilder, private fire: FireServiceService) {
    
  }

  ngOnInit(): void {
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
  this.subscription = this.fire.getUserData().subscribe((data) => { 
    this.userData = data.find(element => element['userId'] == loggedUserId)
  })
}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
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
    //const id = this.data.userId
    //this.fire.updateUserData(id! , username!, email!, phone!)
  }
}
