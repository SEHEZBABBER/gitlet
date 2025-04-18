package gitlet.utils;

import java.io.File;

public class Status {
    public static void getStatus(){
        System.out.println("==========================> Staging Area <==========================");
        // file names in staging area
        File[] staged_file = new File("./.gitlet/StagingArea").listFiles();
        for(File file : staged_file){
            System.out.println(file.getName());
        }
        System.out.println("==========================> Untracked Files <==========================");
        // compute the files who are untracked
        System.out.println("==========================> Modified Files <==========================");
        // get all the files that are modified
    }
}
