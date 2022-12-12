# Game Room

### Description

A place to centralize your games

### Motivation

Creation a core microservice application analogue to frameworks.

- Premises
  - Handle with two server framework implementation
    - Choose gRPC and fastify
  - Handle with two database implementation
    - Choose in memory to testing and prisma
  - Use value objects with self validation

### Entities

- User
- Provider

### Methods

- User Register
- User Login
- Add Provider
- Active Provider

#### gRPC

- User Register

  - payload:

    ```JSON
    {
        "email": string,
        "username": string,
        "password": string,
        "passwordConfirmation": string
    }
    ```

- User Login

  - payload:

    ```JSON
    {
        "username": string,
        "password": string
    }

    ```

- Add Provider

  - payload:

    ```JSON
    {
        "token": string,
        "provider": string,
        "nick": string
    }
    ```

- Active Provider

  - payload:

    ```JSON
    {
        "userId": string,
        "provider": string
    }
    ```

#### http (fastify)

- User Register

  - payload:

    ```JSON
    {
        "email": string,
        "username": string,
        "password": string,
        "passwordConfirmation": string
    }
    ```

- User Login

  - payload:

    ```JSON
    {
        "username": string,
        "password": string
    }

    ```

- Add Provider

  - payload:

    ```JSON
    {
        "provider": string,
        "nick": string
    }
    ```

  - headers:

    ```JSON
    {
        "token": string,
    }
    ```

    ***

        Secure note: Active Provider method don't exist for http, should create one topic with a subscribe for security reasons, for gRPC one BFF api will not implement this method, gRPC should not have internet network access only direct access to BFF.

### ENVS

```
BCRYPT_SALT= salt to bcrypt
JWT_PRIVATE_KEY= jwt private key
JWT_ISSUER= jwt issuer
TOKEN_MAX_AGE= token max age
DATABASE_URL= db url
SERVER_GRPC_PORT=50051
SERVER_HTTP_PORT=3000
SERVER_ADDRESS=0.0.0.0
```

### Running

To run this project, clone it in your machine

- Go to project folder `cd game-room`

- Instal packages `pnpm install` (if you don't have pnpm in your machine install with `npm i -g pnpm`)

- Copy .env.example to .env and edit values

- Run project with `pnpm dev`
