import { useState} from "react";
import {
  InputState,
  initialState,
  employeeRates,
  employerData,
  RatesType,
  Mapping,
  multiplier,
  mult,
  directorRates,
  AnnualDirectorData,
  DirRates,
  directorRatesByCategory,
  AnnualDirectorDataByCategory

} from "./variables";
import {
  OutputTable
} from "./table";
import {
  Select,
  TextField,
  Paper,
  Switch,
  FormLabel,
  FormControl,
  MenuItem,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Box,Fade

  
} from "@mui/material";
import "../App.css";




export const perc = (original:number):string=>{
  return (original*100).toFixed(2)+"%"
}

export const NationalInsurance = (): JSX.Element => {

 
  const [inputState, setInputState] = useState<InputState>(initialState);
 
  const [director,setDirector] = useState<boolean>(false);

  const dir = window.innerWidth <720 ? "column":"row"
  
  return (
    <Paper
      className="myinput"
      style={{
        width: dir=="column"?"75%":"660px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "20px",
        marginTop: "20px",
        background: "#F2F2F7",
      }}
    >
      {/* //"#F2F2F7" */}
      

    <Box style={{display:"flex",flexDirection:dir,justifyContent:"flex-start","width":"100%"}}>
      <FormControl size="small" style={{marginTop: "16px",marginLeft:"2px",width:"100%"}}>
        <InputLabel size="small" style={{fontWeight: "bold", color: "black"}}>
          Pay period
        </InputLabel>
        <Select
          size="small"
          label="Pay period"
          style={{background: "white","width":"100%"}}
          value={inputState.payPeriod}
          input={<OutlinedInput label="Pay period" />}
          onChange={e => {
            inputState.payPeriod = e.target.value as string;
            setInputState({...inputState});
          }}
        >
          <MenuItem value="annually">Annually</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Gross pay"
        size="small"
        type="number"
        
        style={{marginTop: "15px", background: "white","width":"100%",marginLeft:dir=="column"?"0px":"10px"}}
        InputLabelProps={{
          shrink: true,
          style: {color: "black", fontWeight: "bold"},
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
          inputProps: {min: 0,step:"0.01"},
        
          
          
          
        }}
        onChange={e => {
          inputState.pay = parseFloat(e.target.value);
          setInputState({...inputState});
        }}
        value={inputState.pay}
      />
      <FormControl style={{marginTop: "15px","width":"100%",marginLeft:dir=="column"?"0px":"10px"}}>
        <InputLabel style={{color: "black", fontWeight: "bold",marginLeft:"0px"}}>
          Select NICs Category
        </InputLabel>
        <Select
        size="small"
          inputProps={{}}
          input={<OutlinedInput label="Select NICs Category" style={{marginLeft:"10px"}} />}
          value={inputState.category}
          style={{background: "white","width":"100%"}}
          onChange={e => {
            inputState.category = e.target.value;
            setInputState({...inputState});
          }}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="F">F</MenuItem>
          <MenuItem value="H">H</MenuItem>
          <MenuItem value="I">I</MenuItem>
          <MenuItem value="J">J</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="V">V</MenuItem>
          <MenuItem value="Z">Z</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{marginTop: "15px","width":"100%",marginLeft:dir=="column"?"0px":"10px"}}>
        <InputLabel style={{color: "black", fontWeight: "bold",marginLeft:"0px"}} >
          Calculation method
        </InputLabel>
        <Select
        disabled={!director}
        size="small"
          inputProps={{}}
          input={<OutlinedInput label="Select NICs Category" style={{marginLeft:"10px"}} />}
          value={inputState.calculationType}
          style={{background: "white","width":"100%"}}
          onChange={e => {
            inputState.calculationType = e.target.value;
            setInputState({...inputState});
          }}
        >
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="alternative">Alternative</MenuItem>
          
          {/* <MenuItem value="alternative">Alternative</MenuItem> */}
          
        </Select>
      </FormControl>
      </Box>
             <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
       <Box style={{textAlign:"center",width:"100%",marginTop:"20px"}}>       
      <FormLabel style={{ color: "black",marginLeft:"10px",textDecoration:"none"}}>
      Company Director
        </FormLabel>
        <Switch
          onChange={e => {
            
            setDirector(!director)
                      
          }}
          value={director}
        />
        </Box>

        </Box>
      <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
      <p style={{textDecoration: "none", fontWeight: "bold"}}>
      {director? "Director's NIC":"Employee's monthly NIC"}: {director? currencyFormat(calculateAnnualDirectorEmployeeNic(inputState.pay* multiplier[inputState.payPeriod as keyof mult],directorRatesByCategory[inputState.category as keyof AnnualDirectorDataByCategory] as AnnualDirectorData)) : currencyFormat(calculateNI(inputState.pay * multiplier[inputState.payPeriod as keyof mult],inputState.category,employeeRates,director))}
     
        
      </p>
    <p style={{textDecoration: "none", fontWeight: "bold"}}>
    {director? "Company's NIC":"Employer's monthly NIC"}: {director ? currencyFormat(calculateAnnualCompanyNic(inputState.pay * multiplier[inputState.payPeriod as keyof mult]*12,directorRatesByCategory[inputState.category as keyof AnnualDirectorDataByCategory] as AnnualDirectorData )) : currencyFormat(calculateNI(inputState.pay * multiplier[inputState.payPeriod as keyof mult],inputState.category,employerData,director))}
    </p>

    </Box>

      
        {/* <Fade in={director} unmountOnExit> */}
        <Box style={{display:"flex",flexDirection:"row",marginTop:"20px"}}>       
        <OutputTable  director={director} pay={inputState.pay * multiplier[inputState.payPeriod as keyof mult]} calculationType={inputState.calculationType} category = {inputState.category}/>
        </Box>
        {/* </Fade> */}
      
        
   
    
    </Paper>
  );
};
export const currencyFormat = (num: number): string => {
  if (num<0) {
    return "-£"+(-num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")).toString()
  } 
  return "£"+num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const roundUpAll = (original: number): number => {
  const tempOr = original.toString();

  let value;
  if (tempOr.indexOf(".") === -1) return original;
  else {
    value = tempOr + "00";
  }
  let up = false;
  for (let i = value.indexOf(".") + 3; i < value.length; i++) {
    const d = value.charAt(i);
    if (d !== "0") {
      up = true;
      break;
    }
  }
  const digits = value.split(".")[1];
  if (up && digits[1] === "9" && digits[0] === "9") {
    return Math.round(original);
  } else if (up && digits[1] === "9") {
    return parseFloat(value.split(".")[0] + "." + (parseInt(digits[0]) + 1).toString());
  } else if (up) {
    return parseFloat(value.split(".")[0] +"." + digits[0] +  (parseInt(digits[1]) + 1).toString());
  } else {
    return original;
  }
};
export const calculateNI = (
  pay: number,
  category: string,
  rates: RatesType,    
  director:boolean,
  month?:string
) => {
  let data = rates.thirdPeriod;
 
  
    switch(month) {
    case "Apr-22":
      data  = rates.firstPeriod
      break;
    case "May-22":
      data  = rates.firstPeriod
      break;
    case "Jun-22":
      data  = rates.firstPeriod
      break;
    case "Jul-22":
      data  = rates.secondPeriod
      break;
    case "Aug-22":
      data  = rates.secondPeriod
      break;
    case "Sep-22":
      data  = rates.secondPeriod
      break;
    case "Oct-22":
      data  = rates.secondPeriod
      break;
    case "Nov-22":
      data  = rates.thirdPeriod
      break;
    case "Dec-22":
      data  = rates.thirdPeriod
      break;
    case "Jan-23":
      data  = rates.thirdPeriod
      break;
    case "Feb-23":
      data  = rates.thirdPeriod
      break;
    case "Mar-23":
      data  = rates.thirdPeriod
      break;
    default:
      data = rates.thirdPeriod


    }
  
  
  
  let tot = 0;
  for (let i = 0; i < data.length; i++) {
      const start: number = data[i].start;   
      const end: number = data[i].end; 
      const taxable:number = Math.max(Math.min(end, pay) - start, 0);
      const contribution = taxable * data[i].categories[category as keyof Mapping];
      tot += contribution;   
  }
 
  return roundUpAll(tot);
};
export const calculateAnnualDirectorEmployeeNic = (pay:number,rates:AnnualDirectorData) => {
  let employee_amount = 0;
  
  let totPay = pay;

  for (let i=0;i < 7;i++) {
    const res = calculateDirectorNic(totPay,rates,"first_period",employee_amount)
    employee_amount+=res
    
    totPay+=pay
  }
  for (let i=0;i < 5;i++) {
    const res = calculateDirectorNic(totPay,rates,"second_period",employee_amount)
    employee_amount+=res    
    totPay+=pay
  }
  return employee_amount
}
export const calculateDirectorNic = (totPay:number, rates:AnnualDirectorData,period:string,totPaid:number) => {

  const between_pay_uel = Math.max(totPay-rates.upper_earning_limit,0)
  const between_pay_pt =  Math.max(totPay-rates.primary_threshold - between_pay_uel,0)  
  let employee_amount = between_pay_uel * rates["rates"][period as keyof DirRates].upper_earning_limit + between_pay_pt *  rates["rates"][period as keyof DirRates].primary_threshold  

  
  return (employee_amount-totPaid);

}




export const calculateAnnualCompanyNic = (totPay:number,rates:AnnualDirectorData) => {
  const between_pay_st = Math.max((totPay - rates.secondary_threshold),0) * rates.rates.second_period.secondary_threshold   
  return between_pay_st
}

export const calculateCompanyDirNic = (totPay:number, rates:AnnualDirectorData,period:string,totPaid:number) => {
  const between_pay_st = Math.max((totPay - rates.secondary_threshold),0) 
  let comp_amount = between_pay_st * rates.rates[period as keyof DirRates].secondary_threshold   

  return (comp_amount - totPaid)


}

