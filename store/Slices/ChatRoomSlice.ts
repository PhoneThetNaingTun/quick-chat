import { chatRoomSlice } from "@/types/chatRooms";
import { ChatRoom } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomSlice = {
  chatrooms: [],
  loading: false,
};

const ChatRoomSlice = createSlice({
  name: "ChatRoom",
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.chatrooms = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setChatRooms, setLoading } = ChatRoomSlice.actions;
export default ChatRoomSlice.reducer;