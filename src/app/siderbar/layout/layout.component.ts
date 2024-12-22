import { LoginService } from './../../login/data/services/login.service';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { EstadosGlobalesService } from 'src/app/core/services/estados-globales.service';

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

  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;

  promotor!: string;
  token!: string;
  tokenPrecarga! : string;
  arrayDBS: any[] = [];
  usuarioLogueado: any;

  constructor(
    private router: Router,
    private mensajeService: MensajeService,
    private loginService: LoginService,
    private estadosGlobalesService: EstadosGlobalesService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.redireccionamiento();
  }

  private redireccionamiento() {
    if (!this.loginService.obtenerUuid()) {
      this.router.navigateByUrl('login');
    }
  }

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
    const token = this.loginService.obtenerUuid();
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
          this.estadosGlobalesService.setSpinner(true);
          this.loginService.logout()
          .subscribe({
            next: async (resp) => {
              console.log("🚀 ~ LayoutComponent ~ next: ~ resp:", resp)
              this.estadosGlobalesService.setSpinner(false);
              this.mensajeService.enviarMensaje({
                mensaje: resp?.mensaje,
                tipo: resp?.codigo,
              });
              localStorage.removeItem('usuarioSesion');
              localStorage.removeItem('token')
              this.router.navigateByUrl('login');
              // window.location.reload();
            },
            error: (err) => {
              this.estadosGlobalesService.setSpinner(false);
              this.mensajeService.enviarMensaje({
                mensaje: err?.error?.mensaje,
                tipo: err?.error?.codigo,
              });
              localStorage.removeItem('usuarioSesion');
              localStorage.removeItem('token')
              this.router.navigateByUrl('login');
            },
          });
        }
      });
    }
  }
}
