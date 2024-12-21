import { EstadosGlobalesService } from './../../core/services/estados-globales.service';
import { CrearCursoService } from './../data/services/crear-curso.service';
import { Router } from '@angular/router';
import { LoginService } from './../../login/data/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ValidacionFormularioService } from 'src/app/core/services/validacion-formulario.service';
import { Categoria } from 'src/app/core/interface/categoria.interface';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss'],
})
export class CrearCursoComponent implements OnInit {
  public formularioRegistroCurso!: FormGroup;

  categoriasPadre: Categoria[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validacionFormularioService: ValidacionFormularioService,
    private estadosGlobalesService: EstadosGlobalesService,
    private loginService: LoginService,
    private mensajeService: MensajeService,
    private crearCursoService: CrearCursoService
  ) {
    this.cargarFormulario();
    this.consultarCategoriasPadre();
  }

  ngOnInit(): void {
    // this.redireccionamiento();
  }

  private redireccionamiento() {
    if (this.loginService.obtenerUuid()) {
      this.router.navigateByUrl('login');
    }
  }

  private consultarCategoriasPadre() {
    this.estadosGlobalesService.setSpinner(true);
    this.crearCursoService.categoriasPadres().subscribe({
      next: async (resp) => {
        this.estadosGlobalesService.setSpinner(false);
        this.categoriasPadre = resp?.respuesta;
      },
      error: (err) => {
        this.estadosGlobalesService.setSpinner(false);
        this.mensajeService.enviarMensaje({
          tipo: err?.error?.codigo,
          mensaje: err?.error?.mensaje,
        });
      },
    });
  }

  private cargarFormulario() {
    const validacion = [Validators.required, Validators.minLength(3)];
    const validacionEmail = [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(ValidacionFormularioService.REGEXPS.ONLY_EMAIL),
    ];

    this.formularioRegistroCurso = this.fb.group({
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
      repetirContrasena: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  registrarCurso() {
    console.log('Curso registrado');
  }

  public revisarRN(controlador: string): string {
    return this.validacionFormularioService.getObtenerMensajeErrorForm(
      controlador,
      this.formularioRegistroCurso
    );
  }
}
