import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import {currencyFormat,roundUpAll,perc} from "./nationalInsurance"
import {Mapping, RatesType,BreakdownTable, mult, multiplier,employeeRates,employerData} from "./variables"
export const OutputTable = ({period,amount,category}:any): JSX.Element => {
 
    const payPeriod = period
    const pay = amount * multiplier[payPeriod as keyof mult];
   
    const rows:Array<any> = []
    

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Total"]
    for (let i=0;i<months.length-1;i++) {       
            rows.push({"employee":calculateNI(pay,category,employeeRates,false,false,months[i]), "employer":calculateNI(pay,category,employerData,false,true,months[i])})
    }
    rows.push({"employee":rows.reduce((a,b)=>a+b["employee"],0),"employer":rows.reduce((a,b)=>a+b["employer"],0)})
    
    return (
        
       
        <TableContainer  component={Paper} style={{width:"60%",marginLeft:"120px"}}>
        <Table size="small" >
             <TableHead>
            <TableRow >
            <TableCell  style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Month</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Employer NIC</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Employee NIC</TableCell> 
            
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow key={Math.random()*Math.random()*Math.random()}
            style={{width:'70%'}}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold",fontSize:"small" } }}
            >
      
              <TableCell style={{width:'33%', fontSize:ind===12?"normal": "x-small"}} align="left">{months[ind]}</TableCell>
              <TableCell style={{width:'33%',fontSize:ind===12?"normal": "x-small"}} align="left">{currencyFormat((rows[ind])["employer"]) as string}</TableCell>
              <TableCell style={{width:'33%',fontSize:ind===12?"normal": "x-small"}} align="left">{currencyFormat((rows[ind]["employee"])) as string}</TableCell>
              
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}
const calculateNI = (
  pay: number,
  category: string,
  rates: RatesType,
  before: boolean,
  boss:boolean,
  month?:string
) => {
  let data:any
  let ind = 0
  
  switch(month) {

    case "Apr":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "May":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Jun":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Jul":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Aug":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Sep":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Oct":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      break;
    case "Nov":
      data  = JSON.parse(JSON.stringify(rates["after"]))
     
      for (let el of data) {
       
        const cat = el.categories
        for (let key in cat){
         let r =  data[ind].categories[key as keyof Mapping]
         if (r===0.1505) {
        
          data[ind].categories[key as keyof Mapping] = 0.138
          
         } else if (r===0.1325) {
          
          
          data[ind].categories[key as keyof Mapping] = 0.12

          
         
         } else if (r===0.0325) {
          data[ind].categories[key as keyof Mapping] = 0.02
          
         }
        }
      }
      break;
    case "Dec":
      data  = JSON.parse(JSON.stringify(rates["after"]))
      for (let el of data) {

        const cat = el.categories
        for (let key in cat){
         let r =  data[ind].categories[key as keyof Mapping]
         if (r===0.1505) {
          data[ind].categories[key as keyof Mapping] = 0.138
          
         } else if (r===0.1325) {
          data[ind].categories[key as keyof Mapping] = 0.12
          
         } else if (r===0.0325) {
          data[ind].categories[key as keyof Mapping] = 0.02
          
         }
        }
      }

      break;
    default:
      
      data = rates["before"]
      console.log("hola")
  }
  
  let tot = 0;
 
  const table:BreakdownTable = {income:[],rate:[],contr:[],incomeBand:[]};
  
  
  



  (table.incomeBand as Array<{start:number;end:number}>).push({start:0,end:data[0].start})

  table.income.push((Math.max(Math.min(data[0].start, pay), 0)))
  table.rate.push(0)
  table.contr.push(0)
  let tempRate = 0

  for (let i = 0; i < data.length; i++) {
    const rate = data[i].categories[category as keyof Mapping];
    const start: number = data[i].start;
    const lastInd:number = table.incomeBand.length-1;  
      const end: number = data[i].end;

 
      const taxable:number = Math.max(Math.min(end, pay) - start, 0);
      const contribution = taxable * data[i].categories[category as keyof Mapping];
      if(data[i].categories[category as keyof Mapping]===0.1305)
        console.log("hello")
      tot += contribution;
   
    if(rate===tempRate) {
    
      (table.income as Array<number>)![lastInd]! += taxable;
   
      
      table.contr![lastInd]!+=contribution;
      (table.incomeBand as Array<{start:number;end:number}>)![lastInd]!.end = end
        
      

    } else{
      
    
    tempRate=rate    
    
    table.income.push(taxable);

      (table.incomeBand  as Array<{start:number;end:number}>).push({start:start,end:end})

    table.rate.push(rate)
    table.contr.push(contribution)
    }

    

   
  }
  const lastInd:number = table.incomeBand.length-1;  
  
  
    (table.incomeBand[lastInd] as string) = "X>="+ (table.incomeBand  as Array<{start:number;end:number}>)[lastInd]["start"].toString();
  

  table.contr.push(roundUpAll(tot));
  table.income.push(roundUpAll(pay));
  table.rate.push(tot/pay);
  ( table.incomeBand).push("Total");
 // table.incomeBand[table.incomeBand.length-2] = table.incomeBand[table.incomeBand.length-2]?.replace(/\s\<\sx\s\<\sInfinity/,"") as string 
  
  

  return roundUpAll(tot);
};
