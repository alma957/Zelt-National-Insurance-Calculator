import {SetStateAction, useEffect, useState} from "react";
import {
  InputState,
  initialState,
  employeeRates,
  employerData,
  RatesType,
  Mapping,
} from "./variables";
import {
  OutputTable
} from "./table";
import {
  Select,
  TextField,
  FormGroup,
  Paper,
  Switch,
  FormLabel,
  FormControl,
  MenuItem,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Fade,
  
} from "@mui/material";
import "../App.css";
import { BlockLike } from "typescript";
import { callbackify } from "util";
import { Logger } from "apify/build/utils_log";
import { Box } from "@mui/system";
const multiplier: mult = {
  annually: 1 / 12,
  monthly: 1,
  weekly: 52 / 12,
  daily: 365 / 12,
};
interface mult {
  annually: number;
  monthly: number;
  weekly: number;
  daily: number;
}
export interface BreakdownTable {
  income:Array<string|null>;
  rate:Array<string|null>;
  contr:Array<string|null>;
  incomeBand:Array<string|null>;
}

export const NationalInsurance = (): JSX.Element => {
  const result = {
    employer: 0,
    employee: 0,
    bossTable:null as any,
    empTable:null as any
  };
 
  const [inputState, setInputState] = useState<InputState>(initialState);
  const [resultState, setResultState] = useState<any>(result);
  const [displayBreakdown,setDisplayBreakdown] = useState<boolean>(false);
  const [displayBreakdown2,setDisplayBreakdown2] = useState<boolean>(false);
  useEffect(() => {
    const payPeriod = inputState.payPeriod;
    const pay = inputState.pay * multiplier[payPeriod as keyof mult];

    const category = inputState.category;
    const before = inputState.validDate ? false : true;

    resultState.employee = calculateNI(pay, category, employeeRates, before,false);
    resultState.employer = calculateNI(pay, category, employerData, before,true);


    

    
    setResultState({...resultState});
    
  }, [inputState,displayBreakdown,displayBreakdown2]);
  useEffect(()=>{

  },[])
  const calculateNI = (
    pay: number,
    category: string,
    rates: RatesType,
    before: boolean,
    boss:boolean
  ) => {
    const data = before ? rates["before"] : rates["after"];
    let tot = 0;
   
    const table:BreakdownTable = {income:[],rate:[],contr:[],incomeBand:[]}
    if(boss) {
      
      resultState.bossTable = table
    }
    else  {
     resultState.empTable = table
    }
    let tx = 0
    



    table.incomeBand.push("0 < x < "+data[0].start)
    table.income.push(currencyFormat(Math.max(Math.min(data[0].start, pay), 0)))
    table.rate.push("0%")
    table.contr.push("0")
    
    for (let i = 0; i < data.length; i++) {
      const start: number = data[i].start;
      const end: number = data[i].end;
      
      const taxable = Math.max(Math.min(end, pay) - start, 0);
      
      tx+=taxable
      tot += taxable * data[i].categories[category as keyof Mapping];
      table.income.push(currencyFormat(roundUpAll(taxable)))
      table.incomeBand.push(currencyFormat(start)+" < x < "+currencyFormat(end))
      table.rate.push(perc(data[i].categories[category as keyof Mapping]))
      table.contr.push(currencyFormat(roundUpAll(taxable * data[i].categories[category as keyof Mapping])))
     
    }
    table.contr.push(currencyFormat(roundUpAll(tot)))
    table.income.push(currencyFormat(roundUpAll(pay)))
    table.rate.push(perc(tot/pay))
    table.incomeBand.push("Total")
    table.incomeBand[table.incomeBand.length-2] = table.incomeBand[table.incomeBand.length-2]?.replace(/\s\<\sx\s\<\sInfinity/,"") as string 
    
    

    return roundUpAll(tot);
  };
  const perc = (original:number):string=>{
    return (original*100).toFixed(2)+"%"
  }
  return (
    <Paper
      className="myinput"
      style={{
        width: "90%",
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
      
      <FormGroup style={{flexDirection: "row", justifyContent: "flex-start"}}>
        <FormLabel style={{fontWeight: "bold", color: "black"}}>
          Were earnings paid before 6th July 2022?
        </FormLabel>
        <Switch
          onChange={e => {
            if (e.target.checked) {
              inputState.validDate = false;
            } else {
              inputState.validDate = true;
            }
            setInputState({...inputState});
          }}
          value={!inputState.validDate}
        />
        
      </FormGroup>{" "}
          <Box style={{display:"flex",flexDirection:"row",justifyContent:"flex-start","width":"100%"}}>
      <FormControl style={{marginTop: "16px",marginLeft:"2px",width:"100%"}}>
        <InputLabel style={{fontWeight: "bold", color: "black"}}>
          Pay period
        </InputLabel>
        <Select
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
        type="number"
        style={{marginTop: "15px", background: "white",marginLeft:"10px","width":"100%"}}
        InputLabelProps={{
          shrink: true,
          style: {color: "black", fontWeight: "bold"},
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
          inputProps: {min: 0},
        }}
        onChange={e => {
          inputState.pay = parseFloat(e.target.value);
          setInputState({...inputState});
        }}
        value={inputState.pay}
      />
      <FormControl style={{marginTop: "15px","width":"100%"}}>
        <InputLabel style={{color: "black", fontWeight: "bold"}}>
          Select NICs Category
        </InputLabel>
        <Select
          inputProps={{}}
          input={<OutlinedInput label="Select NICs Category  " />}
          value={inputState.category}
          style={{background: "white",marginLeft:"10px","width":"100%"}}
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
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="V">V</MenuItem>
          <MenuItem value="Z">Z</MenuItem>
        </Select>
      </FormControl>
      </Box>
      <p style={{textDecoration: "none", fontWeight: "bold"}}>
        Employee NI deduction: £{currencyFormat(resultState.employee)}
    
        
      </p>
      <Box>
      <FormLabel style={{ color: "black",marginLeft:"10px",textDecoration:"none"}}>
      Display breakdown
        </FormLabel>
        <Switch
          onChange={e => {
            setDisplayBreakdown(e.target.checked)
          }}
          value={displayBreakdown}
        />
         <Box style={{width:"100%"}}>
        {displayBreakdown  ? <OutputTable result={resultState.empTable}/>:<></>}
        </Box>
    </Box>
      <p style={{textDecoration: "none", fontWeight: "bold"}}>
        Employer NI contribution: £{currencyFormat(resultState.employer)}
       
      </p>
      <Box>
      <FormLabel style={{ color: "black",marginLeft:"10px",textDecoration:"none"}}>
      Display breakdown
        </FormLabel>
        <Switch
          onChange={e => {
            setDisplayBreakdown2(e.target.checked)
          }}
          value={displayBreakdown2}
        />
        <Box style={{width:"100%"}}>
        {displayBreakdown2  ? <OutputTable result={resultState.bossTable}/>:<></>}
        </Box>
          </Box>
   
    
    </Paper>
  );
};
export const currencyFormat = (num: number): string => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
