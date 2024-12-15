import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidacionFormularioService {
  public static readonly ERRORMESSAGES = {
    //! Form input Error Messages
    required: () => '*Este campo es requerido.',
    max: (res: string) => 'El valor máximo es ' + res + '.',
    min: (res: string) => 'El valor mínimo es ' + res + '.',
    minlength: (res: string) => 'La longitud mínima es ' + res + '.',
    maxlength: (res: string) => 'La longitud máxima es ' + res + '.',
    pattern: () => 'No cumple con el patrón!',
    only_alphabet: () => 'Solo se aceptan caracteres alfabéticos.',
    only_numbers: () => 'Solo se aceptan caracteres numéricos.',
    only_email: () => 'Correo no válido.',
    only_alphanumeric: () =>
      'Solo se aceptan caracteres alfabéticos y numéricos.',
    only_alphanumeric_sinEspacio: () =>
      'Solo se aceptan caracteres alfanuméricos.',
    only_cifra_cuatro_decimales: () => 'El número solo permite hasta 4 decimales.',
    default: () => 'Error en campo',
    porcentaje: () => 'El caracter no esta permitido',
    fileSizeExceeded: () => 'El tamaño del archivo excede el límite de 10MB.',
    invalidFileType: () => 'Tipo de archivo no válido. Se permiten solo archivos de tipo:  ',

  };

  public static readonly REGEXPS = {
    ONLY_ALPHABET: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$',
    ONLY_NUMBERS: '^[0-9]*$',
    ONLY_ALPHANUMERIC: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9 -]*$',
    ONLY_ALPHABET_NUMBERS: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9 ]*$',
    ONLY_ALPHABET_NUMBERS_SIN_ESPACIO: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]*$',
    // ONLY_EMAIL: '[a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*@[a-zA-Z]+([a-zA-Z]+)*[.][a-zA-Z]{2,5}',
    ONLY_EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,3}$/,
    PASSWORD:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]*$',
    PORCENTAJE: '^[0-9.,]*$',
    ONLY_ALPHABET_CARACTERS: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ. ]*$',
    TEXTO_LETRAS_PUNTO: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ0123456789#. ]*$',
    CIFRAS_CUATRO_DECIMALES: '^[0-9]*(.[0-9]{1,4})?$',

  };

  getErrorMessage(control: AbstractControl | null): string {
    const errorMessage = [];
    if (control?.hasError('required')) {
      errorMessage.push(ValidacionFormularioService.ERRORMESSAGES.required());
    }
    if (control?.hasError('minlength')) {
      let valorMinimo = control.errors;
      valorMinimo = valorMinimo?.['minlength'];
      errorMessage.push(
        ValidacionFormularioService.ERRORMESSAGES.minlength(
          valorMinimo?.['requiredLength']
        )
      );
    }
    if (control?.hasError('maxlength')) {
      let valorMaximo = control.errors;
      valorMaximo = valorMaximo?.['maxlength'];
      errorMessage.push(
        ValidacionFormularioService.ERRORMESSAGES.maxlength(
          valorMaximo?.['requiredLength']
        )
      );
    }

    if (control?.hasError('max')) {
      let valorMaximo = control.errors;
      valorMaximo = valorMaximo?.['max'];
      errorMessage.push(
        ValidacionFormularioService.ERRORMESSAGES.max(valorMaximo?.['max'])
      );
    }

    if (control?.hasError('min')) {
      let valorMinimo = control.errors;
      valorMinimo = valorMinimo?.['min'];
      errorMessage.push(
        ValidacionFormularioService.ERRORMESSAGES.min(valorMinimo?.['min'])
      );
    }

    if (control?.hasError('fileSizeExceeded')) {
      errorMessage.push(ValidacionFormularioService.ERRORMESSAGES.fileSizeExceeded());
    }

    if (control?.hasError('invalidFileType')) {
      const allowedTypes = control.errors?.['invalidFileType'];
      errorMessage.push(
        ValidacionFormularioService.ERRORMESSAGES.invalidFileType() + allowedTypes.join(', ')
      );
    }

    if (control?.hasError('pattern')) {
      switch (control?.errors?.['pattern'].requiredPattern) {
        case ValidacionFormularioService.REGEXPS.ONLY_ALPHABET:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_alphabet()
          );
          break;
        case ValidacionFormularioService.REGEXPS.ONLY_NUMBERS:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_numbers()
          );
          break;
        case ValidacionFormularioService.REGEXPS.ONLY_ALPHANUMERIC:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_alphanumeric()
          );
          break;
        case ValidacionFormularioService.REGEXPS.ONLY_ALPHABET_NUMBERS:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_alphanumeric()
          );
          break;
        case ValidacionFormularioService.REGEXPS.ONLY_ALPHABET_NUMBERS_SIN_ESPACIO:
            errorMessage.push(
              ValidacionFormularioService.ERRORMESSAGES.only_alphanumeric_sinEspacio()
            );
            break;
        case '^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$':
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_email()
          );
          break;
        case ValidacionFormularioService.REGEXPS.CIFRAS_CUATRO_DECIMALES:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.only_cifra_cuatro_decimales()
          );
          break;
        default:
          errorMessage.push(
            ValidacionFormularioService.ERRORMESSAGES.pattern()
          );
      }
    }

    if (control?.errors && !errorMessage.length) {
      errorMessage.push(ValidacionFormularioService.ERRORMESSAGES.default());
    }

    return errorMessage.join(' ');
  }

  getObtenerMensajeErrorForm(control: string, form: FormGroup): string {
    if (form) {
      const formControl = form.get(control);
      return this.getErrorMessage(formControl);
    }
    return '';
  }
}
