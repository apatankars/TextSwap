FROM ubuntu:latest
LABEL authors="armaanpatankar"

# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy your Maven project to the container
COPY . .

# Build the application using Maven
RUN ./mvn package

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "target/<your-jar-file>.jar"]