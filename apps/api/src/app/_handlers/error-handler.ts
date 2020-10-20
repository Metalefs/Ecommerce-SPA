export class ErrorHandler{

    static DefaultException(error:any, res?){
        res.status(500).send({ erro: error });
        console.log(error);
    }
    static AuthorizationException(error:any, res?){
      res.status(400).send({ erro: error });
      console.log(error);
  }
    //
}
