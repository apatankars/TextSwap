FROM ubuntu:latest
LABEL authors="armaanpatankar"

# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

RUN apt-get update && apt-get install -y git curl

# Copy your Maven project to the container
COPY . .

# Add permissions for the Maven Wrapper
RUN chmod +x ./mvnw

# Build the application using Maven Wrapper
RUN ./mvnw -X clean package

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "target/s0-1.0-SNAPSHOT.jar"]