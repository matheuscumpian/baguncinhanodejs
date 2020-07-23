# baguncinhanodejs :laughing:


## APIzinha de autorização rodando com Docker e usando Mongo  :fire:

````
docker-compose up -D  
````
Antes de rodar configure as variáveis de ambiente do Mongo :) 


### Para que serve? :tada:

Fiz apenas para usar como base para meus back-ends, essa API expõe dois recursos:

#### POST /api/auth   --> {email, password}  # Autentica o usuario  e gera jwt :key:
#### POST /api/users   --> {name, email, password}  # Cria usuario lock :lock:

Dentro do projeto esta disponibilizado um middleware de auth que verifica a validade do jwt, é só usar ele quando quiser criar rotas protegidas e ta pronto o sorvetinho :pray:

# Friendly reminder -> Porta default 8080 :bulb:
