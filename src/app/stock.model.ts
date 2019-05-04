export class Stock{

    public symbol: string;
    public companyName:string;
    public exchange :string;
    public industry:string;
    public website:string;
    public description:string;
    public CEO:string;
    public issueType:string;
    public sector:string;
    public icon:string;
    public opening: number;
    public closing: number;
    public change: number;
    public current: number;
    public changePercent:number;
    
constructor(symbol: string,companyName:string, exchange :string,industry:string,
website:string,description:string,CEO:string,issueType:string,sector:string,icon:string, opening:number,closing:number, change:number,current:number,
changePercent:number){

    this.symbol = symbol;
    this.companyName = companyName;
    this.exchange = exchange;
    this.industry = industry;
    this.website = website;
    this.description = description;
    this.CEO  = CEO;
    this.issueType = issueType;
    this.sector = sector;
    this.icon = icon;
    this.opening = opening;
    this.closing = closing;
    this.change = change;
    this.current = current;
    this.changePercent = changePercent;
}
}