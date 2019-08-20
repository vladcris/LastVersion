export interface Feedback {
    id: string;
    feeD_ID: string;
    commSkills: number;
    comments: string;
    iD_receiver: string;
    pending: boolean;
    productivity: number;
    punctuality: number;
    workQuality: number;
    iD_manager?: string;
    timestamp: Date;
}
