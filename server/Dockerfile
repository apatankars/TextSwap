FROM ubuntu:latest
LABEL authors="armaanpatankar"

FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Install Maven and other dependencies
RUN apt-get update && apt-get install -y maven git curl ca-certificates

# Copy your project files
COPY . .

ENV auth_provider_x509_cert_url ${auth_provider_x509_cert_url}
ENV auth_uri ${auth_uri}
ENV client_email ${client_email}
ENV client_id ${client_id}
ENV client_x509_cert_url ${client_x509_cert_url}
ENV private_key ${private_key}
ENV project_id ${project_id}
ENV token_uri ${token_uri}
ENV type ${type}
ENV universe_domain ${universe_domain}

# Build the application
RUN mvn clean package -DskipTests

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "target/s0-1.0-SNAPSHOT.jar"]