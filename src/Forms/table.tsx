import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import {BreakdownTable,currencyFormat,roundUpAll,perc} from "./nationalInsurance"
export const OutputTable = ({result,emp}:any): JSX.Element => {
  console.log("emp ",emp )
    const res = result as BreakdownTable
  
    emp = emp as boolean
    const rows = []
    console.log("emp ",emp )
    if(res===undefined|| res===null)
        return <></>
    for (let i=0;i<res.income.length;i++) {       
            rows.push({"incomeBand":res.incomeBand[i], "income":res.income[i],"rate":res.rate[i],"contribution":res.contr[i]})
    }

    
    return (
        
       
        <TableContainer  component={Paper} >
        <Table size="small">
             <TableHead>
            <TableRow style={{width:'90%'}} >
            <TableCell  style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Band</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Income</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">Rate</TableCell> 
            <TableCell  style={{fontWeight:"bold",fontSize:"x-small"}} align="left">{emp ?"Contribution" : "Deduction"}</TableCell> 
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow
            style={{width:'70%'}}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold",fontSize:"small" } }}
            >
      
              <TableCell style={{width:'90%', fontSize:row.incomeBand==="Total"?"normal": "x-small"}} align="left">{typeof row.incomeBand==="string" ? row.incomeBand: ((row!.incomeBand as {start:number;end:number}).start!).toString()+"<x<="+ (row!.incomeBand as  {start:number;end:number}).end!.toString() as any }</TableCell>
              <TableCell style={{width:'90%',fontSize:row.incomeBand==="Total"?"normal": "x-small"}} align="left">{currencyFormat(roundUpAll(row!.income!)) as string}</TableCell>
              <TableCell style={{width:'90%',fontSize:row.incomeBand==="Total"?"normal": "x-small"}} align="left">{perc(row!.rate as number) as string}</TableCell>
              <TableCell style={{width:'90%',fontSize:row.incomeBand==="Total"?"normal": "x-small"}} align="left">{currencyFormat(roundUpAll(row!.contribution as number)) as string}</TableCell>
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}