export type InvoiceStatus="Paid"|"Unpaid"|"Rejected";
export const invoices=[
 {id:"Inv 001",title:"Invoice for UI design",company:"Apple Inc.",amount:1140,date:"28 Dec 2022",status:"Paid" as InvoiceStatus,email:"marketing@apple.com"},
 {id:"Inv 002",title:"Invoice for product page design",company:"Amazon Inc.",amount:4540,date:"18 May 2022",status:"Unpaid" as InvoiceStatus,email:"billing@amazon.com"},
 {id:"Inv 003",title:"Invoice for cloud service",company:"Dropbox Inc.",amount:10550,date:"20 Dec 2022",status:"Unpaid" as InvoiceStatus,email:"finance@dropbox.com"},
 {id:"Inv 004",title:"Invoice for product design",company:"Apple Inc.",amount:1810,date:"02 Sep 2022",status:"Paid" as InvoiceStatus,email:"marketing@apple.com"},
 {id:"Inv 005",title:"Invoice for video production",company:"Youtube Inc.",amount:25530,date:"05 Oct 2022",status:"Rejected" as InvoiceStatus,email:"billing@youtube.com"},
 {id:"Inv 006",title:"Invoice for promo action",company:"Spotify Inc.",amount:5950,date:"13 Jun 2022",status:"Paid" as InvoiceStatus,email:"finance@spotify.com"},
];
export const money=(value:number)=>`$${value.toLocaleString("en-US",{minimumFractionDigits:2})}`;
