package org.example.WildNetProject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class databaseConnection {
    private static databaseConnection instance=null;
    private Connection connection;

    private databaseConnection() {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                connection = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/wildnet", "root", "SPAxim1@");
                System.out.println("Connection Successfully");

            } catch (ClassNotFoundException | SQLException e) {
            }
        }


        public static databaseConnection getInstance(){
            if(instance == null){
                instance= new databaseConnection();
                return instance;
            }
            return instance;
        }

        public Connection getConnection(){
            return connection;
        }




}
