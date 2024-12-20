
import {
    Breakpoints,
    BreakpointObserver,
    BreakpointState,
  } from '@angular/cdk/layout';
  import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
  } from '@angular/core';
  import {
    Observable,
    map,
    shareReplay,
    Subject,
    takeUntil,
    tap,
    Subscription,
  } from 'rxjs';
  import { DomSanitizer } from '@angular/platform-browser';
  import { Router } from '@angular/router';
  import { LayoutComponent } from '../layout/layout.component';
import { ItemMenu } from 'src/app/core/model/tipo-usuario.model';
import { AppBreadcrumbService } from '../services/app.breadcrumb.service';
import { DashboardService } from '../services/dashboard.service';
import { EstadosGlobalesService } from 'src/app/core/services/estados-globales.service';
import { LOGO_SPINNER } from 'src/app/login/data/consts/logo-spinner.const';
  
  @Component({
    selector: 'app-siderbar',
    templateUrl: './siderbar.component.html',
    styleUrls: ['./siderbar.component.scss'],
  })
  export class SidebarComponent
    implements OnDestroy, AfterViewInit, AfterViewChecked, OnChanges
  {
    @Input() nombrePersonaLogueada!: string;
    @Input() inIsAuthenticated!: boolean;
  
    _inItemsMenu: ItemMenu[] = [];
    @Input() set inItemsMenu(inItemsMenu: ItemMenu[]) {
      if (inItemsMenu) {
        this._inItemsMenu = inItemsMenu;
      }
    }
  
    get inItemsMenu(): ItemMenu[] {
      return this._inItemsMenu;
    }
  
    _inItemsSubMenu: ItemMenu[] = [];
    @Input() set inItemsSubMenu(inItemsMenu: ItemMenu[]) {
      if (inItemsMenu) {
        this._inItemsSubMenu = inItemsMenu;
      }
    }
  
    get inItemsSubMenu(): ItemMenu[] {
      return this._inItemsSubMenu;
    }
  
    showMenu = false;
    activarSubmenu = false;
    activeRoute?: boolean = false;
    @Output() outLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    isHandset$: Observable<boolean> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  
    logo: any;
    public loading = false;
    private unSuscribe$ = new Subject();
  
    rol!: string;
    usuario!: string;
  
    badgeContent!: number;
  
    mensajesSubscription!: Subscription;
    mensaje!: Map<string, any>;
  
    public ambienteCelular = false;
  
    listaAcciones: any[] = [];
  
    constructor(
      private cd: ChangeDetectorRef,
      private sanitizer: DomSanitizer,
      private breakpointObserver: BreakpointObserver,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private estadosGlobalesService: EstadosGlobalesService,
      private router: Router,
      public layoutComponent: LayoutComponent,
      public mainComponent: DashboardService,
      public breadcrumbService: AppBreadcrumbService
    ) {
      // this.consultarAcciones();
      this.mediaQuery();
      const logoInicio = LOGO_SPINNER;
      this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${logoInicio}`
      );
  
      const usuario = String(localStorage.getItem('promotor'));
      this.usuario = usuario;
  
      this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
        this.items = response;
      });
    }
  
    subscription?: Subscription;
    items?: any[];
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['inItemsMenu'] && changes['inItemsSubMenu']) {
        this.inItemsSubMenu.map((item: any) => {
          this.inItemsMenu.forEach((menu: ItemMenu) => {
            if (item.parent === menu.nombre) {
              if (!menu.subMenus) {
                menu.subMenus = [];
              }
              menu.subMenus.push(item);
            }
          });
        });
      }
    }
  
    ngAfterViewChecked(): void {
      this.changeDetectorRef.detectChanges();
    }
  
    ngAfterViewInit(): void {
      this.observarSpinner();
      this.cd.detectChanges();
    }
    ngOnDestroy(): void {
      this.unSuscribe$.next(true);
      this.unSuscribe$.complete();
  
      if (this.mensajesSubscription) {
        this.mensajesSubscription.unsubscribe();
      }
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  
    public mediaQuery() {
      this.breakpointObserver
        .observe(Breakpoints.Small)
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
            this.ambienteCelular = true;
          }
        });
  
      this.breakpointObserver
        .observe(Breakpoints.Web)
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            //AQUI SERA TRUE SOLO SI ES RESOLUCION PARA WEB
            this.ambienteCelular = false;
          }
        });
    }
  
    observarSpinner() {
      this.estadosGlobalesService.customSpinner
        .pipe(
          takeUntil(this.unSuscribe$),
          tap((res) => (this.loading = res))
        )
        .subscribe();
    }
  
    public onLogout(): void {
      this.outLogout.emit(true);
    }
  
    toggleMenu(item: any) {
      if (
        item.estadoModulo === 'activo' &&
        item.nombre === 'Gestión administrativa'
      ) {
        this.activarSubmenu = !this.activarSubmenu;
      }
    }
  
    activarClaseMenuitem(item: any, menuitem: any) {
      if (item.uri === this.router.url) {
        this.activeRoute = true;
      }
    }
  
    buscarSubMenu(item: any) {
      if (item.nombre != 'Gestión administrativa') {
        this.router.navigate([item.uri]);
      }
    }
  
  }
  