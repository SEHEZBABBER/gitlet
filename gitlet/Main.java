package gitlet;
import gitlet.utils.Initialise;
import gitlet.utils.Status;
import gitlet.utils.Add;

import java.io.IOException;
import java.util.ArrayList;
import gitlet.tools.Commit;
import tools.AllBranches;
import gitlet.tools.CurrentBranchName;

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
                    for(Commit commits : allLeaves){
                        if(CurrentBranchName.getBranchName().equals(commits.getBranch_name()))System.out.println(commits.getBranch_name()+"*");
                        else System.out.println(commits.getBranch_name());
                    }
                }
                if(args.length>2){
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
                    // to add that to allleaved you need to know how to commit
                }
            default:
                System.out.println("Please Enter a valid command");
        }
    }
}
