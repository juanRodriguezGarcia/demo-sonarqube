@echo off
echo Construyendo imagen Docker con SonarQube Scanner...
docker build -t sonar-node22-scanner .
echo Imagen construida exitosamente: sonar-node22-scanner