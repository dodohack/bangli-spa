import { Component, HostBinding, Input, OnInit, OnDestroy} from '@angular/core';
import { Carousel, Direction } from './carousel';

@Component({
    selector: 'slide',
    template: `
      <div [class.active]="active" class="item">
        <ng-content></ng-content>
      </div>
    `
})
export class Slide implements OnInit, OnDestroy {
    @Input() index: number;
    @Input() direction: Direction;

    @HostBinding('class.active')
    @Input() active: boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    addClass: boolean = true;

    carousel: Carousel;

    constructor(carousel: Carousel) {
        this.carousel = carousel;
    }

    ngOnInit() {
        this.carousel.addSlide(this);
    }

    ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
}
