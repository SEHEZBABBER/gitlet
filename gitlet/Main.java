package gitlet;
import gitlet.utils.Initialise;
import gitlet.utils.Status;
import gitlet.utils.Add;

import java.io.IOException;
import java.util.ArrayList;
import gitlet.tools.Commit;
import gitlet.tools.AllBranches;
import gitlet.tools.CurrentBranchName;
import gitlet.utils.Commiting;

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
            case "branch":
                if(args.length == 1){
                    // we will be displaying all the branches here and currently active branch also
                    ArrayList<Commit> allLeaves = AllBranches.getLeavesCommit();
                    if(allLeaves.isEmpty()) System.out.println("sadf");
                    for(Commit commits : allLeaves){
                        System.out.println(commits.getBranch_name());
                        if(CurrentBranchName.getBranchName().equals(commits.getBranch_name()))System.out.println(commits.getBranch_name()+"*");
                        else System.out.println(commits.getBranch_name());
                    }
                }
                else if(args.length>2){
                    System.out.println("Bad argumnent ");
                }
                else{
                    String Bname = args[1];
                    // check if the name exists
                    ArrayList<Commit> allLeaves = AllBranches.getLeavesCommit();
                    for(Commit commits : allLeaves){
                        if(Bname.equals(commits.getBranch_name())) {
                            System.out.println("branch with this name exists");
                            System.exit(0);
                        }
                    }
                    CurrentBranchName.setBranchName(Bname);
                }
                break;
            case "commit":
                if(args.length == 1){
                    System.out.println("Please Enter a Message");
                    System.exit(0);
                }
                else{
                    String message = "";
                    for(int i = 1;i< args.length;i++){
                        message += args[i];
                    }
                    Commiting.commit(message);
                }
                break;
            default:
                System.out.println("Please Enter a valid command");
        }
    }
}
