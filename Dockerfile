FROM node:22-alpine

# Instalar dependencias en Alpine
RUN apk add --no-cache \
    curl \
    unzip \
    openjdk17

# Definir JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Instalar SonarQube Scanner
ENV SONAR_SCANNER_VERSION=5.0.1.3006
RUN curl -o sonarscanner.zip -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip && \
    unzip sonarscanner.zip && \
    mv sonar-scanner-${SONAR_SCANNER_VERSION}-linux /opt/sonar-scanner && \
    rm sonarscanner.zip && \
    rm -rf /opt/sonar-scanner/jre   # ⚡ eliminar JRE embebido

# Configurar PATH
ENV PATH="/opt/sonar-scanner/bin:${PATH}"

# Forzar a usar nuestro Java
ENV SONAR_SCANNER_OPTS="-Djava.home=${JAVA_HOME}"

# Verificar instalación
RUN java -version && sonar-scanner --version

WORKDIR /workspace
