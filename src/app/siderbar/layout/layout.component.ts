import { LoginService } from './../../login/data/services/login.service';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [ MensajeService ]
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  public itemsMenu$ = signal<any[]>([]);
  public itemsSubMenu$ = signal<any[]>([]);
  public isAuthenticated = true;
  private unSubscribe$ = new Subject();
  public nombrePersonaLogueada = '';
  private paginaInicio = document.querySelector('body');

  private usuario = '';
  // status!: string;

  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;

  promotor!: string;
  token!: string;
  tokenPrecarga! : string;
  arrayDBS: any[] = [];
  usuarioLogueado: any;

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  )
  {}

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }

  ngOnInit(): void {
    this.datosBasicos();

    this.itemsMenu$.set([]);
    this.obtenerDatosUsuario();
  }

  datosBasicos() {
    // Obtener token
    const token = this.LoginService.obtenerUuid();
    if (token) this.token = token;
  }

  
  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
  }

  private obtenerDatosUsuario() {
    this.usuarioLogueado = localStorage.getItem("usuarioSesion");
    if (this.token && this.usuarioLogueado) {
      this.usuarioLogueado = JSON.parse(this.usuarioLogueado);

      this.nombrePersonaLogueada = this.usuarioLogueado?.nombre;
      this.paginaInicio?.style.setProperty(
        '--turing-color-primario',
        localStorage.getItem('primario')
      );
      this.paginaInicio?.style.setProperty(
        '--turing-color-secundario',
        localStorage.getItem('secundario')
      );
    }
  }

  public onLogout(res: any): void {
    if (res == true) {
      Swal.fire({
        text: '¿Está seguro de cerrar sesión?',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.networkStatus) {
            // this.eliminarCaches();
          }
          this.LoginService.logout();
          window.location.reload();
        }
      });
    }
  }

  // async eliminarCaches(): Promise<Promise<boolean>[][]> {
  //   const cacheKeys = await caches?.keys();
  //   return await Promise.all( 
  //     cacheKeys.map(cacheKey => {
  //       const ngswRegex = /^(ngsw).*/;
  //       if (ngswRegex.test(cacheKey)) {
  //         return caches
  //           .open(cacheKey)
  //           .then(cache => cache.keys().then(requests => requests.map(req => cache.delete(req))));
  //       }
  //     })
  //   ) as any;
  // }
}
