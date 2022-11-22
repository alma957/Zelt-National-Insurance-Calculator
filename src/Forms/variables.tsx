export interface InputState {
  validDate: boolean;
  payPeriod: string;
  pay: number;
  category: string;

}
export const multiplier: mult = {
  annually: 1 / 12,
  monthly: 1,
  weekly: 52 / 12,
  daily: 365 / 12,
};
export interface mult {
  annually: number;
  monthly: number;
  weekly: number;
  daily: number;
}
export interface BreakdownTable {
  income:Array<number|null>;
  rate:Array<number|null>;
  contr:Array<number|null>;
  incomeBand:Array<{
    start:number,
    end:number
  }|string>
}
export const initialState: InputState = {
  validDate: true,
  payPeriod: "monthly",
  pay: 2500,
  category: "A",
};
export interface RatesType {
  firstPeriod: Array<Rates>;
  secondPeriod: Array<Rates>;
  thirdPeriod: Array<Rates>;

}
export interface Mapping {
  A: number;
  B: number;
  F: number;
  H: number;
  M: number;
  V: number;
  I: number;
  J: number;
  L: number;
  Z: number;
  S: number;
  C: number;
}
export interface Rates {
  start: number;
  end: number;
  categories: Mapping;
}
export const employeeRates: RatesType = {
  firstPeriod: [
    {
      start: 823,
      end: 4189,
      categories: {
        A: 0.1325,
        B: 0.071,

        F: 0.1325,
        H: 0.1325,
        M: 0.1325,
        V: 0.1325,
        I: 0.071,
        J: 0.0325,
        L: 0.0325,
        Z: 0.0325,
        S: 0,
        C: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.0325,
        B: 0.0325,
        F: 0.0325,
        H: 0.0325,
        M: 0.0325,
        V: 0.0325,
        I: 0.0325,
        J: 0.0325,
        L: 0.0325,
        Z: 0.0325,
        S: 0,
        C: 0,
      },
    },
  ],
  secondPeriod: [
    {
      start: 1048,
      end: 4189,
      categories: {
        A: 0.1325,
        B: 0.071,
        F: 0.1325,
        H: 0.1325,
        M: 0.1325,
        V: 0.1325,
        I: 0.071,
        J: 0.0325,
        L: 0.0325,
        Z: 0.0325,
        S: 0,
        C: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.0325,
        B: 0.0325,
        F: 0.0325,
        H: 0.0325,
        M: 0.0325,
        V: 0.0325,
        I: 0.0325,
        J: 0.0325,
        L: 0.0325,
        Z: 0.0325,
        S: 0,
        C: 0,
      },
    },
  ],
  thirdPeriod: [
    {
      start: 1048,
      end: 4189,
      categories: {
        A: 0.12,
        B: 0.0585,
        F: 0.12,
        H: 0.12,
        M: 0.12,
        V: 0.12,
        I: 0.0585,
        J: 0.02,
        L: 0.02,
        Z: 0.02,
        S: 0,
        C: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.02,
        B: 0.02,
        F: 0.02,
        H: 0.02,
        M: 0.02,
        V: 0.02,
        I: 0.02,
        J: 0.02,
        L: 0.02,
        Z: 0.02,
        S: 0,
        C: 0,
      },
    },
  ]
};
/////EMPLOYER DATA
//////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
//////////////////
export const employerData: RatesType = {
  firstPeriod: [
    {
      start: 758,
      end: 2083,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0,
        H: 0,
        I: 0,
        J: 0.1505,
        L: 0,
        M: 0,
        S: 0,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 2083.01,
      end: 4189,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0.1505,
        H: 0,
        I: 0.1505,
        J: 0.1505,
        L: 0.1505,
        M: 0,
        S: 0.1505,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0.1505,
        H: 0.1505,
        I: 0.1505,
        J: 0.1505,
        L: 0.1505,
        M: 0.1505,
        S: 0.1505,
        V: 0.1505,
        Z: 0.1505,
      },
    },
  ],
  secondPeriod: [
    {
      start: 758,
      end: 2083,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0,
        H: 0,
        I: 0,
        J: 0.1505,
        L: 0,
        M: 0,
        S: 0,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 2083.01,
      end: 4189,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0.1505,
        H: 0,
        I: 0.1505,
        J: 0.1505,
        L: 0.1505,
        M: 0,
        S: 0.1505,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.1505,
        B: 0.1505,
        C: 0.1505,
        F: 0.1505,
        H: 0.1505,
        I: 0.1505,
        J: 0.1505,
        L: 0.1505,
        M: 0.1505,
        S: 0.1505,
        V: 0.1505,
        Z: 0.1505,
      },
    },
  ],
  thirdPeriod: [
    {
      start: 758,
      end: 2083,
      categories: {
        A: 0.138,
        B: 0.138,
        C: 0.138,
        F: 0,
        H: 0,
        I: 0,
        J: 0.138,
        L: 0,
        M: 0,
        S: 0,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 2083.01,
      end: 4189,
      categories: {
        A: 0.138,
        B: 0.138,
        C: 0.138,
        F: 0.138,
        H: 0,
        I: 0.138,
        J: 0.138,
        L: 0.138,
        M: 0,
        S: 0.138,
        V: 0,
        Z: 0,
      },
    },
    {
      start: 4189.01,
      end: Infinity,
      categories: {
        A: 0.138,
        B: 0.138,
        C: 0.138,
        F: 0.138,
        H: 0.138,
        I: 0.138,
        J: 0.138,
        L: 0.138,
        M: 0.138,
        S: 0.138,
        V: 0.138,
        Z: 0.138,
      },
    },
  ]
};

