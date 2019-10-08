import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RegisterNetworkComponent } from './pages/register-network/register-network.component';
import { NetworkComponent } from './pages/network/network.component';
import { RegisterTaskComponent } from './pages/register-task/register-task.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home/:tab',
    component: HomeComponent
  },
  {
    path: 'task/:id',
    component: TaskComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'register-network',
    component: RegisterNetworkComponent
  },
  {
    path: 'network/:id',
    component: NetworkComponent
  },
  {
    path: 'register-task',
    component: RegisterTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
