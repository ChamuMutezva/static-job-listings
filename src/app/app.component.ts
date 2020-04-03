import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'static-job-listings';
  showImage: boolean = false;

  toggleImage() : void {
    this.showImage = !this.showImage;
  }
}
