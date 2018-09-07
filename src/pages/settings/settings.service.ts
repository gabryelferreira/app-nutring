import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
 
@Injectable()
export class SettingsService {
 
    private theme: BehaviorSubject<String>;
 
    constructor() {
        this.theme = new BehaviorSubject(localStorage.getItem("theme"));
    }
 
    setActiveTheme(val: string) {
        localStorage.setItem("theme", val);
        this.theme.next(val);
    }
 
    getActiveTheme() {
        return this.theme.asObservable();
    }
}

export interface shareApp{
    message:string;
    subject:string;
    file:string;
    url:string;
}