import { Directive, HostListener, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})

export class TextareaAutoresizeDirective implements OnInit {
  @Input('minHeight') minHeight: number = 0;

  constructor(private elementRef: ElementRef) { }


  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    this.elementRef.nativeElement.style.height = this.minHeight;
    this.elementRef.nativeElement.style.height = (this.elementRef.nativeElement.scrollHeight >= this.minHeight 
      ? this.elementRef.nativeElement.scrollHeight : this.minHeight) + 'px';
  }
}