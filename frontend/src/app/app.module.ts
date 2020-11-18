
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'
import { AngularCropperjsModule } from 'angular-cropperjs';
import { MatSliderModule } from '@angular/material/slider'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PreviewComponent } from './preview/preview.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PoolComponent } from './pool/pool.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PreviewService } from './service/previewservice/preview.service'
import { ImageEditingDirective } from '../app/service/imageservice/image-editing.directive';
import { ReEditComponent } from './re-edit/re-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpLoginComponent } from './otp/login-otp-component';
import { OcrComponent } from './ocr/ocr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';

//  Route configuration to configure to different routes
const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent, pathMatch: 'full',
    children: [
      {

        path: 'otp', component: OtpLoginComponent

      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'pool', component: PoolComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '', component: LoginComponent},
  { path: 'reEdit', component: ReEditComponent},
  { path: 'reset', component: ResetPasswordComponent},

  { path: 'opt', component: OtpLoginComponent}

];


//  Declaring different NgModules
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PreviewComponent,
    EditComponent,
    ConfirmComponent,
    LoginComponent,
    RegisterComponent,
    PoolComponent,
    ImageEditingDirective,
    ReEditComponent,
    ResetPasswordComponent,

    OtpLoginComponent,

    OcrComponent

  ],
  imports: [
    BrowserModule,
    AngularCropperjsModule,
    MatSliderModule,
    MatDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()

  ],
  providers: [PreviewService],
  exports: [PoolComponent],
  bootstrap: [AppComponent, PoolComponent]
})

// Exporting the class
export class AppModule { }
