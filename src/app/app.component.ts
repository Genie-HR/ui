import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, NzMenuModule, NzButtonModule, CommonModule, NzInputModule, NzIconModule],
  templateUrl: './app.component.html',
  styleUrl: "./app.component.scss"
})

export class AppComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  userData$ = this.oidcSecurityService.userData$;
  fullName = ''
  isAuthenticated = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) this.oidcSecurityService.getPayloadFromAccessToken().subscribe(userData => { this.fullName = userData.name })
    });

  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {

    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    const appConfig: OpenIdConfiguration | OpenIdConfiguration[] | undefined = authConfig.config;

    if (appConfig && !Array.isArray(appConfig)) {
      const logoutUrl = `https://ap-south-1qickj0cf9.auth.ap-south-1.amazoncognito.com/logout?client_id=${appConfig.clientId}&logout_uri=${encodeURIComponent('http://localhost:4200')}`;

      window.location.href = logoutUrl;
    }
    // this.oidcSecurityService.logoffAndRevokeTokens().subscribe(() => {

    // console.log('logged out')
    // this.router.navigate(['/']).then((postNavigation) => { console.log('navigated', postNavigation) })
    // })
  }
}




