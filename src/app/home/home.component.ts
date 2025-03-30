import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NzButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

