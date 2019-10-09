import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loadingPhoto = false;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  validateForm: FormGroup;

  registerUser(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.registerService.user.setPhoto(this.avatarUrl);
    this.registerService.user.setFirstName(this.firstName);
    this.registerService.user.setLastName(this.lastName);
    this.registerService.user.setEmail(this.email);
    this.registerService.user.setPassword(this.password);
    this.registerService.registerUser();
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private registerService:RegisterService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  changeProfilePic(event){
    let profilePic = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.avatarUrl = String(reader.result);
    }, false);
    reader.readAsDataURL(profilePic);
  }
}
