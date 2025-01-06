# Camada de compilacao
FROM ethereum/solc:0.8.28-alpine as solc-compiler

# Create app directory
WORKDIR /app

# Copy files to directory
COPY ./ /app/

# Compilando
RUN sh Compile.sh

# Camada de deploy
FROM oven/bun:alpine

# Create app directory
WORKDIR /app

# Copiando tudo para deploy
COPY --from=solc-compiler ./app /app/

# Iniciando bun e executando testes
RUN bun install && bun ganache && bun test

# Iniciando CLI
ENTRYPOINT ["sh","Bench.sh"]
