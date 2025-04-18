package gitlet;
import gitlet.utils.Initialise;
public class Main {
    public static void main(String[] args) {
        if(args.length == 0) System.out.println("Please enter a valid command");
        String inp = args[0];
        switch (inp){
            case "init":
                Initialise.init();
        }
    }
}
