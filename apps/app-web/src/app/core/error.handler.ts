import { throwError } from 'rxjs';

export function

    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
      } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      return throwError(error);
  }
