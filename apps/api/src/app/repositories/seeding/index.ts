import { entities } from 'libs/data/src/index';
import * as seed from './classes';

export module Seeder {
      export function SeedCarousel(){
         return {
            name:entities.Carousel.NomeID,
            value:seed.carousel,
            array:false
          }
      }
      export function SeedCollections (){ // data for seeding the active repository

            return [
                  {
                        name:entities.Carousel.NomeID,
                        value:seed.carousel,
                        array:false
                  },
                  {
                        name:entities.Sobre.NomeID,
                        value:seed.Sobre,
                        array:false
                  },
                  {
                        name:entities.Produto.NomeID,
                        value:seed.Produto,
                        array:true
                  },
                  {
                        name:entities.Servico.NomeID,
                        value:seed.Servico,
                        array:true
                  },
                  {
                        name:entities.InformacoesContato.NomeID,
                        value:seed.InformacoesContato,
                        array:false
                  },
                  {
                        name:entities.Usuario.NomeID,
                        value:seed.Usuario,
                        array:false
                  },
                  {
                        name:entities.Cliente.NomeID,
                        value:seed.Cliente,
                        array:true
                  },
                  {
                        name:entities.Categoria.NomeID,
                        value:seed.Categoria,
                        array:true
                  },
                  {
                        name:entities.Mensagem.NomeID,
                        value:seed.Mensagem,
                        array:false
                  },
            ];

      }
}
