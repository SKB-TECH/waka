export type ProviderType = "tv" | "internet" | "mobile-money" | "flight";
export type Provider = { slug:string; name:string; type:ProviderType; color:string; initials:string; logoUrl:string; description:string };
export const congoProviders: Provider[] = [
  {slug:"canal-plus",name:"Canal+",type:"tv",color:"bg-black",initials:"CANAL+",logoUrl:"/providers/canal-plus.png",description:"Renouvellement et réabonnement TV"},
  {slug:"canalbox",name:"CanalBox",type:"internet",color:"bg-blue-600",initials:"CB",logoUrl:"/providers/canalbox.png",description:"Forfaits internet CanalBox"},
  {slug:"m-pesa",name:"M-Pesa",type:"mobile-money",color:"bg-red-600",initials:"M",logoUrl:"/providers/m-pesa.png",description:"Transfert et recharge portefeuille"},
  {slug:"airtel-money",name:"Airtel Money",type:"mobile-money",color:"bg-red-500",initials:"airtel",logoUrl:"/providers/airtel-money.png",description:"Transfert et recharge portefeuille"},
  {slug:"orange-money",name:"Orange Money",type:"mobile-money",color:"bg-orange-500",initials:"OM",logoUrl:"/providers/orange-money.png",description:"Transfert et recharge portefeuille"},
  {slug:"air-congo",name:"Air Congo",type:"flight",color:"bg-sky-700",initials:"AC",logoUrl:"/providers/air-congo.png",description:"Réservation et paiement de billets"},
  {slug:"caa",name:"CAA",type:"flight",color:"bg-blue-800",initials:"CAA",logoUrl:"/providers/caa.png",description:"Billets Compagnie Africaine d’Aviation"},
];
export const providerBySlug=(slug:string)=>congoProviders.find(p=>p.slug===slug);
