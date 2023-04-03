//  *********************************** template-driven forms******************* 
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'home-work';
//   submit(form: any) {
//     if (form.valid) {
//       console.log(form.value);
//     } else {
//       form.control.markAllAsTouched();
//     }
//   }
// }


// ****************************** Reactive forms  **********************





import { Component, OnInit } from '@angular/core';
import { FormGroup, NgModel, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
        [this.checkEmail.bind(this)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]),
    });
  }

  checkEmail(control: any): Promise<any> {
    const email = control.value;

    return new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        return this.http
          .get<any[]>('https://jsonplaceholder.typicode.com/users')
          .toPromise();
      })

      .then((users) => {
        const emails = users ? users.map((user) => user.email) : [];
        if (emails.includes(email)) {
          control.markAllAsTouched();
          return { uniqEmail: true };
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error(error);
        return { serverError: true };
      });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}








