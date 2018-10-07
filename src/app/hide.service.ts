
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
 
@Injectable()
export class HideService {
 
    private show: BehaviorSubject<boolean>;

    constructor() {
        this.show = new BehaviorSubject(true);
    }
 
    setShow(val: boolean) { console.log("OIIO",val) ; this.show.next(val) }

    getShow() { console.log("OIIO") ;return this.show.asObservable() ; }
  
}