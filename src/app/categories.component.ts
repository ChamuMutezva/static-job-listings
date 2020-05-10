import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
    console.log(this.title)
  }

}
