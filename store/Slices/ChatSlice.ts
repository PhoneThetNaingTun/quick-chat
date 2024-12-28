import { chat, chatSlice } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatSlice = {
  chats: [],
  loading: false,
};

const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<chat>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats, addChat } = ChatSlice.actions;
export default ChatSlice.reducer;
