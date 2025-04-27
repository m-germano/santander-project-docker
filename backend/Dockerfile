FROM node:18

WORKDIR /app

# Copia apenas os arquivos de package primeiro (para cache funcionar)
COPY backend/package*.json ./

# Instala as dependências
RUN npm install

# Depois copia o resto dos arquivos
COPY backend/ .

EXPOSE 5000

CMD ["npm", "start"]
