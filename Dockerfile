﻿FROM postgres:latest

# Add the init.sql file to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/