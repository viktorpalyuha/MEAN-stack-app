import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { WorkersComponent } from 'src/app/pages/workers/workers.component';
import { WorkerEditComponent } from './pages/workers/worker-edit/worker-edit.component';
import { WorkersListComponent } from 'src/app/pages/workers/workers-list/workers-list.component';
import { WorkerCreateComponent } from './pages/workers/worker-create/worker-create.component';
import { IsLoggedIn } from './isLogged.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'workers',
    component: WorkersComponent,
    canActivate: [IsLoggedIn],
    children: [
      { path: 'workers-list', component: WorkersListComponent },
      { path: 'create-worker', component: WorkerCreateComponent },
      { path: 'edit-worker/:id', component: WorkerEditComponent },
    ],
  },
  { path: '**', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [IsLoggedIn],
})
export class AppRoutingModule {}
