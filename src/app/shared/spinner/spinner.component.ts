import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LOGO_SPINNER } from 'src/app/login/data/consts/logo-spinner.const';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  logo: any;

  constructor(private sanitizer: DomSanitizer) {
    this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${LOGO_SPINNER}`
    );
  }
}