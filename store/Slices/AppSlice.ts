import { appSlice } from "@/types/app";
import { User } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setRequests } from "./FriendRequestSlice";
import { setChats } from "./ChatSlice";
import { setMessages } from "./MessageSlice";
import { setChatRooms } from "./ChatRoomSlice";

const initialState: appSlice = {
  user: null,
  loading: true,
  init: false,
};

export const fetchApp = createAsyncThunk(
  "AppSlice/fetchApp",
  async (_, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const res = await fetch("/api/app");
    const data = await res.json();
    const { user, requests, chats, messages, chatRooms } = data;
    thunkapi.dispatch(setUser(user));
    thunkapi.dispatch(setChats(chats));
    thunkapi.dispatch(setRequests(requests));
    thunkapi.dispatch(setChatRooms(chatRooms));
    thunkapi.dispatch(setMessages(messages));
    thunkapi.dispatch(setLoading(false));
  }
);

const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setInit, setLoading, setUser } = AppSlice.actions;
export default AppSlice.reducer;
