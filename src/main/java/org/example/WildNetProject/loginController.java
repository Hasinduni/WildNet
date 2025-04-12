package org.example.WildNetProject;


import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import javax.swing.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class loginController extends java.awt.Component{
            databaseConnection Instance=databaseConnection.getInstance();
            Connection conn=Instance.getConnection();
            private String name;
            private String pass;
            private String name1;
            private  String pass1;
            private Stage stage;
            private Scene scene;
            private Parent root;

            private String email;
            @FXML
            protected TextField loginusername;
            @FXML
            private TextField loginpassword;


    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName1() {
        return name1;
    }

    public void login(ActionEvent event){
                try {
                    int test=0;
                    name1=loginusername.getText().isEmpty() ? null : loginusername.getText();
                    pass1=loginpassword.getText().isEmpty() ? null : loginpassword.getText();
                    UserSettingsController.setNam1(name1);
                    dashboardController.name=name1;
                    editController.setPass(pass1);
                    editController.setName2(name1);
                    Statement str= conn.createStatement();
                    ResultSet rs=str.executeQuery("select name,password from userdetails");
                    while(rs.next()){
                        name=rs.getString(1);
                        pass= rs.getString(2);
                        if(name.equals(name1) && pass.equals(pass1)){
                            test=1;
                        }

                    }
                    if(test==1){
                        if(name1!=null && pass1 !=null){
                          try {
                               root = FXMLLoader.load(getClass().getResource("dashboard.fxml"));
                        }    catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                        scene = new Scene(root);
                        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                        stage.setResizable(false);
                        stage.setScene(scene);
                    }
                        else{
                            JOptionPane.showMessageDialog(this,"Invalid Username or Password","ERROR!",JOptionPane.ERROR_MESSAGE);

                        }
                        }
                    else{
                        JOptionPane.showMessageDialog(this,"Invalid Username or Password","ERROR!",JOptionPane.ERROR_MESSAGE);
                    }

                    str.close();
                    rs.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }

            public void gotosignup(ActionEvent event){
                try {
                    root = FXMLLoader.load(getClass().getResource("signup.fxml"));

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                scene = new Scene(root);
                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                stage.setResizable(false);
                stage.setScene(scene);
            }


            public void signup(ActionEvent event){

            }


}
