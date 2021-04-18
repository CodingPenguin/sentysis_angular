import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { FormComponent } from './components/form/form.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    FormComponent,
    CommentsComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HomeService,
  ],
  bootstrap: []
})
export class HomeModule { }
