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
    this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${LOGO}`
    );
    this.redireccionamiento();
  }

  private redireccionamiento() {
    if (this.loginService.obtenerUuid()) {
      this.router.navigateByUrl('app/home');
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
    this.formularioLogin = this.fb.group({
      usuario: ['', validacion],
      contrasena: ['', [Validators.required, Validators.minLength(4)]],
      captcha: [null],
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
    if (this.formularioLogin.valid) {
      this.loading = true;
      this.loginService
        .login(
          this.formularioLogin.controls['usuario'].value.toUpperCase(),
          this.formularioLogin.controls['contrasena'].value
        )
        .subscribe({
          next: async (resp) => {
            this.loading = false;
            this.mensajeService.enviarMensaje({
              mensaje: resp?.mensaje,
              tipo: resp?.codigo,
            });
            localStorage.setItem('usuarioSesion', JSON.stringify(resp?.respuesta));
            localStorage.setItem('token', resp?.respuesta.token)

            await this.router.navigateByUrl('app/home');
          },
          error: (err) => {
            this.loading = false;
            this.mensajeService.enviarMensaje({
              mensaje: err?.error?.mensaje,
              tipo: err?.error?.codigo,
            });
          },
        });
    }
  }

  public revisarRN(controlador: string): string {
    return this.validacionFormularioService.getObtenerMensajeErrorForm(
      controlador,
      this.formularioLogin
    );
  }
}
