import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { AfterViewInit, Component, DoCheck, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {
  /**
   * Good to know:
   * Variables in classes have their values assigned before constructor() is called.
   * If you were to assign roomList with the array of rooms in its declaration, constructor would
   * be able to iterate over those values, but since the assignment is in ngOnInit(), which is called
   * after constructor, then constructor views an empty array since that's the initial value of roomList.
   */
  hotelName = 'Best Western';
  numberOfRooms = 9;
  hideRooms = false;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  roomList: RoomList[] = [];
  selectedRoom!: RoomList;
  myVar : String | null = null;
  title = 'Room List';

  // If multiple instances of the same type are in the template for the parent component,
  // only the first instnace will be used and set to headerComponent
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  // If we want to reference multiple children components of the same type,
  // we need to use the @ViewChildren decorator instead.
  // This is used when you want to use a highly reusable component.
  @ViewChildren(HeaderComponent) headerChildrenComponent !: QueryList<HeaderComponent>;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.headerComponent);
    this.roomList  = [
      {
        roomNumber: 1,
        roomType: 'Deluxe',
        amenities: 'AC, Wifi, TV, Bahtrooms, Kitchen',
        price: 1000,
        photos: 'https://www.bestwestern.com/content/dam/best-western/brand/logo-lockup/rv0918/best-western.jpg',
        checkInTime: new Date('11-Nov-2022'),
        checkOutTime: new Date('12-Nov-2022'),
        rating: 4.5
      },
      {
        roomNumber: 2,
        roomType: 'Medium',
        amenities: 'AC, TV, Bahtrooms, Kitchen',
        price: 500,
        photos: 'https://www.bestwestern.com/content/dam/best-western/brand/logo-lockup/rv0918/best-western.jpg',
        checkInTime: new Date('10-Nov-2022'),
        checkOutTime: new Date('15-Nov-2022'),
        rating: 3.4
      },
      {
        roomNumber: 3,
        roomType: 'Cheap',
        amenities: 'AC, Bahtrooms',
        price: 200,
        photos: 'https://www.bestwestern.com/content/dam/best-western/brand/logo-lockup/rv0918/best-western.jpg',
        checkInTime: new Date('12-Nov-2022'),
        checkOutTime: new Date('14-Nov-2022'),
        rating: 2.5
      }];
  }

  ngDoCheck(): void {
    console.log('do check called');
  }

  ngAfterViewInit(): void {
    console.log(this.headerComponent);

    // This triggers an `ExpressionChagedAfterItHasBeenChecked` error.
    // Fine in development apparently , but not in production .
    // Why? In development mode, change detection is run twice.
    // If you get that error in production, then you have an issue.
    this.headerComponent.title = 'My Title (Rooms View)';
  }

  toggle(): void{
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList): void{
    console.log(room);
    this.selectedRoom = room;
  }

  addRoom(): void {
    const room:RoomList = {
      roomNumber: 4,
      roomType: 'Deluxe Room',
      amenities: 'AC, WIFI, TV, Bathroom, Kitchen',
      price: 500,
      photos: '',
      checkInTime: new Date('11-nov-2022'),
      checkOutTime: new Date('12-nov-2022'),
      rating: 4.5
    };

    // The change detection strategy in the child RoomsList component is onpush.
    // It won't work when you modify the roomList array. Instead you need to reassign it.
    // this.roomList.push(room); -- You won't see any changes
    // You will se changes:
    this.roomList = [...this.roomList, room];
    // ... is the spread operator. It helps us make reassignments with added data.
    // So we can say 'reassign roomList with the data it already had, plus the new room'.
    // Since we are reassigning data and not modifying, the new data will be reflected in the
    // child component.
  }

}
