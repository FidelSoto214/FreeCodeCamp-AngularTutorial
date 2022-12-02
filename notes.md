# FreeCodeCamp Angular Tutorial - Notes
Things written here will be written in the context of this app. However the purpose
is still to provide a general understanding.


## General Archirecture
### **How the app starts up**
In the context of an Angular app:
1. First the index.html file is loaded up. It will render with empty `<app-root></app-root>`. *Keep in mind that index.html is just a plain .html file, not an angular template file. That's why you don't get an error for putting in an `<app-root></app-root>` tag*
2. Then the accompanying main.ts file is loaded up.
3. From there, the root module (usually the AppModule) is loaded.<br/>Example:
    ```TypeScript
    // This right here is the entry point for the application.
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
    ```
4. The root module then takes care of starting up the app component
    * The app component has a couple of arrays inside an `NgModule` decorator. Their purposes are as follows:
        * *Any component, directive, or pipe that will be sued will be put into the **declarations** array (this is where AppComponent will be)*
        * *Any angular module which will be used by this module (in this case 'this module' is AppModule) will be put into the **imports** array*
        * *Components or sets of compoonents that will be loaded first will be put into the **bootsrap** array*
    * Now AppModule knows to bootstrap AppComponent, which, to reiterate, is our root component. The `<app-root></app-root>` in the index.html file is replaced with the AppComponent.
    * *I think this is a recursive process. So if a component is using another component, then that'll be bootstrapped. I think..*



    
***[Need to fill in notes on Bindings, Directives, and Pipes. Ton on of notes already in code (mainly in rooms.component.html) but it'd be good
to clean it up and bring it over here]***


## Lifecycle Hooks
* Component instances have lifecycle hooks which can help you hook into different events on Components.
* Lifecycle of a component ends when it is destroyed
* Some lifecycle hooks: 
  * ngOnChanges -- Can only be applied on a property with `@Input` properties.
    * Detects changes on your `@Input` values.
    * Can cause performance hit. **How?**
    * Avoid using with `ngDoCheck`
  * ngOnlnit -- Usually on components by default.
      * **Note that the `constructor` for the component is invoked *before* ngOnInit is.**
      * Difference between the two? Generally you want to use ngOnInit for logic, where the constructor is used for dependency injection. So **if you've got code in the code block for `constructor`, you're doing it wrong.**
  * ngDoCheck
    * Theoretically will hardly have to be used.
    * Called immediately after `ngOnChanges()` on every change detection run, and immediately after `ngOnInit()` on the first run.
    * Detect and act upon changes that Angular can't or won't detect on its own. 
  * ngAfterContentlnit
  * ngAfterContentChecked
  * ngAfterViewlnit
    * The template view and its children (referenced with a `@ViewChild`) are fully loaded and ready to go.
  * ngAfterViewChecked
  * ngOnDestroy
  * https://angular.io/guide/lifecycle-hooks <-Check this list for more info and the order in which each hook is called.

> ***Good to know***
> Variables in classes have their values assigned before `constructor()` is called.
For example, if you assigned a class member variable during its declaration, `constructor()` would be able
to reference that variable's value. But if the assignment is in `ngOnInit()` instead, which is called
*after* constructor, then constructor views an `undeclared` variable.

## Component Communication
* The scenario where two or more components need to interact is known as component communication.
* There are multiple ways to achieve the component communication.
  * Using `@Input` and `@OutPut` decorators
  * Using `@ViewChild` and `@ContentChild` decorators
  * Using `Services`

### Smart and Dumb Components
* Smart components take care of the data manipulation/getting/etc. while dumb components take care of just displaying   the data. This relationship is present between `RoomsComponent` and `RoomsListComponent`, which has the `@Input` decorator for multiple variables. For example `roomList` gets passed from `RoomsComponent` to `RoomListComponent`. It also has the `@Output` decorator for `roomSelected`, which is an event emitter that will ask `RoomsComponent` to take action on the event. What info is passed and how an event is handled is taken care of by the parent in the child component's tag attributes.<br/>Example:

    ```HTML
    <div *ngIf="rooms.totalRooms > 0">
      <!--rooms is @input in RoomsListComponent
          roomSelected is @output in RoomsListComponent.
          rooms is a data-bound property
      -->
      <app-rooms-list [rooms]="roomList" (roomSelected)="selectRoom($event)"></app-rooms-list>
    </div>
    ```

### Change Detection
* The default change detection strategy is to go through each component in the component tree and see if there's anything changed, regardless of where in the tree the change happened. *this can be changed*
* You can change this change detection strategy in the `@Component()` decorator of a component `.ts` file with the `changeDetection` property.
  * The default strategy on components is `Default`, where any event will cause the change detection to scour the whole tree. 
  * The other one is `OnPush`, which helps performance by making Angular check a component only when absolutely necessary (like when `@Input` data is reassigned--more on that in the next bullet) rather for any given event
    * Note that to use `OnPush`, the component must not change any data internally. So it's perfect for dumb components (since it uses `@Input` and `@Output`). The data must not be mutable either. You can *reassign* data, but not *modify*. Concept of immutability.

### `@ViewChild` Decorator
* By default `static` is false
  * component will not be initialized in parent until `ngAfterViewInit()` is called. 
  * Use when there's async code in view child.
* When `static` is true: 
  * Component will be initialized and be available in the `OnInit()` function
  * Highly unencouraged when there's async code in view child instance.
* More info: https://blog.angular-university.io/angular-viewchild/

### `@ViewChildren` Decorator
* Similar to `@ViewChild` except it's used to reference more than one
  child. 
* `static` property always false. 




### ng-template
* A tag that doesn't itself render anything but can help render something else. 

### Content Projection
* 
