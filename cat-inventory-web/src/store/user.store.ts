import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ZodLoginRequestDTO, ZodUserDTO } from 'my-inventory-common/dto';
import { HttpErrorDTO } from 'my-inventory-common/errors';

export interface UserState {
  data: ZodUserDTO | null;
  isLoading: boolean;
  error: HttpErrorDTO | null;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null
};

export const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as HttpErrorDTO;
    });
  }
});

export const login = createAsyncThunk<
  ZodUserDTO,
  ZodLoginRequestDTO,
  { rejectValue: HttpErrorDTO }
>('user/login', async (data, thunkApi) => {
  const response = await fetch('/api/auth/login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (response.status !== 200) {
    return thunkApi.rejectWithValue((await response.json()) as HttpErrorDTO);
  }
  return (await response.json()) as ZodUserDTO;
});