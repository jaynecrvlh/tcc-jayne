import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ClickOutsideModule } from 'ng-click-outside';
import { TextMaskModule } from 'angular2-text-mask';

import { LoginComponent } from './pages/login/login.component';
import { LogoComponent } from './components/logo/logo.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RegisterNetworkComponent } from './pages/register-network/register-network.component';
import { NetworkComponent } from './pages/network/network.component';
import { RegisterTaskComponent } from './pages/register-task/register-task.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NetworkInvitComponent } from './pages/network-invit/network-invit.component';
import { EditNetworkComponent } from './pages/edit-network/edit-network.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    HomeComponent,
    TaskComponent,
    SignUpComponent,
    RegisterNetworkComponent,
    NetworkComponent,
    RegisterTaskComponent,
    NetworkInvitComponent,
    EditNetworkComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ClickOutsideModule,
    TextMaskModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
