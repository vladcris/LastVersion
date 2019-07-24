export class Feedback{

    public ID: string;
    public Feed_ID: string;
    public CommSkills: number;
    public Productivity: number;
    public Punctuality: number;
    public WorkQuality: number;
    public ID_Manager: string;
    public ID_reciver: string;
    public Pending: boolean;
    public Comments: string;

    constructor(id: string, feed: string, commskils: number, prod: number, 
        punct: number, work: number, id_manag: string, id_rec: string,
        pend: boolean, comments: string) {
            this.ID = id;
            this.Feed_ID = feed;
            this.CommSkills = commskils;
            this.Productivity = prod;
            this.Punctuality = punct;
            this.WorkQuality - work;
            this.ID_Manager = id_manag;
            this.ID_reciver = id_rec;
            this.Pending = pend;
            this.Comments = comments;
        }
}