import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  logo: any;

  constructor(private sanitizer: DomSanitizer) {
    const logoMini = localStorage.getItem('logoMini');
    this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${logoMini}`
    );
  }
}