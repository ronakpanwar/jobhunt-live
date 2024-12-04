import { createSlice } from "@reduxjs/toolkit"; 

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        filterCompanyByText:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action)=>{
        state.companies = action.payload;
        },
        setFilterCompanyByText:(state , action)=>{
           state.filterCompanyByText = action.payload;
        }
    }
});

export const {setSingleCompany , setCompanies , setFilterCompanyByText} = companySlice.actions;
export default companySlice.reducer;