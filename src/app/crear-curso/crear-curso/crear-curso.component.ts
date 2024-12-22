import { EstadosGlobalesService } from './../../core/services/estados-globales.service';
import { CrearCursoService } from './../data/services/crear-curso.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ValidacionFormularioService } from 'src/app/core/services/validacion-formulario.service';
import { Categoria } from 'src/app/core/interface/categoria.interface';
import { tap } from 'rxjs';
import { TipoNotificacion } from 'src/app/core/model/tipo-notificacion';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss'],
})
export class CrearCursoComponent implements OnInit {
  public formularioRegistroCurso!: FormGroup;

  categoriasPadre: Categoria[] = [];
  subCategoriasPadre: Categoria[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validacionFormularioService: ValidacionFormularioService,
    private estadosGlobalesService: EstadosGlobalesService,
    private mensajeService: MensajeService,
    private crearCursoService: CrearCursoService
  ) {
    this.cargarFormulario();
    this.consultarCategoriasPadre();
  }

  ngOnInit(): void {}

  private consultarCategoriasPadre() {
    this.estadosGlobalesService.setSpinner(true);
    this.crearCursoService.categoriasPadres().subscribe({
      next: async (resp) => {
        this.estadosGlobalesService.setSpinner(false);
        this.categoriasPadre = resp?.respuesta;
      },
      error: (err) => {
        this.estadosGlobalesService.setSpinner(false);
        this.mensajeService.openSnackBar(
          err?.error?.mensaje,
          err?.error?.codigo
        );
      },
    });
  }
  public seleccionaPadre(value: number) {
    this.estadosGlobalesService.setSpinner(true);
    this.subCategoriasPadre = [];
    this.idCategoriaPadre?.setValue(null);
    this.crearCursoService
      .categoriasHijos(value)
      .pipe(
        tap((res) => {
          console.log(res);
          if (res.respuesta) {
            const categoria: Categoria[] = res.respuesta;
            const padreCategoria = categoria.find((cat) => cat.id == value);
            if (padreCategoria && padreCategoria.subCategorias) {
              this.subCategoriasPadre = padreCategoria.subCategorias;
              if (this.subCategoriasPadre.length == 1) {
                this.idCategoriaPadre?.setValue(this.subCategoriasPadre[0].id);
              }
            }
          }
        })
      )
      .subscribe({
        complete: () => {
          this.estadosGlobalesService.setSpinner(false);
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
      descripcion: ['', validacion],
      idCategoriaPadre: [null, Validators.required],
      idCategoria: [null, Validators.required],
      valorHora: [
        null,
        [
          Validators.required,
          Validators.pattern(ValidacionFormularioService.REGEXPS.ONLY_NUMBERS),
        ],
      ],
    });
  }

  get idCategoria() {
    return this.formularioRegistroCurso.get('idCategoria');
  }
  get idCategoriaPadre() {
    return this.formularioRegistroCurso.get('idCategoriaPadre');
  }
  registrarCurso() {
    if (this.formularioRegistroCurso.invalid) {
      this.mensajeService.enviarMensaje({
        mensaje: 'Faltan datos por ingresar',
        tipo: TipoNotificacion.error,
      });
      return;
    }
    this.estadosGlobalesService.setSpinner(true);
    this.crearCursoService
      .registrar(this.formularioRegistroCurso.value)
      .pipe(
        tap((res) => {
          if (res.respuesta) {
            this.mensajeService.openSnackBar(res.mensaje, res.codigo);
          }
        })
      )
      .subscribe({
        error: () => {
          this.estadosGlobalesService.setSpinner(false);
        },
        complete: () => {
          this.estadosGlobalesService.setSpinner(false);
        },
      });
  }

  public revisarRN(controlador: string): string {
    return this.validacionFormularioService.getObtenerMensajeErrorForm(
      controlador,
      this.formularioRegistroCurso
    );
  }
}
