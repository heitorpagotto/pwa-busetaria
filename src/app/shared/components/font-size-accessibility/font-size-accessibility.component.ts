import {Component} from '@angular/core';

@Component({
  selector: 'app-font-size-accessibility',
  templateUrl: './font-size-accessibility.component.html',
  styleUrls: ['./font-size-accessibility.component.css']
})
export class FontSizeAccessibilityComponent {
  public changeFontSize(operation: Operation): void {
    const rootElement: HTMLElement | null = document.querySelector(':root');
    if (rootElement) {
      const computedStyle: CSSStyleDeclaration = getComputedStyle(rootElement);
      const pixelFontSize = Number(computedStyle.getPropertyValue('--default-font-size').substring(0, 2))
      if (!isNaN(pixelFontSize)) {
        let newFontSize = pixelFontSize;
        if (operation === 'add') {
          newFontSize++;
        } else {
          newFontSize--;
        }
        if (newFontSize > 16 && newFontSize < 25) {
          rootElement.style.setProperty('--default-font-size', newFontSize + 'px');
        }
      }
    }
  }
}

type Operation = 'add' | 'subtract';
