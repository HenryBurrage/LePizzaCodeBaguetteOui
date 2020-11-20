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

@Path("toppings/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Toppings{

    @GET
    @Path("list")
    public String ToppingList() {
        System.out.println("Invoked Users.GetToppingList()");
        JSONArray response = new JSONArray();                   // A new JSONArray is constructed. JSON objects are made from each row of the results and these objects are added to the JSONArray.
        try {                                                   // try...catch as we are working with an external file- Error returned if there is an issue fetching the database.
            PreparedStatement ps = server.Main.db.prepareStatement("SELECT ToppingName, ToppingPrice FROM Toppings");          // Prepared statements prevent the possibility of SQL injection that allows unauthorised users from using SQL statements to access all of the contents of the database.
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {                                           // Loops through the rows in the ResultSet object, similar to pseudocode, until there isn't a next row.
                JSONObject row = new JSONObject();
                row.put("ToppingName", results.getString(1));
                row.put("ToppingPrice", results.getFloat(2));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());           // Additional print statements to make debugging easier. These will appear on the server's console.
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

    @GET
    @Path("get/{ToppingID}")                                                              // A path parameter in the method signature is used to capture the value added to the end of the URL. It is also added to the end of the @Path annotation.
    public String GetUser(@PathParam("ToppingID") Integer ToppingID) {
        System.out.println("Invoked Users.GetUser() with ToppingID " + ToppingID);
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("SELECT ToppingName, ToppingPrice FROM Toppings WHERE ToppingID = ?");          // Prepared statement. Binds the ? with an actual
            ps.setInt(1, ToppingID);                                                                                            // value, UserID, before it is executed.
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();                                    // There is no need for an array as there is only one object, if no user matches the ID supplied, an empty object will be returned.
            if (results.next()== true) {
                response.put("ToppingID", ToppingID);
                response.put("ToppingName", results.getString(1));
                response.put("ToppingPrice", results.getInt(2));
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }
}
