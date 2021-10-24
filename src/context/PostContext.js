import createDataContext from "./createDataContext";
import socialGridApi from "../api/socialGrid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const postReducer = (state, action) => {
  switch (action.type) {
    case "add_post":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          content: action.payload.content,
        },
      ];
    case "edit_post":
      return state.map((post) => {
        return post._id === action.payload.id ? action.payload : post;
      });
    case "delete_post":
      return state.filter((post) => post._id !== action.payload);
    case "fetch_posts":
      return action.payload;
    default:
      return state;
  }
};

const fetchPosts = (dispatch) => async () => {
  try {
    const response = await socialGridApi.get("/posts");
    dispatch({ type: "fetch_posts", payload: response.data.reverse() });
  } catch (error) {
    console.log(error.message);
  }
};

const addPost = (dispatch) => {
  return async (content, photoUrl) => {
    const username = await AsyncStorage.getItem("username");
    try {
      await socialGridApi.post("/posts", { content, photoUrl, username });
      // dispatch({ type: "add_post", payload: { content } });
      navigate("Index");
    } catch (error) {
      console.log(error);
    }
  };
};

const editPost = (dispatch) => {
  return async (id, content, photoUrl) => {
    photoUrl = photoUrl === undefined ? "" : photoUrl;
    try {
      await socialGridApi.put(`/posts/${id}`, { content, photoUrl });
      dispatch({ type: "edit_post", payload: { id, content, photoUrl } });
      navigate("Index");
    } catch (error) {
      console.log(error);
    }
  };
};

const deletePost = (dispatch) => {
  return async (id) => {
    try {
      await socialGridApi.delete(`/posts/${id}`);
      dispatch({ type: "delete_post", payload: id });
    } catch (error) {
      console.log(error);
    }
  };
};

export const { Context, Provider } = createDataContext(
  postReducer,
  { addPost, deletePost, editPost, fetchPosts },
  []
);
