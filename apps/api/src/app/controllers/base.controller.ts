import { ErrorHandler } from '../_handlers/error-handler';
import { UsuarioLogado } from '../_handlers/Authentication';

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
 class BaseController {
  /**
   * @param {Model} service The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   */

  _service;
  constructor(service) {
     this._service = service;

     this.Ler = this.Ler.bind(this);
     this.Incluir = this.Incluir.bind(this);
     this.Editar = this.Editar.bind(this);
     this.Remover = this.Remover.bind(this);
  }


  Ler(req,res,next){
    this._service.Ler()
    .then(result => res.send(result))
    .catch(err => ErrorHandler.DefaultException(err, res));
  }
 /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  Incluir(req, res, next) {
    UsuarioLogado(req, res)
    .catch(ex => ErrorHandler.AuthorizationException(ex, res))
    .then(usuario => {
      if (usuario)
        this._service.Inserir(usuario, req.body.item)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
    })
  }

  Editar(req,res,next){
    UsuarioLogado(req, res)
          .catch(ex => ErrorHandler.AuthorizationException(ex, res))
          .then(usuario => {
            if (usuario)
              this._service.Alterar(usuario, req.body.item)
                .then(result => res.send(result))
                .catch(err => ErrorHandler.DefaultException(err, res))
          })
  }

  Remover(req,res,next){
    UsuarioLogado(req, res)
          .catch(ex => ErrorHandler.AuthorizationException(ex, res))
          .then(usuario => {
            if (usuario)
              this._service.Deletar(usuario, req.params.id)
                .then(result => res.send(result))
                .catch(err => ErrorHandler.DefaultException(err, res))
          })
  }
}

export default BaseController;
