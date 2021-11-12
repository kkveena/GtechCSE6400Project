How to Build and run the app:
*   Pre-reqs:
    * Maven 3.x (or latest, 3.8.1)
        * From https://maven.apache.org/download.cgi
    * Java 8 (OpenJdk1.8)
        * From https://openjdk.java.net/install/
    * MySql 5.6.40 (or later)
        * From https://downloads.mysql.com/archives/community/
        * Setup schema `willmart_schema` via `Phase_3/team041_p2_schema.sql`
*   Build:
    * cd into `Phase_3/webapp`
    * Exec `mvn package`
        * Alternatively do `docker run -it --rm --name my-maven-project -v "$(pwd)":/usr/src/mymaven -w /usr/src/mymaven maven:3.8.1-openjdk-8 mvn clean package`
*   Run:
    * cd into `Phase_3/webapp`
    * Exec `java -jar target/webapp-0.0.1-SNAPSHOT.jar`
    * TryIt `wget http://localhost:8080/report9?subTask=0`