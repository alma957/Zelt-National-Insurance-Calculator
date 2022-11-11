import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

import {currencyFormat,calculateNI} from "./nationalInsurance"
import { mult, multiplier,employeeRates,employerData} from "./variables"
export const OutputTable = ({pay,category}:any): JSX.Element => {
 
   
  
   
    const rows:Array<any> = []
    
   // Employer NI contribution: £{currencyFormat(calculateNI(inputState.pay * multiplier[inputState.payPeriod as keyof mult],inputState.category,employerData))}
    const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Total"]
    console.log("test ",calculateNI(pay,category,employeeRates,"Apr"))
    for (let i=0;i<months.length-1;i++) {       
            rows.push({"employee":calculateNI(pay,category,employeeRates,months[i]), "employer":calculateNI(pay,category,employerData,months[i])})
    }
    rows.push({"employee":rows.reduce((a,b)=>a+b["employee"],0),"employer":rows.reduce((a,b)=>a+b["employer"],0)})
    
    return (
        
       
        <TableContainer  component={Paper} style={{width:"60%",marginLeft:"120px"}}>
        <Table size="small" >
             <TableHead>
            <TableRow >
            <TableCell  style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Month</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Employee deductions</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Employer contributions</TableCell> 
            
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow key={Math.random()*Math.random()*Math.random()}
            style={{width:'70%'}}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold",fontSize:"small" } }}
            >
      
              <TableCell style={{width:'25%', fontSize:ind===12?"normal": "x-small"}} align="left">{months[ind]}</TableCell>
              <TableCell style={{width:'37.5%',fontSize:ind===12?"normal": "x-small"}} align="left">£{currencyFormat((rows[ind])["employee"]) as string}</TableCell>
              <TableCell style={{width:'37.5%',fontSize:ind===12?"normal": "x-small"}} align="left">£{currencyFormat((rows[ind]["employer"])) as string}</TableCell>
              
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}
