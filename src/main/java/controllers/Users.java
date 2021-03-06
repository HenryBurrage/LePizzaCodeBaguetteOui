package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.swing.*;
import javax.swing.text.html.FormSubmitEvent;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.UUID;

@Path("users/")                                      // The users/ is interpreted by the Jersey Library and turns this method into an HTTP request handler.
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Users{

    @GET
    @Path("list")
    public String UsersList() {
        System.out.println("Invoked Users.UsersList()");
        JSONArray response = new JSONArray();                   // A new JSONArray is constructed. JSON objects are made from each row of the results and these objects are added to the JSONArray.
        try {                                                   // try...catch as we are working with an external file- Error returned if there is an issue fetching the database.
            PreparedStatement ps = server.Main.db.prepareStatement("SELECT UserID, Email FROM Users");          // Prepared statements prevent the possibility of SQL injection that allows unauthorised users from using SQL statements to access all of the contents of the database.
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {                                           // Loops through the rows in the ResultSet object, similar to pseudocode, until there isn't a next row.
                JSONObject row = new JSONObject();
                row.put("UserID", results.getInt(1));
                row.put("Email", results.getString(2));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());           // Additional print statements to make debugging easier. These will appear on the server's console.
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

    @GET
    @Path("get/{UserID}")                                                              // A path parameter in the method signature is used to capture the value added to the end of the URL. It is also added to the end of the @Path annotation.
    public String GetUser(@PathParam("UserID") Integer UserID) {
        System.out.println("Invoked Users.GetUser() with UserID " + UserID);
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("SELECT Email, Token FROM Users WHERE UserID = ?");          // Prepared statement. Binds the ? with an actual
            ps.setInt(1, UserID);                                                                                            // value, UserID, before it is executed.
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();                                    // There is no need for an array as there is only one object, if no user matches the ID supplied, an empty object will be returned.
            if (results.next()== true) {
                response.put("UserID", UserID);
                response.put("Email", results.getString(1));
                response.put("Token", results.getInt(2));
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("add")
    public String UsersAdd(@FormDataParam("Email") String Email, @FormDataParam("Password") String Password, @FormDataParam("AddressLine1") String AddressLine1, @FormDataParam("AddressLine2") String AddressLine2) {         // The @FormDataParams come from the HTML form sent with the fetch(), they match the HTML form field names.
        System.out.println("Invoked Users.UsersAdd()");
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("INSERT INTO Users (Email, Password, AddressLine1, AddressLine2) VALUES (?, ?, ?, ?)");
            ps.setString(1, Email);
            ps.setString(2, Password);
            ps.setString(3, AddressLine1);
            ps.setString(4, AddressLine2);
            ps.execute();
            return "{\"OK\": \"Added user.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to create new item, please see server console for more info.\"}";
        }

    }

    @POST
    @Path("update")
    public String updateUser(@FormDataParam("UserID") Integer UserID, @FormDataParam("Email") String Email) {
        try {
            System.out.println("Invoked Users.UpdateUsers/update UserID=" + UserID);
            PreparedStatement ps = server.Main.db.prepareStatement("UPDATE Users SET Email = ? WHERE UserID = ?");
            ps.setString(1, Email);
            ps.setInt(2, UserID);
            ps.execute();
            return "{\"OK\": \"Users updated\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("delete/{UserID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteUser(@PathParam("UserID") Integer UserID) throws Exception {
        System.out.println("Invoked Users.DeleteUser()");
        if (UserID == null) {
            throw new Exception("UserID is missing in the HTTP request's URL.");
        }
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("DELETE FROM Users WHERE UserID = ?");
            ps.setInt(1, UserID);
            ps.execute();
            return "{\"OK\": \"User deleted\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("login")
    public String UsersLogin(@FormDataParam("Email") String Email, @FormDataParam("Password") String Password) {
        System.out.println("Invoked loginUser() on path users/login");
        try {
            if (Email.length() == 0){
                System.out.println("Email has been compared to null");
                return "{\"Error\": \"Nothing has been entered.\"}";
            }
            PreparedStatement ps1 = server.Main.db.prepareStatement("SELECT Password FROM Users WHERE Email = ?");
            ps1.setString(1, Email);
            ResultSet loginResults = ps1.executeQuery();
            if (loginResults.next() == true) {
                String correctPassword = loginResults.getString(1);
                if (Password.equals(correctPassword)) {
                    String Token = UUID.randomUUID().toString();
                    PreparedStatement ps2 = server.Main.db.prepareStatement("UPDATE Users SET Token = ? WHERE Email = ?");
                    ps2.setString(1, Token);
                    ps2.setString(2, Email);
                    ps2.executeUpdate();
                    JSONObject userDetails = new JSONObject();
                    userDetails.put("Email", Email);
                    userDetails.put("Token", Token);
                    return userDetails.toString();
                } else {
                    return "{\"Error\": \"Incorrect password!\"}";
                }
            } else {
                return "{\"Error\": \"Incorrect username.\"}";
            }
        } catch (Exception exception) {
            System.out.println("Database error during /users/login: " + exception.getMessage());
            return "{\"Error\": \"Server side error!\"}";
        }
    }


    @POST
    @Path("logout")
    public static String logout(@CookieParam("Token") String Token){
        try{
            System.out.println("users/logout "+ Token);
            PreparedStatement ps = server.Main.db.prepareStatement("SELECT Email FROM Users WHERE Token=?");
            ps.setString(1, Token);
            ResultSet logoutResults = ps.executeQuery();
            if (logoutResults.next()){
                int UserID = logoutResults.getInt(1);
                //Set the token to null to indicate that the user is not logged in
                PreparedStatement ps1 = server.Main.db.prepareStatement("UPDATE Users SET Token = NULL WHERE Email = ?");
                ps1.setInt(1, UserID);
                ps1.executeUpdate();
                return "{\"status\": \"OK\"}";
            } else {
                return "{\"error\": \"Invalid token!\"}";

            }
        } catch (Exception ex) {
            System.out.println("Database error during /users/logout: " + ex.getMessage());
            return "{\"error\": \"Server side error!\"}";
        }
    }






}
