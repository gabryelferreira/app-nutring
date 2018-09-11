import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
 
@Injectable()
export class SettingsService {
 
    private theme: BehaviorSubject<String>;
    private tabTheme: BehaviorSubject<String>;

    constructor() {
        let theme = "light-theme";
        let tabTheme = "light-theme-tab";
        if (localStorage.getItem("theme"))
            theme = localStorage.getItem("theme");
        if (localStorage.getItem("tabTheme"))
            tabTheme = localStorage.getItem("tabTheme");
        this.theme = new BehaviorSubject(theme);
        this.tabTheme = new BehaviorSubject(tabTheme);
    }
 
    setActiveTheme(val: string) {
        localStorage.setItem("theme", val);
        this.theme.next(val);
    }

    setTabActiveTheme(val: string) {
        localStorage.setItem("tabTheme", val);
        this.tabTheme.next(val);
    }
 
    getActiveTheme() {
        return this.theme.asObservable();
    }
    
    getTabActiveTheme(){
        return this.tabTheme.asObservable();
            
    }
}

export interface shareApp{
    message:string;
    subject:string;
    file:string;
    url:string;
}