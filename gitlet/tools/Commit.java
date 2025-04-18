package gitlet.tools;

import java.util.ArrayList;
import java.util.UUID;

import gitlet.tools.CurrentBranchName;

public class  Commit{
    private String id;
    private String branch_name;
    // file array
    private ArrayList<byte[]> files;
    private  Commit[] parents;

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

    public  Commit[] getParents() {
        return parents;
    }

    public void setParents(  Commit[] parents) {
          this.parents = parents;
    }

    // parents array

    // initialising parameters

      Commit() {
        id = UUID.randomUUID().toString();
        branch_name = CurrentBranchName.getBranchName();
    }
}
