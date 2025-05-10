
# Authentication-Service-API

Este projeto é uma API de autenticação desenvolvida com Node.js, TypeScript e Fastify. Ele permite o registro, login e redefinição de senhas usando autenticação JWT. Além disso, oferece envio de e-mails e conta com boas práticas de segurança.

---

## Funcionalidades

- Registro de usuários com senhas criptografadas
- Login e emissão de tokens JWT
- Middleware para proteger rotas autenticadas
- Rate limiting para proteger contra brute force
- Envio de e-mails usando Nodemailer
- Validação de Emails
- Validação de senhas
- Testado com Insomnia
- Redefinição de senhas

---

## Tecnologias & Dependências

- **Fastify**
- **TypeScript**
- **@fastify/jwt**
- **@fastify/helmet**
- **@fastify/rate-limit**
- **bcrypt**
- **dotenv**
- **nodemailer**
- **password-validator**
- **Prisma + SQLite**
- **ts-node-dev**

---

## Variáveis de Ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```
SECRET_KEY=sua_chave_jwt
DATABASE_URL=file:./dev.db
FROM=seu_email@dominio.com
```

---

## Instalação

```bash
git clone https://github.com/jrBroz/Authentication-Service-API.git
cd Authentication-Service-API
npm install
```

---

## Scripts Disponíveis

| Comando         | Descrição                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Inicia o servidor em modo de desenvolvimento |
| `npm run build` | Compila o código TypeScript              |
| `npm start`     | Inicia a aplicação em modo produção      |

---

## Prisma (ORM)

Configure o banco de dados e gere as tabelas:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

