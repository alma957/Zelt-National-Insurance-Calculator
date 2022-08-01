import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import {BreakdownTable} from "./nationalInsurance"
export const OutputTable = ({result}:any): JSX.Element => {

    const res = result as BreakdownTable


    const rows = []
    if(res===undefined|| res===null)
        return <></>
    for (let i=0;i<res.income.length;i++) {       
            rows.push({"incomeBand":res.incomeBand[i], "income":res.income[i],"rate":res.rate[i],"contribution":res.contr[i]})
    }

    
    return (
        
       
        <TableContainer  component={Paper} >
        <Table size="small">
             <TableHead>
            <TableRow>
            <TableCell style={{fontWeight:"bold"}} align="left">Income Band</TableCell> 
            <TableCell style={{fontWeight:"bold"}} align="left">Taxable Income</TableCell> 
            <TableCell style={{fontWeight:"bold"}} align="left">Rate</TableCell> 
            <TableCell  style={{fontWeight:"bold"}} align="left">Contribution&nbsp;</TableCell> 
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow
        
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold" } }}
            >
      
              <TableCell align="left">{row!.incomeBand! as string }</TableCell>
              <TableCell align="left">{row!.income?.toString()! as string}</TableCell>
              <TableCell align="left">{row!.rate?.toString() as string}</TableCell>
              <TableCell align="left">{row!.contribution!.toString() as string}</TableCell>
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}