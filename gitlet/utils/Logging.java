package gitlet.utils;
import gitlet.tools.CurrentBranchName;
import gitlet.tools.Commit;
import gitlet.tools.AllBranches;

import java.util.ArrayList;

public class Logging {
    public static void log(){
        String Bname = CurrentBranchName.getBranchName();
        ArrayList<Commit> alleaves = AllBranches.getLeavesCommit();
        Commit temp = null;
        for(Commit commit : alleaves){
            if(commit.getBranch_name().equals(Bname)){
                temp = commit;
                break;
            }
        }
        while(temp!=null){
            System.out.println("*********************************");
            System.out.println(temp.getId());
            System.out.println(temp.getMessage());
            System.out.println(temp.getBranch_name());
            System.out.println(temp.getNames());

            if(temp.getParents() != null && !temp.getParents().isEmpty())temp = temp.getParents().get(0);
            else break;
        }
    }
}
