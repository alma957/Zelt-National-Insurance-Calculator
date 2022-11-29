import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import {currencyFormat,calculateNI,calculateAnnualCompanyNic,calculateAnnualDirectorEmployeeNic,calculateDirectorNic,calculateCompanyDirNic} from "./nationalInsurance"
import { employeeRates,employerData,RatesType,directorRates,directorRatesByCategory,AnnualDirectorDataByCategory, AnnualDirectorData} from "./variables"
export const OutputTable = ({director,pay,category,calculationType}:any): JSX.Element => {
 
   
  
   
    const rows:Array<any> = []
    
   // Employer NI contribution: £{currencyFormat(calculateNI(inputState.pay * multiplier[inputState.payPeriod as keyof mult],inputState.category,employerData))}
    const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan-23","Feb-23","Mar-23","Total"]
if(!director) {
    for (let i=0;i<months.length-1;i++) {       
            rows.push({"employee":calculateNI(pay,category,employeeRates,false,months[i]), "employer":calculateNI(pay,category,employerData,false,months[i])})
    }
  } else {
    if (calculationType==="standard") {
    for (let i=0;i<months.length-1;i++) {   
      const emp = calculateCompanyDirNic(pay*(i+1),directorRatesByCategory[category as keyof AnnualDirectorDataByCategory] as AnnualDirectorData,i<=6?"first_period":"second_period",i>0?rows.reduce((a,b)=>a+b['employer'],0):0)    
      rows.push({"employee":calculateDirectorNic(pay*(i+1),directorRatesByCategory[category as keyof AnnualDirectorDataByCategory] as AnnualDirectorData,i<=6?"first_period":"second_period",i>0?rows.reduce((a,b)=>a+b['employee'],0):0), "employer":emp})
    }
    //rows.push({"employee":calculateAnnualDirectorEmployeeNic(pay,directorRates), "employer":calculateAnnualDirectorCompanyNic(pay*12,directorRatesByCategory[category as keyof AnnualDirectorDataByCategory] )})
  } else {
    for (let i=0;i<months.length-1;i++) {       
      rows.push({"employee":calculateAnnualDirectorEmployeeNic(pay,directorRates), "employer":calculateAnnualDirectorEmployeeNic(pay,directorRatesByCategory[category as keyof AnnualDirectorDataByCategory] )})
    }
    for (let i=0;i<months.length-1;i++) {       
      rows.push({"employee":calculateAnnualDirectorEmployeeNic(pay,directorRates), "employer":calculateAnnualDirectorEmployeeNic(pay,directorRates)})
    }
    }

  }
    rows.push({"employee":rows.reduce((a,b)=>a+b["employee"],0),"employer":rows.reduce((a,b)=>a+b["employer"],0)})
    const dir = window.innerWidth <=660 ? "column":"row"
    return (
        
       
        <TableContainer  component={Paper} style={dir=="column"?{width:"100%",marginLeft:"0px"}:{width:"60%",marginLeft:"120px"}}>
        <Table size="small" >
             <TableHead>
            <TableRow >
            <TableCell  style={{fontWeight:"bold",fontSize:"small"}} align="left">Month</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">{director? "Director's NIC":"Employee's NIC"}</TableCell> 
            <TableCell style={{fontWeight:"bold",fontSize:"x-small"}} align="left">{director? "Company's NIC":"Employer's NIC"}</TableCell> 
            
            </TableRow>
             </TableHead>
             <TableBody>
             {rows.map((row,ind) => (
            <TableRow key={Math.random()*Math.random()*Math.random()}
            style={{width:'70%'}}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor:"#D3D3D3",fontWeight:"bold",fontSize:"small" } }}
            >
      
              <TableCell style={{width:'25%', fontSize:ind===12?"normal": "small"}} align="left">{months[ind]}</TableCell>
              <TableCell style={{width:'37.5%',fontSize:ind===12?"normal": "small"}} align="left">£{currencyFormat((rows[ind])["employee"]) as string}</TableCell>
              <TableCell style={{width:'37.5%',fontSize:ind===12?"normal": "small"}} align="left">£{currencyFormat((rows[ind]["employer"])) as string}</TableCell>
              
             
            </TableRow>
          ))}
          
             </TableBody>
             </Table>
             
        </TableContainer>
  
    )
        
        

    
}
