import {crypt_config} from '../../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { Repository } from '../repositories/repository';
import { entities } from 'libs/data/src';
import { EmailService } from './email.service';
import { exception } from 'console';

import { generateSinglePassword } from './password.service';
import { Usuario } from 'libs/data/src/lib/classes';

export module UsuarioService {

    export async function authenticate(Usuario : entities.Usuario) {
        console.log('query:', {Email: Usuario.Email}, {Senha: Usuario.Senha});

        return await Repository.FindOne(entities.Usuario.NomeID, {Email: Usuario.Email}).then((user: any) => {

            if(user == 0){
              throw "Usuário não encontrado";
            }
            if(user != undefined)
            if (user && bcrypt.compareSync(Usuario.Senha, user.Senha)) {
                const token = jwt.sign({ sub: user._id }, crypt_config.secret, { expiresIn: '7d' });
                console.log("login com sucesso. token gerado", {...user,token});

                Usuario.token = token;
                updateUserToken({...user,token});

                return {
                    ...user,
                    token
                };
            }
            if (!user.Senha) return {erro:'E-mail ou senha incorretos'};

        });
    }

    export async function create(NovoUsuario : entities.Usuario) {
        // validate
        let find = await Repository.FindOne(entities.Usuario.NomeID, {Email: NovoUsuario.Email});
        console.log("FIND",find);
        if (find != 0 && find != undefined) {
            return {erro:'E-mail "' + NovoUsuario.Email + '" já está sendo usado!'};
        }
        else{

        }

        // hash password
        if (NovoUsuario.Senha) {
            NovoUsuario.Senha = bcrypt.hashSync(NovoUsuario.Senha, 10);
        }
        console.log("Usuario a ser criado:",NovoUsuario);
        if(NovoUsuario.Email && NovoUsuario.Senha){
            let emailService = new EmailService();
            // save user
            NovoUsuario.DataCriacao = new Date();
            await Repository.Insert(entities.Usuario.NomeID, NovoUsuario);

            const token = jwt.sign({ sub: NovoUsuario._id }, crypt_config.secret, { expiresIn: '7d' });
            console.log("usuário cadastrado com sucesso. token gerado", {...NovoUsuario,token});

            NovoUsuario.token = token;
            updateUserToken(NovoUsuario);
            const msg = emailService.SendRegistrationMessage(NovoUsuario);
            return {
                ...NovoUsuario,
                token
            };
        }else{
            console.log("usuário não cadastrado");
            return {erro:'usuário não cadastrado'};
        }
    }

    export async function changePassword(email:string){
      const user = await getByEmail(email);
      if(user){
        let emailService = new EmailService();
        let senha = generateSinglePassword();
        let hashSenha =  bcrypt.hashSync(senha, 10);;
        console.log(senha);
        user.Senha = hashSenha;
        return await Repository.UpdateUserPassword(entities.Usuario.NomeID, user._id, user).then((x:Usuario) => {
          emailService.SendUpdatePasswordMessage(x, senha);
          if(x)
          return true;
          else
          return false;
        });
      }
      else{
        return {erro: 'E-mail não encontrado'}
      }
    }

    export async function getById(id:string) {
        return await Repository.FindOne(entities.Usuario.NomeID, {_id: id}) as entities.Usuario[];
    }

    export async function getByEmail(email:string) {
      return await Repository.FindOne(entities.Usuario.NomeID, {Email: email}) as entities.Usuario;
    }

    export async function getByToken(id:string) {
        return await Repository.FindOne(entities.Usuario.NomeID, {token: id}) as entities.Usuario;
    }

    export async function updateUserToken(Usuario : entities.Usuario) {
        const user = await getById(Usuario._id);

        // validate
        if (!user) return {erro:'Usuário não encontrado'};

        // copy userParam properties to user
        Object.assign(user, Usuario);

        return Repository.UpdateUserToken(entities.Usuario.NomeID, Usuario._id, Usuario.token);
    }

    export async function _delete(id: string) {
        await Repository.Remove(entities.Usuario.NomeID, {_id : id});
    }

    // helper functions

    export function omitPassword(Usuario: entities.Usuario) {
        const { Senha, ...userWithoutPassword } = Usuario;
        return userWithoutPassword;
    }


};
