
# Pass-in
Aplicação para a gestão e organização de participantes em eventos.

## Requisitos

### Requisitos funcionais

- [x]  O organizador deve poder cadastrar um novo evento;
- [x]  O organizador deve poder visualizar dados de um evento;
- [x]  O organizador deve poser visualizar a lista de participantes;
- [x]  O participante deve poder se inscrever em um evento;
- [x]  O participante deve poder visualizar seu crachá de inscrição;
- [x]  O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x]  O participante só pode se inscrever em um evento uma única vez;
- [x]  O participante só pode se inscrever em eventos com vagas disponíveis;
- [x]  O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x]  O check-in no evento será realizado através de um QRCode;


## HTTP

### POST `/events`

Create an event.

#### Request body

```json
{
  "title": "Unite Summit",
  "details": "Um evento para programadores",
  "maximumAttendees": 235
}
```

#### Response body

```json
{
  "eventId": "683d763a-5ce2-489b-a18a-19faedce9b45"
}
```

### POST `/events/:eventId/attendees`

Register an attendee

#### Request body

```json
{
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

#### Response body

```json
{
  "attendeeId": 3
}
```


### GET `/events/:eventId`

Get an event

#### Response body

```json
{
  "event": {
    "id": "683d763a-5ce2-489b-a18a-19faedce9b45",
    "title": "Unite Summit",
    "slug": "unite-summit",
    "details": "Um evento para programadores",
    "maximumAttendees": 235,
    "attendeesAmount": 1
  }
}
```

### GET `/attendees/:attendeeId/badge`

Get an attendee badge

#### Response body

```json
{
  "badge": {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "eventTitle": "Unite Summit",
    "checkInURL": "http://localhost:3333/attendees/3/check-in"
  }
}
```

### GET `/attendees/:attendeeId/check-in`

Check-in an attendee


### GET `/events/:eventId/attendees`

Get an event attendees

#### Response body

```json
{
  "attenddes": [
    {
      "id": 3,
      "name": "John Doe",
      "email": "johndoe@email.com",
      "createdAt": "2024-04-10T17:54:16.808Z",
      "checkedInAt": "2024-04-10T17:54:53.650Z"
    }
  ]
}
```

## Instalação


```bash
# Faça o clone do repositório
  git clone https://github.com/RenanFachin/RS_NLW_API_pass-in.git

# Instale as depêndencias
  npm i

# Copie o arquivo .env.example para um arquivo .env
  cp .env.example .env

# Rodando containers para criação do db
  docker compose up

# Criar as tabelas no banco de dados
  npx prisma migrate dev

# Popular o banco de dados
  npx prisma db seed

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
  
# Acessando a documentação do projeto
  http://localhost:3333/docs
```

### 📘 Ferramentas/Bibliotecas utilizadas
- Back-end
  - `NodeJS`
  - `Fastify`
  - `Docker`
  - `Postgresql`
  - `Typescript`
  - `Prisma ORM`