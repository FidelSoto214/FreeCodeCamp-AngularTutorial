import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RoomList } from '../rooms/rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],

  // This will inform Angular that our component only depends
  // on its inputs and that any object that is passed to it
  // should be considered immutable
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges {

  // The data-bound properties in question
  @Input() rooms: RoomList[] = [];
  @Input() title: string = "";

  @Output() roomSelected = new EventEmitter<RoomList>();


  constructor() { }

  ngOnInit(): void {
  }

  // This function can only be used on a property with @Input properties.
  // This method is invoked immediately after the default change detector has checked data-bound
  // properties if at least one has changed, and before the view and content children are checked.
  ngOnChanges(changes: SimpleChanges): void {
    // `changes` has info on data changes, like previous data and current data.
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList): void{
    this.roomSelected.emit(room);
  }

}
