import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = ["img_1.jpg", "img_2.jpg", "img_3.jpg","img_1.jpg", "img_2.jpg", "img_3.jpg"];

  // sliderOptions = { items: 1, dots: true, loop: true, autoplay: true };

  slideConfig = {"slidesToShow": 1,dots: true, infinite: true, speed: 300, centerMode: true};
  
  constructor() { }

  ngOnInit() {
  }

  addSlide() {
    this.items.push("http://placehold.it/350x150/777777")
  }
  
  removeSlide() {
    this.items.length = this.items.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
