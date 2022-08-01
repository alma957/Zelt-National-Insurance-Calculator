import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import {BreakdownTable,currencyFormat} from "./nationalInsurance"
export const OutputTable = ({result}:any): JSX.Element => {
   
    const res = result as BreakdownTable

   

    const rows = []
    if(res===undefined)
        return <></>
    for (let i=0;i<res.income.length;i++) {       
            rows.push({"income":res.income[i]?res.income[i]:null,"rate":res.rate[i]?res.rate[i]:null,"contribution":res.contr[i]?res.contr[i]:null})
    }

      
    
    return (
        
       
        <TableContainer  component={Paper} >
        <Table size="small">
             <TableHead>
            <TableRow>
            <TableCell style={{fontWeight:"bold"}} align="left">Income</TableCell> 
            <TableCell style={{fontWeight:"bold"}} align="left">Rate</TableCell> 
            <TableCell  style={{fontWeight:"bold"}} align="left">Contribution&nbsp;</TableCell> 
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow
            key={row.income}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold" } }}
            >
      
              <TableCell align="left">{row!.income! as string}</TableCell>
              <TableCell align="left">{row!.rate as string}</TableCell>
              <TableCell align="left">{row!.contribution! as string}</TableCell>
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}