import { Component } from '@angular/core';
import { HeaderComponent } from './components/UI/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-angular';

  open( event: any ) {
    console.log(event);
    
  }
}
