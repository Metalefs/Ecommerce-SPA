import {crypt_config} from '../../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
import { Repository } from '../repositories/repository';
import { entities } from 'libs/data/src';
import { EmailService } from './email.service';
import { exception } from 'console';


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
                update({...user,token});

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
            // save user
            NovoUsuario.DataCriacao = new Date();
            await Repository.Insert(entities.Usuario.NomeID, NovoUsuario);

            const token = jwt.sign({ sub: NovoUsuario._id }, crypt_config.secret, { expiresIn: '7d' });
            console.log("usuário cadastrado com sucesso. token gerado", {...NovoUsuario,token});

            NovoUsuario.token = token;
            update(NovoUsuario);
            const msg = EmailService.RegistrationMessage(NovoUsuario);
            sgMail.send(msg)
            return {
                ...NovoUsuario,
                token
            };
        }else{
            console.log("usuário não cadastrado");
            return {erro:'usuário não cadastrado'};
        }
    }

    export async function getById(id:string) {
        return await Repository.FindOne(entities.Usuario.NomeID, {_id: id}) as entities.Usuario[];
    }

    export async function getByToken(id:string) {
        return await Repository.FindOne(entities.Usuario.NomeID, {token: id}) as entities.Usuario;
    }

    export async function update(Usuario : entities.Usuario) {
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
