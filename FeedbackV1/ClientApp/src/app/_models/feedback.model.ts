export interface Feedback {
    id: string;
    feeD_ID: string;
    commSkills: number;
    comments: string;
    iD_manager: string;
    iD_receiver: string;
    pending: boolean;
    productivity: number;
    punctuality: number;
    workQuality: number;
    timestamp: Date;
    sender?: string;
    receiver?: string;
    manager?: string;
}
