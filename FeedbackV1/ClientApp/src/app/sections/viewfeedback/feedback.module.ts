export class Feedback {

    public id: string;
    // tslint:disable-next-line:variable-name
    public feeD_ID: string;
    public commSkills: number;
    public productivity: number;
    public punctuality: number;
    public workQuality: number;
    // tslint:disable-next-line:variable-name
    public iD_receiver: string;
    public comments: string;
    public pending?: boolean;
      // tslint:disable-next-line:variable-name
      public iD_Manager?: string;

    constructor(id: string, feed: string, commskils: number, prod: number,
                // tslint:disable-next-line:variable-name
                punct: number, work: number, id_manag: string, id_rec: string,
                pend: boolean, comments: string) {

            this.id = id;
            this.feeD_ID = feed;
            this.commSkills = commskils;
            this.productivity = prod;
            this.punctuality = punct;
            this.workQuality = work;
            this.iD_Manager = id_manag;
            this.iD_receiver = id_rec;
            this.pending = pend;
            this.comments = comments;
        }
}
