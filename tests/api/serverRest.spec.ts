import { test, expect, APIRequestContext } from '@playwright/test';
import { request } from '@playwright/test';
import { Faker, pt_BR } from '@faker-js/faker';
import { Person } from '../../helpers/data/person';
import { validateJson } from '../../helpers/api/jsonValidator';
import { getAllUsersSchema } from '../../helpers/api/getAllUsersSchema';
import { getAllUsersNotFoundSchema } from '../../helpers/api/getAllUsersNotFoundSchema';
import { getAllUsersAdminNotFoundSchema } from '../../helpers/api/getAllUsersAdminNotFoundSchema';
import { getUserSchema } from '../../helpers/api/getUserSchema';
import { getUserNotFoundSchema } from '../../helpers/api/getUserNotFoundSchema';
import { postUserSchema } from '../../helpers/api/postUserSchema';
import { postUserBadRequestSchema } from '../../helpers/api/postUserBadRequestSchema';
import { postUserSuccess } from '../../helpers/api/postUserSuccess';
import { putUserSchema } from '../../helpers/api/putUserSchema';
import { putUserBadRequestSchema } from '../../helpers/api/putUserBadRequestSchema';
import { putUserSuccess } from '../../helpers/api/putUserSuccess';
import { putUserCreate } from '../../helpers/api/putUserCreate';
import { deleteUserSchema } from '../../helpers/api/deleteUserSchema';
import { deleteUserBasket } from '../../helpers/api/deleteUserBasket';
import { passwords } from '../../helpers/data/passwords';
import { statusCode } from '../../helpers/api/statusCode';

test.describe('Suite Test API Server Rest', async () => {

    let context: APIRequestContext;
    let person: Person;
    let faker: Faker;

    test.beforeEach(async () => {
        context = await request.newContext({
            baseURL: 'https://serverest.dev',
          });
        faker = new Faker({ locale: pt_BR });
        person = new Person(faker, faker.date.birthdate( {min: 18, max: 70, mode: 'age'}));
    });

    test('Cenário 1: Rota GET para todos os usuários', async () => {
        const newRequest = await context.get('/usuarios');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 2: Rota GET para todos os usuários e Parametro ID inexistente', async () => {
        const newRequest = await context.get('/usuarios?_id=123');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersNotFoundSchema)).toBe(true);
    });

    test('Cenário 3: Rota GET para todos os usuários e Parametro NOME inexistente', async () => {
        const newRequest = await context.get('/usuarios?nome=XPTO');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersNotFoundSchema)).toBe(true);
    });

    test('Cenário 4: Rota GET para todos os usuários e Parametro EMAIL inexistente', async () => {
        const newRequest = await context.get('/usuarios?email=email@email.com');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersNotFoundSchema)).toBe(true);
    });

    test('Cenário 5: Rota GET para todos os usuários e Parametro PASSWORD inexistente', async () => {
        const newRequest = await context.get('/usuarios?password=123');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersNotFoundSchema)).toBe(true);
    });

    test('Cenário 6: Rota GET para todos os usuários e Parametro ADMINISTRADOR inexistente', async () => {
        const newRequest = await context.get('/usuarios?administrador=verdadeiro');
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), getAllUsersAdminNotFoundSchema)).toBe(true);
    });

    test('Cenário 7: Rota GET para todos os usuários e Parametro ID válido', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        const newRequest = await context.get(`/usuarios?_id=${idUser}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 8: Rota GET para todos os usuários e Parametro NOME válido', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        await context.post('/usuarios', { data: body });
        const fullNameSearch = person.firstName + '%' + person.lastName;
        const newRequest = await context.get(`/usuarios?nome=${fullNameSearch}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 9: Rota GET para todos os usuários e Parametro EMAIL válido', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        await context.post('/usuarios', { data: body });
        const newRequest = await context.get(`/usuarios?email=${person.email}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 10: Rota GET para todos os usuários e Parametro PASSWORD válido', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        await context.post('/usuarios', { data: body });
        const newRequest = await context.get(`/usuarios?password=${passwords.user}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 11: Rota GET para todos os usuários e Parametro ADMINISTRADOR válido', async () => {
        const newRequest = await context.get('/usuarios?administrador=true');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getAllUsersSchema)).toBe(true);
    });

    test('Cenário 12: Rota GET por ID de usuário e Parametro ID inexistente', async () => { 
        const newRequest = await context.get('/usuarios/2IiQhlg5ymtBJr');
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), getUserNotFoundSchema)).toBe(true);
    });

    test('Cenário 13: Rota GET por ID de usuário e Parametro ID válido', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        const newRequest = await context.get(`/usuarios/${idUser}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), getUserSchema)).toBe(true);
    });

    test('Cenário 14: Rota POST de usuário somente a chave nome no body', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName
        };
        const newRequest = await context.post('/usuarios', { data: body });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), postUserSchema)).toBe(true);
    });

    test('Cenário 15: Rota POST de usuário somente a chave email no body', async () => {
        const body ={
            "email": person.email
        };
        const newRequest = await context.post('/usuarios', { data: body });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), postUserSchema)).toBe(true);
    });

    test('Cenário 16: Rota POST de usuário somente a chave password no body', async () => {
        const body ={
            "password": passwords.user
        };
        const newRequest = await context.post('/usuarios', { data: body });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), postUserSchema)).toBe(true);
    });

    test('Cenário 17: Rota POST de usuário somente a chave administrador no body', async () => {
        const body ={
            "administrador": "true"
        };
        const newRequest = await context.post('/usuarios', { data: body });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), postUserSchema)).toBe(true);
    });

    test('Cenário 18: Rota POST de usuário com email já cadastrado ', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        let body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        await context.post('/usuarios', { data: body });
        
        const newfaker = new Faker({ locale: pt_BR });
        const newPerson = new Person(newfaker, newfaker.date.birthdate( {min: 18, max: 70, mode: 'age'}));
        const newFullName = newPerson.firstName + ' ' + newPerson.lastName;
        body ={
            "nome": newFullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const newRequest = await context.post('/usuarios', { data: body });

        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), postUserBadRequestSchema)).toBe(true);
    });
    
    test('Cenário 19: Rota POST de usuário com sucesso', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const newRequest = await context.post('/usuarios', { data: body });
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.CREATED);
        await expect(validateJson(await newRequest.json(), postUserSuccess)).toBe(true);
    });

    test('Cenário 20: Rota PUT de usuário somente a chave nome no body', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body = {
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        
        const newBody = {
            "nome": fullName
        };
        const newRequest = await context.put(`/usuarios/${idUser}`, { data: newBody });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), putUserSchema)).toBe(true);
    });

    test('Cenário 21: Rota PUT de usuário somente a chave email no body', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body = {
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        
        const newBody = {
            "email": person.email
        };
        const newRequest = await context.put(`/usuarios/${idUser}`, { data: newBody });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), putUserSchema)).toBe(true);
    });

    test('Cenário 22: Rota PUT de usuário somente a chave password no body', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body = {
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        
        const newBody ={
            "password": passwords.user
        };
        const newRequest = await context.put(`/usuarios/${idUser}`, { data: newBody });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), putUserSchema)).toBe(true);
    });

    test('Cenário 23: Rota PUT de usuário somente a chave administrador no body', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body = {
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        
        const newBody ={
            "administrador": "true"
        };
        const newRequest = await context.put(`/usuarios/${idUser}`, { data: newBody });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), putUserSchema)).toBe(true);
    });

    test('Cenário 24: Rota PUT de usuário com email já cadastrado', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        let body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        await context.post('/usuarios', { data: body });
        
        const newfaker = new Faker({ locale: pt_BR });
        const newPerson = new Person(newfaker, newfaker.date.birthdate( {min: 18, max: 70, mode: 'age'}));
        const newFullName = newPerson.firstName + ' ' + newPerson.lastName;
        body ={
            "nome": newFullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const newRequest = await context.put('/usuarios/E8bR8lvEZfMIiJDo', { data: body });
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), putUserBadRequestSchema)).toBe(true);
    });

    test('Cenário 25: Rota PUT de usuário com id não cadastrado ', async () => {
        const newPerson = new Person(faker, faker.date.birthdate( {min: 18, max: 70, mode: 'age'}))
        const fullName = newPerson.firstName + ' ' + newPerson.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const newRequest = await context.put('/usuarios/E8bR8lvEZfMIiJDo', { data: body });
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.CREATED);
        await expect(validateJson(await newRequest.json(), putUserCreate)).toBe(true);
    });
    
    test('Cenário 26: Rota PUT de usuário com id já cadastrado', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        let body = {
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;

        const newfaker = new Faker({ locale: pt_BR });
        const newPerson = new Person(newfaker, newfaker.date.birthdate( {min: 18, max: 70, mode: 'age'}));
        const newFullName = newPerson.firstName + ' ' + newPerson.lastName;
        body ={
            "nome": newFullName,
            "email": newPerson.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const newRequest = await context.put(`/usuarios/${idUser}`, { data: body });
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), putUserSuccess)).toBe(true);
    });

    test('Cenário 27: Rota DELETE de usuário com id não cadastrado', async () => {
        const newRequest = await context.delete('/usuarios/22zmnKP6oR2Zx');
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), deleteUserSchema)).toBe(true);
    });

    test('Cenário 28: Rota DELETE de usuário com id já cadastrado e vinculado ao carrinho', async () => {
        const getUserCarrinho = await context.get('/carrinhos');
        const responseBody = await getUserCarrinho.json()
        const idUser = responseBody.carrinhos[0].idUsuario;
        const newRequest = await context.delete(`/usuarios/${idUser}`);
        await expect(newRequest.ok()).toBeFalsy();
        await expect(newRequest.status()).toBe(statusCode.BADREQUEST);
        await expect(validateJson(await newRequest.json(), deleteUserBasket)).toBe(true);
    });

    test('Cenário 29: Rota DELETE de usuário com id já cadastrado e sem vinculo com carrinho', async () => {
        const fullName = person.firstName + ' ' + person.lastName;
        const body ={
            "nome": fullName,
            "email": person.email,
            "password": passwords.user,
            "administrador": "false"
        };
        const postRequest = await context.post('/usuarios', { data: body });
        const responseBody = await postRequest.json()
        const idUser = responseBody._id;
        const newRequest = await context.delete(`/usuarios/${idUser}`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest.status()).toBe(statusCode.OK);
        await expect(validateJson(await newRequest.json(), deleteUserSchema)).toBe(true);
    });
}) ;
