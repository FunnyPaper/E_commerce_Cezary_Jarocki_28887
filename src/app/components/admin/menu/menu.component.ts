import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private scroll!: HTMLElement;
    hidden: boolean = true;

    @HostListener('window:scroll')
    scrollChange(): void {
        window.scrollY > 500
            ? (this.scroll.style.display = 'block')
            : (this.scroll.style.display = 'none');
    }

    constructor() {}

    ngOnInit(): void {
        this.scroll = document.getElementById('scroll_top')!;
    }

    scrollTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    hide(): void {
        this.hidden = !this.hidden;
    }
}
