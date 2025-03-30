import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_Qickj0CF9',
    redirectUrl: 'http://localhost:4200',
    clientId: '2m4qlms3346g2jbg9fl0krv9i7',
    scope: 'email openid phone',
    responseType: 'code'
  }
}
