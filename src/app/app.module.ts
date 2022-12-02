/**
 *
 * In this current iteration of angular, in order for the main.ts
 * file to bootstrap the application, we need at least one module.
 * In this case we're using AppModule, which is our root module.
 *
 * This root module holds information about all the components which will be created, and the
 * information of any third party library or angular specific libary which is being used.
 *
 *
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from './header/header.component';

// decorator that lets the compiler know that this is a module
@NgModule({
  /**
   * Any component, directive, or pipe that will be used will be put into the declarations array.
   */
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent
  ],
/**
 * Any angular module which needs to be used will be put into the imports array.
 */
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  /**
   * component or set of components that will be loaded first.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
