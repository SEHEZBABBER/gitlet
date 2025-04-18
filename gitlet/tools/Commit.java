package gitlet.tools;

import java.util.ArrayList;
import java.util.UUID;

import gitlet.tools.CurrentBranchName;
import tools.AllBranches;
public class Commit {
    private String Message;


    private String id;
    private String branch_name;
    // file array
    private ArrayList<byte[]> files = new ArrayList<byte[]>();
    private ArrayList<Commit> parents = new ArrayList<Commit>();
    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public ArrayList<byte[]> getFiles() {
        return files;
    }

    public void setFiles(ArrayList<byte[]> files) {
        this.files = files;
    }

    public ArrayList<Commit> getParents() {
        return parents;
    }

    public void setParents(ArrayList<Commit> parents) {
        this.parents = parents;
    }

    // parents array

    // initialising parameters

    Commit() {
        this.id = UUID.randomUUID().toString();
        this.branch_name = CurrentBranchName.getBranchName();
        ArrayList<Commit> allLeaves = AllBranches.getLeavesCommit();
        this.files = null;
        if(allLeaves.isEmpty()){
            this.parents = null;
        }
        else {
            for (Commit commits : allLeaves) {
                if (commits.getBranch_name().equals(CurrentBranchName.getBranchName())) {
                    parents.add(commits);
                    break;
                }
            }
        }
    }
}
