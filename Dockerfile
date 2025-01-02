FROM oven/bun:alpine

# Create app directory
WORKDIR /app

# Copy files to directory
COPY ./ /app/

# Iniciando bun e executando testes
RUN bun install && bun test

# Iniciando CLI
ENTRYPOINT ["sh","Bench.sh"]