import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{}
}

const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    setUser:(currentState,actions)=>{
        currentState.user = actions.payload
    }
  }
});

export const {setUser} = memberSlice.actions

export default memberSlice.reducer