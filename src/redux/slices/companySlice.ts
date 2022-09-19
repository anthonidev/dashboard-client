import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../../utils/types/reduxInterface";

const initialState: CompanyState = {
  loading: false,
};

export const companySlice = createSlice({
  name: "comapany",
  initialState,
  reducers: {
    setLoading: (state: CompanyState) => {
      state.loading = !state.loading;
    },
  },
});

export const { setLoading } = companySlice.actions;

export default companySlice.reducer;
