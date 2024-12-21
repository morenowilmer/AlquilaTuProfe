import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ValidacionFormularioService } from 'src/app/core/services/validacion-formulario.service';
import { LoginService } from '../../login/data/services/login.service';
import { RegistroService } from '../data/services/registro.service';
import { TipoDocumento } from 'src/app/core/interface/tipo-documento.interface';
import { TipoNotificacion } from 'src/app/core/model/tipo-notificacion';
import { Usuario } from 'src/app/core/interface/persona.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  public formularioRegistro!: FormGroup;

  tiposDocumento: TipoDocumento[] = [];

  tipoInput = 'password';
  loading = false;
  fotoPersona: any = null;
  fotoPersonaBase64: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mensajeService: MensajeService,
    private validacionFormularioService: ValidacionFormularioService,
    private loginService: LoginService,
    private registroService: RegistroService
  ) {
    this.cargarFormulario();
  }

  ngOnInit(): void {
    this.redireccionamiento();  
    this.consultarTiposDocumentos();  
  }

  private redireccionamiento() {
    if (this.loginService.obtenerUuid()) {
      this.router.navigateByUrl('app/home');
    }
  }

  private consultarTiposDocumentos() {
      this.loading = true;
      this.registroService.tiposDocumentos()
        .subscribe({
          next: async (resp) => {
            this.loading = false;
            this.tiposDocumento = resp?.respuesta;
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

  private cargarFormulario() {
    const validacion = [
      Validators.required,
      Validators.minLength(3)
    ];
    const validacionEmail = [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(ValidacionFormularioService.REGEXPS.ONLY_EMAIL),
    ];

    this.formularioRegistro = this.fb.group({
      nombre: ['', validacion],
      apellido: ['', validacion],
      tipoDocumentoUsuario: [null, Validators.required],
      identificacion: ['', validacion],
      correo: ['', validacionEmail],
      celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
      fechaNacimiento: ['', Validators.required],
      departamento: ['', validacion],
      ciudad: ['', validacion],
      direccion: ['', validacion],
      contrasena: ['', [Validators.required, Validators.minLength(4)]],
      repetirContrasena: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  registrar() {
    if (this.formularioRegistro.valid) {
      if (this.formularioRegistro.controls['contrasena'].value !== this.formularioRegistro.controls['repetirContrasena'].value) {
        this.mensajeService.enviarMensaje({
          mensaje: 'Las contraseñas no coinciden',
          tipo: TipoNotificacion.error,
        });
        return;
      }

      const usuario: Usuario = {
        id: null,
        nombre: this.formularioRegistro.controls['nombre'].value,
        apellido: this.formularioRegistro.controls['apellido'].value,
        tipoDocumento: this.formularioRegistro.controls['tipoDocumentoUsuario'].value,
        identificacion: this.formularioRegistro.controls['identificacion'].value,
        correo: this.formularioRegistro.controls['correo'].value,
        celular: this.formularioRegistro.controls['celular'].value,
        fechaNacimiento: this.formularioRegistro.controls['fechaNacimiento'].value,
        departamento: this.formularioRegistro.controls['departamento'].value,
        ciudad: this.formularioRegistro.controls['ciudad'].value,
        direccion: this.formularioRegistro.controls['direccion'].value,
        contrasena: this.formularioRegistro.controls['contrasena'].value,
        fotoBase64: this.fotoPersonaBase64,
      };
      this.loading = true;
      this.registroService.registrar(usuario)
        .subscribe({
          next: async (resp) => {
            this.loading = false;
            this.mensajeService.enviarMensaje({
              mensaje: resp?.mensaje,
              tipo: resp?.codigo,
            });
            if (resp?.codigo === TipoNotificacion.exito) {
              this.router.navigateByUrl('login');
            }
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

  onFileSelected(event: any) {
    this.fotoPersona = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String = e.target.result;
      this.fotoPersonaBase64 = base64String;
    };
    reader.readAsDataURL(this.fotoPersona);
  }

  get formulario() {
    return this.formularioRegistro.controls;
  }

  limpiarInputs(control: string) {
    this.formularioRegistro.controls[control].setValue('');
  }

  public revisarRN(controlador: string): string {
    return this.validacionFormularioService.getObtenerMensajeErrorForm(
      controlador,
      this.formularioRegistro
    );
  }

  cambiarTipo() {
    if (this.tipoInput === 'password') {
      this.tipoInput = 'text';
    } else {
      this.tipoInput = 'password';
    }
  }
}
