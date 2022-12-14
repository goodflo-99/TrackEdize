import { Dropdown } from "src/app/shared/model/dropdown";
import {Comment} from './comment';

export class Issue {
    id: string | null = null;
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
    project: Dropdown | undefined = new Dropdown();
    key: string | undefined;
    status: string | undefined;
    type: string | undefined;
    acceptance?: string;

    comments: Comment[] = [];

    constructor() {
        
    }
}