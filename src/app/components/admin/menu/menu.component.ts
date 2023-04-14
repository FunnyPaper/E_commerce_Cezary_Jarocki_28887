import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @HostListener('window:scroll')
  scrollChange(): void {
    const topEL = document.getElementById('scroll_top');
    window.scrollY > 500
      // tslint:disable-next-line: no-non-null-assertion
      ? (topEL!.style.display = 'block')
      // tslint:disable-next-line: no-non-null-assertion
      : (topEL!.style.display = 'none');
  }

  constructor() { }

  ngOnInit(): void {
    this.hide();
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
  hide(): void {
    const btn = document.getElementById('links');

    if (btn?.className === 'm-fadeIn') {
      btn.className = 'm-fadeOut';
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('show')!.getElementsByTagName('fa-icon')[0].className = 'm-fadeIn';
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('show')!.getElementsByTagName('fa-icon')[1].className = 'm-fadeOut';
    } else {
      // tslint:disable-next-line: no-non-null-assertion
      btn!.className = 'm-fadeIn';
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('show')!.getElementsByTagName('fa-icon')[0].className = 'm-fadeOut';
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('show')!.getElementsByTagName('fa-icon')[1].className = 'm-fadeIn';
    }
  }
}
