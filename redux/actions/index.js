import {
  USER_STATE_CHANGE,
  USER_ALL_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_ALL_POSTS_STATE_CHANGE,
  FILTERED_DICTIONARY_STATE_CHANGE,
  VALIDATE_DICTIONARY_STATE_CHANGE,
  LANGUAGE_STATE_CHANGE,
} from "../constants/index";
import firebase from "firebase";
require("firebase/firestore");

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
        }
      });
  };
}
export function fetchAllUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_ALL_STATE_CHANGE, usersAll: snapshot.data() });
        } else {
        }
      });
  };
}
export function fetchLanguages() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection(language.language)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: LANGUAGE_STATE_CHANGE,
            language: snapshot.data(),
          });
        } else {
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}
export function fetchAllUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("postsAll")
      .orderBy("creation", "desc")
      .get()
      .then((snapshot) => {
        let postsAll = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        dispatch({ type: USER_ALL_POSTS_STATE_CHANGE, postsAll });
      });
  };
}
// export function fetchDictionary() {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection("dictionaryAll")
//       .orderBy("kagan", "asc")
//       .get()
//       .then((snapshot) => {
//         let dictionaryAll = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           const id = doc.id;
//           return { id, ...data };
//         });
//         // console.log(dictionaryAll);
//         dispatch({ type: DICTIONARY_STATE_CHANGE, dictionaryAll });
//       });
//   };
// }
export function fetchFilteredDictionary() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("dictionaryAll")
      .orderBy("kagan", "asc")
      .where("status", "==", "1")
      .get()
      .then((snapshot) => {
        let filteredDictionary = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        // console.log(dictionaryAll);
        dispatch({
          type: FILTERED_DICTIONARY_STATE_CHANGE,
          filteredDictionary,
        });
      });
  };
}
export function fetchValidatedDictionary() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("dictionaryAll")
      .orderBy("kagan", "asc")
      .where("upload", "==", "1")
      .get()
      .then((snapshot) => {
        let validatedDictionary = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        // console.log(dictionaryAll);
        dispatch({
          type: VALIDATE_DICTIONARY_STATE_CHANGE,
          validatedDictionary,
        });
      });
  };
}
