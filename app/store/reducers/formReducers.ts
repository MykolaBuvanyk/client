import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface formAction {
  interests: string;
  isOpenModal: boolean;
  isPresent: boolean;
}

const initialState: formAction = {
  interests: '',
  isOpenModal: false,
  isPresent: false,
};

const formReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openOrCloseModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setPresent: (state) => {
      state.isPresent = true;
    },
    setInteresets: (state, action: PayloadAction<string>) => {
      state.interests = action.payload;
    },
  },
});

export const { openOrCloseModal, setPresent, setInteresets } =
  formReducer.actions;

export default formReducer.reducer;
