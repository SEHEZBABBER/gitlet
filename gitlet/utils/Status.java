package gitlet.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import gitlet.tools.Encode;

import gitlet.tools.GitIgnoreSet;

public class Status {
    public static void getStatus() throws IOException {
        ArrayList<String> UntackedFiles = new ArrayList<>();
        ArrayList<String> ModifiedFiles = new ArrayList<>();
        ArrayList<String> deletedFiles = new ArrayList<>();

        File Staged = new File("./.gitlet/StagingArea");
        File[] FilesStaged = Staged.listFiles();

        File[] WorkingDir = new File(System.getProperty("user.dir")).listFiles();

        File[] LatestFiles = new File("./.gitlet/latestFiles").listFiles();


        System.out.println("==========================> Staging Area <==========================");
        if (FilesStaged != null) {
            for (File file : FilesStaged) {
                System.out.println(file.getName());
            }
        }
        System.out.println("==========================> Untracked Files <==========================");
        // files that are not in the latest commit and not in the staging Area but are in the main directory
        for(File file : WorkingDir){
            GitIgnoreSet temp = new GitIgnoreSet();
            if(temp.contains(file.getName())){
                continue;
            }
            UntackedFiles.add(file.getName());
        }
        // removing files in stagin directory
        if(FilesStaged != null) {
            for (File file : FilesStaged) {
                UntackedFiles.remove(file.getName());
            }
        }
        if(LatestFiles != null) {
            for (File file : LatestFiles) {
                UntackedFiles.remove(file.getName());
            }
        }
        if(!UntackedFiles.isEmpty()) {
            for (String name : UntackedFiles) {
                System.out.println(name);
            }
        }
        System.out.println("==========================> Modified Files <==========================");
        // get all the files that are modified
        Map<String,String> latestHash = new HashMap<String,String>();
        if(LatestFiles != null) {
            for (File file : LatestFiles) {
                String hash = Encode.sha1(file);
                latestHash.put(file.getName(), hash);
            }
        }
        Map<String,String> workingHash = new HashMap<String,String>();
        GitIgnoreSet temp = new GitIgnoreSet();
        if(WorkingDir != null) {
            for (File file : WorkingDir) {
                if(temp.contains(file.getName()))continue;
                String hash = Encode.sha1(file);
                workingHash.put(file.getName(), hash);
            }
        }
        if(latestHash != null) {
            for (String key : latestHash.keySet()) {
                if (workingHash.containsKey(key)) {
                    if (!latestHash.get(key).equals(workingHash.get(key))) ModifiedFiles.add(key);
                }
            }
        }
        for(String key : workingHash.keySet()){
            if(!latestHash.containsKey(key)) System.out.println(key);
        }
        if(!ModifiedFiles.isEmpty()) {
            for (String name : ModifiedFiles) {
                System.out.println(name);
            }
        }
        System.out.println("==========================> Deleted Files <==========================");
        // get all the files that are modified
        if(LatestFiles != null) {
            for (File file : LatestFiles) {
                deletedFiles.add(file.getName());
            }
        }
        if(WorkingDir != null) {
            for (File file : WorkingDir) {
                deletedFiles.remove(file.getName());
            }
        }
        if(!deletedFiles.isEmpty()) {
            for (String name : deletedFiles) {
                System.out.println(name);
            }
        }
    }
}
