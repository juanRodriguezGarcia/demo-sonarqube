FROM node:22-alpine

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

# Definir JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

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