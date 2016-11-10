import { Component } from '@angular/core';

@Component({
  selector: 'common-header',
  template: `
<div class="row">
    <login-buttons></login-buttons>
    <a href="/#/profile">profile</a>
</div>
`
})
export class HeaderComponent {
  constructor() {
    Accounts.onLogin(() => console.log("User successfuly logged in"));
  }
}
