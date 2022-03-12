import {
  USER_STATE_CHANGE,
  USER_ALL_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_ALL_POSTS_STATE_CHANGE,
  FILTERED_DICTIONARY_STATE_CHANGE,
  VALIDATE_DICTIONARY_STATE_CHANGE,
  LANGUAGE_STATE_CHANGE,
} from "../constants";

const initialState = {
  currentUser: [],
  usersAll: [],
  posts: [],
  postsAll: [],
  filteredDictionary: [],
  validatedDictionary: [],
  language: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_ALL_STATE_CHANGE:
      return {
        ...state,
        usersAll: action.usersAll,
      };
    case LANGUAGE_STATE_CHANGE:
      return {
        ...state,
        language: action.language,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_ALL_POSTS_STATE_CHANGE:
      return {
        ...state,
        postsAll: action.postsAll,
      };
    case FILTERED_DICTIONARY_STATE_CHANGE:
      return {
        ...state,
        filteredDictionary: action.filteredDictionary,
      };
    case VALIDATE_DICTIONARY_STATE_CHANGE:
      return {
        ...state,
        validatedDictionary: action.validatedDictionary,
      };

    default:
      return state;
  }
};
