import { configureStore } from "@reduxjs/toolkit";
import AppSliceReducter from "./Slices/AppSlice";
import FriendRequestSliceReducer from "./Slices/FriendRequestSlice";
import ChatSliceReducer from "./Slices/ChatSlice";
import MessageSliceReducer from "./Slices/MessageSlice";

export const store = configureStore({
  reducer: {
    App: AppSliceReducter,
    FriendRequests: FriendRequestSliceReducer,
    Chats: ChatSliceReducer,
    Messages: MessageSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
