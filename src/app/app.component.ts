import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';

/**
 * In addition to a root module (in this case AppModule)
 * we also need a root component that belongs to it (AppComponent)
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'HotelInventoryApp';
  role = 'Admin';

  // You can access html elements with @ViewChild
  // static : true is optional.
  @ViewChild('name', {static: true}) name !: ElementRef;
  ngOnInit() {
    this.name.nativeElement.innerText = "this is a ViewChild whose value was set in app.component.ts ";
  }

  // This declaration and ngAfterViewInit() function is an example of dynamic component loading.
  @ViewChild('user', {read: ViewContainerRef}) viewContainerRef !: ViewContainerRef;
  ngAfterViewInit() {
    const componentRef = this.viewContainerRef.createComponent(RoomsComponent);
    // Since we have a direct reference to an instance of RoomsComponent, we can
    // access the variables directly.

    // For example, the following line of code is valid.
    //componentRef.instance.numberOfRooms = 40;
  }

}
