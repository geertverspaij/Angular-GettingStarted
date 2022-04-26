Termonologie

Angular build-in directives:
structural directives: *ngIf en *ngFor="let product of products" 

Interpolation : img="{{value}}"
property binding: [img]='value'
event binding: (click)="toggleImage"
two way binding: <input [(ngModel)]="listFilter" />

Interface as a type
export interface IProduct{}
products: IProduct[] = [];

Interface as a feature set
export interface DoTiming {
  count: number;
  start(index:number):void}
  }
export class myTimingComponent implements DoTiming

