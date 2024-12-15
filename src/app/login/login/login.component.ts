import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ValidacionFormularioService } from 'src/app/core/services/validacion-formulario.service';
import { LoginService } from '../data/services/login.service';
import { LOGO } from '../data/consts/logo.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formularioLogin!: FormGroup;

  tipoInput = 'password';

  loading = false;

  logo: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private mensajeService: MensajeService,
    private activatedRoute: ActivatedRoute,
    private validacionFormularioService: ValidacionFormularioService,
  ) {
    this.cargarFormulario();
  }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   const parametro = params.get('main')?.toLowerCase();
    //   this.redireccionamiento(parametro as string);
    // });
    this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${LOGO}`
    );
  }

  private redireccionamiento(parametro: string) {
    if (this.loginService.estaLogeado()) {
      this.router.navigateByUrl('app/home');
    } else {
      this.router.navigateByUrl('404');
    }
  }

  private cargarFormulario() {
    const validacion = [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(
        ValidacionFormularioService.REGEXPS.ONLY_EMAIL
      ),
    ];
    // const validacionCaptcha = [Validators.required];
    this.formularioLogin = this.fb.group({
      usuario: ['', validacion],
      contrasena: ['', [Validators.required, Validators.minLength(4)]],
      captcha: [null],
      // captcha: [ null, validacionCaptcha],
    });
  }

  get formulario() {
    return this.formularioLogin.controls;
  }

  cambiarTipo() {
    if (this.tipoInput === 'password') {
      this.tipoInput = 'text';
    } else {
      this.tipoInput = 'password';
    }
  }

  limpiarInputs(control: string) {
    this.formularioLogin.controls[control].setValue('');
  }

  guardarLocal() {
    localStorage.setItem(
      'usuario',
      this.formularioLogin.controls['usuario'].value.toUpperCase()
    );
  }

  login() {
    // if (this.formularioLogin.valid) {
    //   // this.loading = true;
    //   // this.loginService
    //   //   .login(
    //   //     this.formularioLogin.controls['usuario'].value.toUpperCase(),
    //   //     this.formularioLogin.controls['contrasena'].value
    //   //   )
    //   //   .subscribe({
    //   //     next: async (resp) => {
    //   //       this.loading = false;
    //   //       this.mensajeService.enviarMensaje({
    //   //         mensaje: resp?.mensaje,
    //   //         tipo: resp?.codigo,
    //   //       });

    //   //       setTimeout(() => {
    //   //         this.permisosAcciones
    //   //           .traerTodosPermisosLogin(
    //   //             resp.respuesta.rol,
    //   //             '123bc58f-1354-4bea-a4d9-ef2cd99450f0'
    //   //           )
    //   //           .pipe(
    //   //             tap((res) => {
    //   //               localStorage.setItem('permisos', JSON.stringify(res));
    //   //             })
    //   //           )
    //   //           .subscribe();
    //   //       }, 100);
    //   //       await this.router.navigateByUrl('app');
    //   //     },
    //   //     error: (err) => {
    //   //       this.loading = false;
    //   //       this.mensajeService.enviarMensaje({
    //   //         mensaje: err?.error?.mensaje,
    //   //         tipo: err?.error?.codigo,
    //   //       });
    //   //     },
    //   //   });
    // }
    this.router.navigateByUrl('app/home');
    console.log("🚀 ~ LoginComponent ~ login ~ this.router.navigateByUrl:", this.router.navigateByUrl)
  }

  public revisarRN(controlador: string): string {
    return this.validacionFormularioService.getObtenerMensajeErrorForm(
      controlador,
      this.formularioLogin
    );
  }
}
