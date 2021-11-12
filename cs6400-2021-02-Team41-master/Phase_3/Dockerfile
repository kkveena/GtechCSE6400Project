FROM ubuntu:18.04 AS build-stage
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get -y install openjdk-8-jdk-headless maven
ADD webpack-app /npm
ADD webapp /mvn
WORKDIR /npm
RUN npm run build
RUN cp /npm/dist/main.js /mvn/src/main/resources/static
WORKDIR /mvn
RUN mvn package
ENTRYPOINT ["java", "-jar", "/mvn/target/webapp-0.0.1-SNAPSHOT.jar"]
#RUN java -jar /mvn/target/webapp-0.0.1-SNAPSHOT.jar
#FROM scratch AS export-stage
#COPY --from=build-stage /mvn/target/webapp-0.0.1-SNAPSHOT.jar /
