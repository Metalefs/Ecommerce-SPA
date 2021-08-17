import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import { CorreiosClient } from '../../client/integrations/correios.client';
import { ProdutoService } from '../../services';
import { Produto } from 'libs/data/src/lib/classes';
const CorreiosRouter = express();

const produtoService = new ProdutoService();
const correiosClient = new CorreiosClient();
CorreiosRouter.get(RouteDictionary.Correios.CalcularPrecoPrazoPorProduto + `:id`, async (req,res)=>{
  console.log(req.params);
  if(req.params.id && req.query.cep){
    const produto = await produtoService.FiltrarPorId(req.params.id) as unknown as Produto;
    const cep = req.query.cep as string;
    if(produto && cep)
    correiosClient.CalcularPrecoPrazoPorProduto(produto[0], cep).then(result=>{
        res.send(result);
    })
  }
})
.get(RouteDictionary.Correios.CalcularPrecoPrazoPorOrcamento, (req,res)=>{

})
.get(RouteDictionary.Correios.RastrearEncomendas + `:id`, (req,res)=>{

})

export {
  CorreiosRouter
}
