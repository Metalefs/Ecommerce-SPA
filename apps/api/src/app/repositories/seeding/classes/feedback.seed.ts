import { entities } from '@personalizados-lopes/data';
import { Usuario } from './usuario.seed';

export let Feedback:entities.Feedback =
 new entities.Feedback(Usuario.Nome, Usuario.Email, Usuario,"Adorei","Entregue pontualmente todos os dias úteis, não preciso me preocupar!");
