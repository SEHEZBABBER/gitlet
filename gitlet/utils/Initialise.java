package gitlet.utils;

import java.io.File;

public class Initialise {
    public static void init(){
        File hidden_gitlet = new File("./.gitlet");
        hidden_gitlet.mkdir();
    }
}
