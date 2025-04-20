package gitlet.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import gitlet.tools.StagingStore;



public class Add {
        public static void add(String fileName) throws IOException {
            Path workingDir = Paths.get(System.getProperty("user.dir"));
            Path stagingDir = workingDir.resolve(".gitlet/StagingArea");

            // 1. Validate file exists
            Path source = workingDir.resolve(fileName);
            if (!Files.exists(source)) {
                throw new IllegalArgumentException("File not found: " + fileName);
            }

            // 2. Ensure staging area exists
            if(!Files.exists(stagingDir)) {
                System.out.println("Repo not initialised");
            }
            // 3.check if the file is already present
            if(StagingStore.isstaged(fileName)){
                System.out.println("File Already Staged");
                System.exit(0);
            }

            // 4. check if the file is in gitlet ignore
            byte[] bytes = Files.readAllBytes(Path.of("./.gitlet/.gitletIgnore"));
            String cont = new String(bytes);
            String[] lines = cont.split("\\R");
            for(String line : lines){
                if(line.equals(fileName)){
                    System.out.println("File in gitletIgnore");
                    System.exit(0);
                }
            }
            // 5. adding in the staged map
            StagingStore.setStaged_file_file(fileName);
            Path filePath = stagingDir.resolve(fileName);

            // 6. moving the file to the required place
            byte[] content = Files.readAllBytes(source);
            Files.write(filePath,content);
            System.out.println("Staged: " + fileName);
            System.out.println(StagingStore.getStaged_file());
        }
}
