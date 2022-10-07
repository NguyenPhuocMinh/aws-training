'use strict';

import server from './src/server';
import {
  loginUser,
  registerUser,
  uploadImage,
  getImage,
  getImageResize,
  deleteImage,
  resizeImage,
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} from './handlers';

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.uploadImage = uploadImage;
exports.getImage = getImage;
exports.getImageResize = getImageResize;
exports.deleteImage = deleteImage;
exports.resizeImage = resizeImage;
exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodo = getTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.server = server;
