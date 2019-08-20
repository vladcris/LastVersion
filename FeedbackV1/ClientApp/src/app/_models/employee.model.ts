export class Employee {

    // tslint:disable-next-line:variable-name
    public deP_ID: string;
    public id: string;
    public name: string;
    public email: string;
    // tslint:disable-next-line:variable-name
    public manager_ID: string;
    // public partitionKey: string;
    // public rowKey: string;
    // public eTag: string;
    // public timestamp: string;


    constructor(id: string, feed: string, name: string,
                email: string, manager: string, part: string, row: string, tag: string, time: string) {
            this.deP_ID = id;
            this.id = feed;
            this.name = name;
            this.email = email;
            this.manager_ID = manager;
            // this.partitionKey = part;
            // this.rowKey = row;
            // this.eTag = tag;
            // this.timestamp = time;
        }
}
