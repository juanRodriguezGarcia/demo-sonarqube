FROM node:22-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    openjdk11-jre \
    curl \
    unzip

# Instalar SonarQube Scanner
ENV SONAR_SCANNER_VERSION=5.0.1.3006
RUN curl -o sonarscanner.zip -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip && \
    unzip sonarscanner.zip && \
    mv sonar-scanner-${SONAR_SCANNER_VERSION}-linux /opt/sonar-scanner && \
    rm sonarscanner.zip

# Configurar PATH
ENV PATH="/opt/sonar-scanner/bin:${PATH}"

# Verificar instalación
RUN sonar-scanner --version

WORKDIR /workspace