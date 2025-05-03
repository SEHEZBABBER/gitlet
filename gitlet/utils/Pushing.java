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
import org.bson.types.ObjectId;

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

        // MongoDB Atlas URI
        String atlasUri = "mongodb+srv://Sehez3010:SHER1005@zoomclone.fswdm.mongodb.net/GitletClone?retryWrites=true&w=majority&appName=ZoomClone";

        try (MongoClient client = MongoClients.create(atlasUri)) {
            MongoDatabase db = client.getDatabase("GitletClone");
            MongoCollection<Document> collection = db.getCollection("repos");

            ObjectId repoObjectId = new ObjectId(repoId);

            // Check if repo exists
            boolean exists = collection.find(new Document("_id", repoObjectId)).iterator().hasNext();
            if (!exists) {
                System.out.println("❌ Repo ID does not exist in MongoDB.");
                return;
            }

            // Deserialize and convert to JSON
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(gitletCommits))) {
                Object obj = ois.readObject();

                // Convert to JSON string
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
                System.out.println("✅ Commit JSON:");
                System.out.println(json);

                // Prepare BSON document
                Document commitFileDoc = new Document()
                        .append("filename", "commit_tree.json")
                        .append("contentType", "application/json")
                        .append("data", json);

                // Update the repo document with commitFile
                collection.updateOne(
                        new Document("_id", repoObjectId),
                        new Document("$set", new Document("commitFile", commitFileDoc))
                );

                System.out.println("✅ Commit JSON successfully pushed to MongoDB.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
