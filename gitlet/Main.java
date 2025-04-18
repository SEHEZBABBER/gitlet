package gitlet;
import gitlet.utils.Initialise;
import gitlet.utils.Status;
import gitlet.utils.Add;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String inp = args[0];
        switch (inp){
            case "init":
                Initialise.init();
                break;
            case "status":
                Status.getStatus();
                break;
            case "add":
                if (args.length != 2) {
                    System.out.println("Bad Argument: Filename missing for 'add' command");
                    return;
                }
                Add.add(args[1]);
                break;
            default:
                System.out.println("Please Enter a valid command");
        }
    }
}
