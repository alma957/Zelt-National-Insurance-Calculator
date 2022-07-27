import {useEffect, useState} from "react";
import {
  InputState,
  initialState,
  employeeRates,
  employerData,
  RatesType,
  Mapping,
} from "./variables";
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
} from "@mui/material";
import "../App.css";
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

export const NationalInsurance = (): JSX.Element => {
  const result = {
    employer: 0,
    employee: 0,
  };
  const [inputState, setInputState] = useState<InputState>(initialState);
  const [resultState, setResultState] = useState<any>(result);
  useEffect(() => {
    const payPeriod = inputState.payPeriod;
    const pay = inputState.pay * multiplier[payPeriod as keyof mult];
    const category = inputState.category;
    const before = inputState.validDate ? false : true;

    resultState.employee = calculateNI(pay, category, employeeRates, before);
    resultState.employer = calculateNI(pay, category, employerData, before);
    console.log("employees ", resultState.employee);
    setResultState({...resultState});
  }, [inputState]);
  const calculateNI = (
    pay: number,
    category: string,
    rates: RatesType,
    before: boolean
  ) => {
    const data = before ? rates["before"] : rates["after"];
    let tot = 0;
    let temp = pay;
    if (temp < data[0]!.start) return 0;
    for (let i = 0; i < data.length; i++) {
      const start: number = data[i].start;
      const end: number = data[i].end;
      const taxable = Math.max(Math.min(end, pay) - start, 0);
      tot += taxable * data[i].categories[category as keyof Mapping];
    }
    return roundUpAll(tot);
  };
  return (
    <Paper
      className="myinput"
      style={{
        width: "35%",
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
      <FormControl style={{marginTop: "10px"}}>
        <InputLabel style={{fontWeight: "bold", color: "black"}}>
          Pay period
        </InputLabel>
        <Select
          label="Pay period"
          style={{background: "white"}}
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
        label="Enter pay"
        type="number"
        style={{marginTop: "15px", background: "white"}}
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
      <FormControl style={{marginTop: "15px"}}>
        <InputLabel style={{color: "black", fontWeight: "bold"}}>
          Select NICs Category
        </InputLabel>
        <Select
          inputProps={{}}
          input={<OutlinedInput label="Select NICs Category  " />}
          value={inputState.category}
          style={{background: "white"}}
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
      <p style={{textDecoration: "underline", fontWeight: "bold"}}>
        NI Employee: £{currencyFormat(resultState.employee)}
      </p>
      <p style={{textDecoration: "underline", fontWeight: "bold"}}>
        NI Employer: £{currencyFormat(resultState.employer)}
      </p>
    </Paper>
  );
};
const currencyFormat = (num: number): string => {
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
