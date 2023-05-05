import { create } from 'zustand'
import axios from 'axios';

const authStore = create((set) => ({
  loggedIn: null,

  loginForm:  {
    username: "",
    password: ""
  },

  signupForm:  {
    username: "",
    password: ""
  },

  updateLoginForm: (e) => {
    const {name, value} = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        }
      }
    })
  },

  login: async (e) => {
    const { loginForm } = authStore.getState();

    const res = await axios.post("/login", loginForm, {withCredentials: true});

    set({loggedIn: true});
  },

  checkAuth: async () => {
    try {
      await axios.get('/check-auth', {withCredentials: true});
      set({loggedIn: true});
    } catch (err) {
      set({loggedIn: false});
    }
  }

}));

export default authStore;