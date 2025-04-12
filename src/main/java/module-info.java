module org.example.WildNetProject {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;
    requires java.desktop;
    requires javafx.web;

    opens org.example.WildNetProject to javafx.fxml;
    exports org.example.WildNetProject;
}