export class Bug{
    id: string;
    title: string;
    priority: string;
    dateCreated: string;
    description: string; // Add description property

    constructor(bid: string, bTitle: string, bPriority: string, bDate: string, bDescription: string)
    {
        this.id = bid;
        this.title = bTitle;
        this.priority = bPriority;
        this.dateCreated = bDate;
        this.description = bDescription;
    }
}
