package gitlet.tools;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import gitlet.tools.Encode;

public class StagingStore {
    private static Map<String,String> staged_file = new HashMap<String,String>();
    public static Map<String, String> getStaged_file() {
        return staged_file;
    }

    public static void setStaged_file(String fileName) throws IOException {
        Path workingDir = Paths.get(System.getProperty("user.dir"));
        Path source = workingDir.resolve(fileName);
        byte[] content = Files.readAllBytes(source);
        String id = Encode.sha1(content);
        staged_file.put(fileName,id);

    }
    public static boolean isstaged(String fileName){
        if(staged_file.isEmpty())return false;
        System.out.println(staged_file.containsKey(fileName));
        return staged_file.containsKey(fileName);
    }
}
