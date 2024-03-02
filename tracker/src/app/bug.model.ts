export class Bug{
    id: string;
    title: string;
    priority: string;
    dateCreated: string;
    addedBy: string;
    description: string; // Add description property

    constructor(bid: string, bTitle: string, bPriority: string, bDate: string, bName: string, bDescription: string)
    {
        this.id = bid;
        this.title = bTitle;
        this.priority = bPriority;
        this.dateCreated = bDate;
        this.addedBy = bName;
        this.description = bDescription;
    }
}
