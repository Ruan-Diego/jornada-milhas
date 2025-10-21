import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor (private _userService: UserService,
               private router: Router
  ){}

  user$ = this._userService.retornarUser();

  logout() {
      this._userService.logout();
      this.router.navigate(['/login'])
  }
}
