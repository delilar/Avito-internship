# Используем базовый образ node
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем веб-сервер для статических файлов
RUN npm install -g serve

# Указываем порт, который будет использовать контейнер
EXPOSE 5173

# Запускаем приложение
CMD ["serve", "-s", "build", "-l", "5173"]
