import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  batch = 'UCA-2';
  factorial = this.fact(10);
  fact(n: number) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
      res *= i;
    }
    return res;
  }
}
