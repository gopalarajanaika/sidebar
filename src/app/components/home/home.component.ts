import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = ["img_1.jpg", "img_2.jpg", "img_3.jpg"];
  sliderOptions = { items: 1, dots: true, loop: true, autoplay: true };

  constructor() { }

  ngOnInit() {
  }

}
