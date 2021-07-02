export class ErrorHandler{

  static DefaultException(error:any, res?){
    try{
      res.status(500).send({ erro: error });
    }
    catch(ex){
      console.error(error);
    }
  }
  static AuthorizationException(error:any, res?){
    try{
      res.status(400).send({ erro: error });
    }
    catch(ex){
      console.error(error);
    }
  }
  static ConflictException(error:any, res?){
    try{
      res.status(409).send({ erro: error });
    }
    catch(ex){
      console.error(error);
    }
  }
  //
}
