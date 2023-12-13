export class Filter {
    projectId?: string
    sprintId?: string
    searchString?: string

    constructor() { }

    public isDirty() {
        return this.projectId && this.projectId.length > 0 || this.sprintId && this.sprintId.length > 0 || this.searchString && this.searchString.length > 0;
    }
}  