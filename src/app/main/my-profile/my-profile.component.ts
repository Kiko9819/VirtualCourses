import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '@app/core/services/account.service';
import { AlertService } from '@app/core/services/alert.service';
import { User } from '@app/core/models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;
  submitted = false;
  user: User;

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, 
    private alertService: AlertService) { 
      this.user = this.accountService.userValue;
    }

  ngOnInit(): void {
    this.buildForm();
    this.accountService.user.subscribe(
      () => {
        this.loading = false;
        this.alertService.success('Successfuly updated your profile!');
      },
      () => {
        this.loading = false;
        this.alertService.success('Oops... som');
      }
    )
  }

   // convenience getter for easy access to form fields
   get f() { return this.formGroup.controls; }

   onSubmit() {
       this.submitted = true;

       // reset alerts on submit
       this.alertService.clear();

       // stop here if form is invalid
       if (this.formGroup.invalid) {
           return;
       }

       this.loading = true;
       this.accountService.update(this.user.id, this.formGroup.value).subscribe();
   }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      firstName: [this.accountService.userValue.firstName, Validators.required],
      lastName: [this.accountService.userValue.lastName, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
