import { Dropdown } from "src/app/shared/model/dropdown";
import {Comment} from './comment';
import { Sprint } from "./sprint";

export class Issue {
    id?: string;
    subject: string | null = null;
    userName: string | null = null;
    password: string | null = null;
    steps: string | null = null;
    actualResult: string | null = null;
    expectedResult: string | null = null;
    environment: string | null = null;
    version: string | null = null;
    browser: string | null = null;
    device: string | null = null;
    system: string | null = null;
    project: Dropdown = new Dropdown();
    key: string | undefined;
    status: string | undefined;
    type: string | undefined;
    acceptance?: string;
    createdDate?: Date;
    updatedDate?: Date;
    createdBy?: string
    dev?: string;
    qa?:string;
    comments: Comment[] = [];
    startDate: Date | null = null;
    endDate: Date | null = null;
    sprint: Sprint | null = null;

    constructor() {
        
    }
}