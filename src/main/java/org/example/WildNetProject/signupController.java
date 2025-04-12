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
import java.sql.*;

public class signupController extends java.awt.Component {
            databaseConnection Instance=databaseConnection.getInstance();
            Connection conn=Instance.getConnection();
            @FXML
            private TextField username;
            @FXML
            private TextField email;
            @FXML
            private TextField pass1;
            @FXML
            private TextField passagain;

            private Stage stage;
            private Scene scene;

            private Parent root;

            private String name;
            private String mail;
            private String password1;

            private String password2;



            public void goToLogin(ActionEvent event){
                try {
                    root = FXMLLoader.load(getClass().getResource("login.fxml"));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                scene = new Scene(root);
                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                stage.setResizable(false);
                stage.setScene(scene);

            }

            public void signup(ActionEvent event){
                    int test=0;
                   name=username.getText().isEmpty() ? null : username.getText();
                   mail=email.getText().isEmpty() ? null : email.getText();
                   password1=pass1.getText().isEmpty() ? null : pass1.getText();
                   password2=passagain.getText().isEmpty() ? null : passagain.getText();;
                   if(name !=null && mail !=null && password1 !=null && password2 !=null){
                       if(password1.equals(password2)){
                           try {
                               Statement str = conn.createStatement();
                               ResultSet rs1 = str.executeQuery("Select * From userdetails");
                               while (rs1.next()) {
                                   if (name.equals(rs1.getString(1))) {
                                       JOptionPane.showMessageDialog(this, "This Username Already Taken!", "ERROR!", JOptionPane.ERROR_MESSAGE);
                                       test = 1;
                                   } else if (mail.equals(rs1.getString(2))) {
                                       JOptionPane.showMessageDialog(this, "This Email Already Registered in the System!", "ERROR!", JOptionPane.ERROR_MESSAGE);
                                       test = 1;
                                   }
                               }
                               if (test == 0) {
                                   PreparedStatement pr = conn.prepareStatement("insert into userdetails(name,email,password) values(?,?,?)");
                                   pr.setString(1, name);
                                   pr.setString(2, mail);
                                   pr.setString(3, password1);
                                   pr.executeUpdate();
                                   pr.close();
                                   PreparedStatement pr1= conn.prepareStatement("insert into userprof values(?,?)");
                                   pr1.setString(1,name);
                                   pr1.setString(2,null);
                                   pr1.executeUpdate();
                                   pr1.close();

                                   JOptionPane.showMessageDialog(this, "Signup Successful", "CONGRATULATIONS!", JOptionPane.PLAIN_MESSAGE);
                                   goToLogin(event);
                               }
                           } catch (SQLException e) {
                               throw new RuntimeException(e);
                           }
                       }

                       else{
                           JOptionPane.showMessageDialog(this,"Passwords Doesn't Match","ERROR!",JOptionPane.ERROR_MESSAGE);
                       }
                   }
                  else{
                      JOptionPane.showMessageDialog(this,"Fields Cannot Be Empty!","ERROR!",JOptionPane.ERROR_MESSAGE);
                   }
            }

}
