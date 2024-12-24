FROM ubuntu:latest
LABEL authors="armaanpatankar"

FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Install Maven and other dependencies
RUN apt-get update && apt-get install -y maven git curl ca-certificates

# Copy your project files
COPY . .

# Build the application
RUN mvn clean package

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "target/s0-1.0-SNAPSHOT.jar"]