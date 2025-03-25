import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authSlice";
import todosStore from "./todoSlice";
export const store = configureStore({
  reducer: {
    auth: authStore,
    todos: todosStore,
  },
});
