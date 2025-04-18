package gitlet.utils;

import gitlet.tools.Commit;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import gitlet.tools.AllBranches;
import gitlet.tools.CurrentBranchName;

public class Commiting {
    public static void commit(String message) {
        Commit newcommit = new Commit();
        newcommit.setMessage(message);
        File staged_files = new File("./.gitlet/StagingArea");
        if(staged_files == null){
            System.out.println("Initialise the repo first");
        }
        ArrayList<byte[]> files = new ArrayList<>();
        File[] Sfiles = staged_files.listFiles();
        for(File file : Sfiles){
            try {
                byte[] bytes = Files.readAllBytes(Path.of("./.gitlet/StagingArea/"+file.getName()));
                files.add(bytes);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        newcommit.setFiles(files);
        // commit object has been made successfully
        ArrayList<Commit> alleaves = AllBranches.getLeavesCommit();
        System.out.println(alleaves);
        if(alleaves.isEmpty()){
            // this is first commit
            alleaves.add(newcommit);
        }
        int i = 0;
        for(Commit commit : alleaves){
            if(commit.getBranch_name().equals(CurrentBranchName.getBranchName())){
                alleaves.set(i,newcommit);
                break;
            }
            i++;
        }
    }
}
