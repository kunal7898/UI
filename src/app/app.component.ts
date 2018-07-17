import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  getScreen() {
    let width = window.innerWidth;

    if (width < 768) 
        return "xs";
    else
        return "lg";
}
}
