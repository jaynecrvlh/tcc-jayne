import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  photo:string;
  firstName:string;
  lastName:string;

  validateForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.getUser();

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }

  onBack() {
    this.router.navigate(['/home', 'profile']);
  }

  getUser = () => {
    const userId = this.activatedRoute.snapshot.params.id;
    const user = this.userService.getUserInfo(userId);
    let snapshot = null;
    user.subscribe(
      data => {
        snapshot = data;
        this.photo = snapshot.photo;
        this.firstName = snapshot.firstName;
        this.lastName = snapshot.lastName;
      },
      error => error
    )
  }

  changeProfilePic(event){
    let profilePic = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.photo = String(reader.result);
    }, false);
    reader.readAsDataURL(profilePic);
  }

  updateProfile():void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(this.validateForm.valid) {
      this.userService.updateUser(this.photo, this.firstName, this.lastName);
    }
  }
}
