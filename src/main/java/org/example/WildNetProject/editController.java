package org.example.WildNetProject;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.Dialog;
import javafx.scene.control.TextField;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;
import java.util.ResourceBundle;

public class editController extends Component implements Initializable{
    @FXML
    private TextField name1;
    @FXML
    private TextField email1;
    @FXML
    private DialogPane pane1;

    @FXML
    private DatePicker dobDatePicker;
    private static String pass;
    private static String name2;

    public static void setName2(String name) {
        editController.name2 = name;
    }

    public static void setPass(String pass) {
        editController.pass = pass;
    }

    public TextField getName1() {
        return name1;
    }

    public TextField getEmail1() {
        return email1;
    }

    public DatePicker getDobDatePicker() {
        return dobDatePicker;
    }

    public DialogPane getPane1() {

        return pane1;
    }



    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }

    public void changePass(){
        databaseConnection Instance=databaseConnection.getInstance();
        Connection conn=Instance.getConnection();
        TextInputDialog inputDialog=new TextInputDialog();
        inputDialog.setTitle("Change Password");
        inputDialog.getDialogPane().setContentText("Enter Your Password");
        Optional <String> result=inputDialog.showAndWait();
        TextField input=  inputDialog.getEditor();
        System.out.println(input.getText());
        System.out.println(pass);
        if(input.getText() !=null && input.getText().equals(pass)){
            FXMLLoader loader1=new FXMLLoader();
            loader1.setLocation(getClass().getResource("changePass.fxml"));
            try {
                DialogPane pane=loader1.load();
                usePassController controller = loader1.getController();
                Dialog<ButtonType> dialog = new Dialog<>();
                dialog.setDialogPane(controller.getPane2());
                dialog.setTitle("Change Password");
                Optional<ButtonType> check = dialog.showAndWait();
                if(check.get()==ButtonType.OK){
                    String pass1=controller.getPass1().getText().isEmpty() ? null:controller.getPass1().getText();
                    String pass2=controller.getPass2().getText().isEmpty() ? null:controller.getPass2().getText();
                    if(pass1!=null && pass2 !=null && pass1.equals(pass2)){
                        try {
                            Statement str=conn.createStatement();
                            str.executeUpdate("update userdetails set password='"+pass1+"' where name='"+name2+"'");
                            str.close();
                            pass=pass1;
                            JOptionPane.showMessageDialog(this,"Successfully Changed Password!","ALERT!",JOptionPane.INFORMATION_MESSAGE);
                        } catch (SQLException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    else{
                        JOptionPane.showMessageDialog(this,"Enter The Same Password","ALERT!",JOptionPane.ERROR_MESSAGE);
                    }
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        else{
            JOptionPane.showMessageDialog(this,"Invalid Password","CONFIRMATION!",JOptionPane.ERROR_MESSAGE);
        }
    }
}
