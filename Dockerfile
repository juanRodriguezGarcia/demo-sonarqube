FROM node:22-alpine

# Instalar dependencias en Alpine
RUN apk add --no-cache \
    curl \
    unzip \
    openjdk17 bash

# Definir JAVA_HOME y PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Versión del Sonar Scanner
ENV SONAR_SCANNER_VERSION=5.0.1.3006

# Descargar e instalar Sonar Scanner, y crear un symlink para el "java" que busca el launcher
RUN curl -L -o /tmp/sonarscanner.zip \
      "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip" \
 && unzip /tmp/sonarscanner.zip -d /opt \
 && mv /opt/sonar-scanner-${SONAR_SCANNER_VERSION}-linux /opt/sonar-scanner \
 && rm /tmp/sonarscanner.zip \
 \
 # Crear la ruta jre/bin que espera el launcher y enlazar al java del sistema
 && mkdir -p /opt/sonar-scanner/jre/bin \
 && ln -sf "$(which java)" /opt/sonar-scanner/jre/bin/java \
 && chmod +x /opt/sonar-scanner/bin/sonar-scanner

# Asegurar que el scanner use nuestro Java
ENV SONAR_SCANNER_OPTS="-Djava.home=${JAVA_HOME}"
ENV PATH="/opt/sonar-scanner/bin:${PATH}"

# Configurar NPM para usar /tmp en vez de /.npm o /usr/local/etc
RUN npm config set cache /tmp/.npm
RUN npm config set prefix /tmp/.npm-global
ENV PATH=/tmp/.npm-global/bin:$PATH
RUN mkdir -p /home/node/.npm && chmod -R 777 /home/node/.npm
# Configurar npm para usarlo
ENV NPM_CONFIG_CACHE=/home/node/.npm

WORKDIR /workspace

# Comprobar instalación (esto fallará si algo no quedó bien)
RUN java -version && sonar-scanner --version

CMD ["sonar-scanner", "--version"]
