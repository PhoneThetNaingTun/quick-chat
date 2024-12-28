import {
  ConfirmFriendRequestPayload,
  friendRequestSlice,
  NewFriendRequestPayload,
} from "@/types/friend-request";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FriendRequest } from "@prisma/client";

const initialState: friendRequestSlice = {
  requests: [],
  loading: false,
};

export const SendRequest = createAsyncThunk(
  "FriendRequestSlice/SendRequest",
  async (payload: NewFriendRequestPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch("/api/friend-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { message, error } = await response.json();
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(setLoading(false));
  }
);
export const ConfirmRequest = createAsyncThunk(
  "FriendRequestSlice/ConfirmRequest",
  async (payload: ConfirmFriendRequestPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch("/api/friend-requests/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { message, error } = await response.json();
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(setLoading(false));
  }
);
export const RemoveRequest = createAsyncThunk(
  "FriendRequestSlice/RemoveRequest",
  async (payload: ConfirmFriendRequestPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch("/api/friend-requests/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { message, error } = await response.json();
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(setLoading(false));
  }
);

const FriendRequestSlice = createSlice({
  name: "FriendRequestSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRequests: (state, action: PayloadAction<FriendRequest[]>) => {
      state.requests = action.payload;
    },
    addRequests: (state, action: PayloadAction<FriendRequest>) => {
      state.requests = [...state.requests, action.payload];
    },
    removeRequests: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter((request) =>
        request.id === action.payload ? false : true
      );
    },
  },
});

export const { setLoading, setRequests, addRequests, removeRequests } =
  FriendRequestSlice.actions;
export default FriendRequestSlice.reducer;
