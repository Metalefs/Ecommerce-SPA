import { FormArray, FormGroup } from '@angular/forms';
 /*
    Returns an array of invalid control/group names, or a zero-length array if
    no invalid controls/groups where found
  */
  export function findInvalidControlsRecursiveform(form):boolean {
    var invalidControls:string[] = [];
    if(form){

      let recursiveFunc = (_form:FormGroup|FormArray) => {
        Object.keys(_form?.controls).forEach(field => {
          const control = _form.get(field);
          if (control.invalid) invalidControls.push(field);
          if (control instanceof FormGroup) {
            recursiveFunc(control);
          } else if (control instanceof FormArray) {
            recursiveFunc(control);
          }
        });
      }
      recursiveFunc(form);
      return invalidControls?.length > 0;
    }
    return false;
  }
