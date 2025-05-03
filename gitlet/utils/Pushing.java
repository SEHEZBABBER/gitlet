package gitlet.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Pushing {
    public static void push(String repoId) {
        File gitlet = new File("./.gitlet");
        if (!gitlet.exists()) {
            System.out.println("❌ Please initialize a repo here first.");
            return;
        }

        File gitletCommits = new File("./.gitlet/commits/commit_tree.ser");
        if (!gitletCommits.exists()) {
            System.out.println("❌ Please add a commit here first.");
            return;
        }

        // Use the MongoDB Atlas connection string
        String atlasUri = "mongodb+srv://Sehez3010:SHER1005@<cluster-name>.mongodb.net/GitletClone?retryWrites=true&w=majority";
        try (MongoClient client = MongoClients.create(atlasUri)) {
            MongoDatabase db = client.getDatabase("gitlet-db");

            boolean exists = db.getCollection("repo").find(new Document("_id", repoId)).iterator().hasNext();
            if (!exists) {
                System.out.println("❌ Repo ID does not exist in MongoDB.");
                return;
            }

            // Deserialize and convert to JSON
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(gitletCommits))) {
                Object obj = ois.readObject();

                // Convert to JSON
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
                System.out.println("✅ Commit JSON:");
                System.out.println(json);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}