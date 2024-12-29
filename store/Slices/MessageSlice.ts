import { message, messageSlice, NewMessagePayload } from "@/types/message";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: messageSlice = {
  messages: [],
  loading: false,
};

export const SendMessage = createAsyncThunk(
  "MessageSlice/SendMessage",
  async (payload: NewMessagePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkapi.dispatch(setLoading(false));
  }
);

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<message>) => {
      state.messages = [...state.messages, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setMessages, addMessage, setLoading } = MessageSlice.actions;
export default MessageSlice.reducer;
