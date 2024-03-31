import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[pkmmappBorderCard]',
  standalone : true,
})
export class BorderCardDirective {
  
  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    // Appeler d'abord setBorder pour définir la bordure initiale
    this.setBorder(this.initialColor);
    // Ensuite, appeler setHeight pour définir la hauteur
    this.setHeight(this.defaultHeight);
  }

  @Input("pkmmappBorderCard") borderColor: string
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder( this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string) {
    let border = 'solid 4px ' + color; // Ajouter un espace après '4px'
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
