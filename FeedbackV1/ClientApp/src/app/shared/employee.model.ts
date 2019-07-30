export class Employee {

    public DEP_ID: string;
    public ID: string;
    public Email: string;
    public Manager_Id: string;
    public Name: string;

    constructor(dep: string, id: string, email: string, manager: string, name: string){
        this.DEP_ID = dep;
        this.ID = id;
        this.Email = email;
        this.Manager_Id = manager;
        this.Name  = name;
    }
}

