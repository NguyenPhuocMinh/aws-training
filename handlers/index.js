'use strict';

/**
 * Auth
 */
import loginUser from './auth/loginUser';
import registerUser from './auth/registerUser';

/**
 * Upload
 */
import uploadImage from './upload/uploadImage';
import getImage from './upload/getImage';
import deleteImage from './upload/deleteImage';
import resizeImage from './upload/resizeImage';

/**
 * AppSync
 */
import createTodo from './app-sync/create-todo';
import getTodos from './app-sync/get-todos';
import getTodo from './app-sync/get-todo';
import updateTodo from './app-sync/update-todo';
import deleteTodo from './app-sync/delete-todo';

export {
  loginUser,
  registerUser,
  uploadImage,
  getImage,
  deleteImage,
  resizeImage,
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
};
