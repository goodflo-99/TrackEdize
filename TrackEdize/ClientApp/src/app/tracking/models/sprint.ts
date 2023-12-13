import { Dropdown } from "src/app/shared/model/dropdown";
import {Comment} from './comment';

export class Sprint {
    id?: string;
    createdDate?: Date;
    updatedDate?: Date;
    startDate: Date | undefined;
    endDate: Date | undefined;
    title: string | null = null;
    description: string | null = null;
    projectId: string | null = null;
    status: string | null = null;

    constructor() {
        
    }
}