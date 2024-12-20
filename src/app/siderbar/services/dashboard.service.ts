import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './app.menu.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService  {
  onDestroy$: Observable<boolean> = new Observable();


  menuClick?: boolean;
  menuButtonClick?: boolean;
  topbarMenuButtonClick?: boolean;
  topbarMenuClick?: boolean;
  topbarMenuActive?: boolean;
  activeTopbarItem?: Element | null;
  sidebarActive?: boolean;
  mobileMenuActive?: boolean;
  menuHoverActive?: boolean;
  resetMenu?: boolean;
  configActive?: boolean;
  configClick?: boolean;

  layoutMode = 'overlay';
  layoutColor = 'light';
  darkMenu = false;
  isRTL = false;
  inputStyle = 'filled';
  wripple = true;

  constructor(private menuService: MenuService) {}

  onWrapperClick() {
      if (!this.menuClick && !this.menuButtonClick) {
          this.mobileMenuActive = false;
      }

      if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
          this.topbarMenuActive = false;
          this.activeTopbarItem = null;
      }

      if (!this.menuClick) {
          if (this.isHorizontal()) {
              this.menuService.reset();
          }

          this.menuHoverActive = false;
      }

      if (this.configActive && !this.configClick) {
          this.configActive = false;
      }

      this.configClick = false;
      this.menuClick = false;
      this.menuButtonClick = false;
      this.topbarMenuClick = false;
      this.topbarMenuButtonClick = false;
  }

  onMenuButtonClick(event: Event) {
      this.menuButtonClick = true;

      if (this.isMobile()) {
          this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event: Event) {
      this.topbarMenuButtonClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;
      event.preventDefault();
  }

  onTopbarRootItemClick(event: Event, item: Element) {
      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null; } else {
          this.activeTopbarItem = item; }

      event.preventDefault();
  }

  onTopbarMenuClick(event: Event) {
      this.topbarMenuClick = true;
  }

  onSidebarClick(event: Event) {
      this.menuClick = true;
      this.resetMenu = false;
  }

  onConfigClick(event: any) {
      this.configClick = true;
  }



  onToggleMenuClick(event: Event) {
      this.layoutMode = this.layoutMode !== 'static' ? 'static' : 'overlay';
      event.preventDefault();
  }

  isMobile() {
      return window.innerWidth <= 1024;
  }

  isTablet() {
      const width = window.innerWidth;
      return width <= 1024 && width > 640;
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  isHorizontal() {
      return this.layoutMode === 'horizontal';
  }

  isOverlay() {
      return this.layoutMode === 'overlay';
  }

  onMenuClick() {
    this.menuClick = true;
    }

    cerrarMenu(){
        this.mobileMenuActive =false
    }

}
