# Используем официальный образ PostgreSQL
FROM postgres:latest
# Устанавливаем переменные окружения для конфигурации базы данных
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=test
ENV POSTGRES_DB=mydb

# Копируем SQL-скрипты для инициализации базы данных (если есть)
# Скрипты, расположенные в /docker-entrypoint-initdb.d/, автоматически выполняются при инициализации контейнера
COPY ./initdb/ /docker-entrypoint-initdb.d/

# Настройка прав доступа, если необходимо
# RUN chown -R postgres:postgres /docker-entrypoint-initdb.d/

# Открываем порт 5432 для подключения к PostgreSQL
EXPOSE 5432

# Завершаем настройку (опционально) и запускаем PostgreSQL