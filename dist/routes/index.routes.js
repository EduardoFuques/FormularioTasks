"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _task = require("../controllers/task.controller");
var _auth = _interopRequireDefault(require("../helpers/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get("/task", _auth["default"].isAuthenticated, _task.renderTask);
router.post("/task/add", _auth["default"].isAuthenticated, _task.createTask);
router.get("/task/:id/edit", _auth["default"].isAuthenticated, _task.renderTaskEdit);
router.post("/task/:id/edit", _auth["default"].isAuthenticated, _task.editTask);
router.get("/task/:id/delete", _auth["default"].isAuthenticated, _task.deleteTask);
router.get("/task/:id/toggledone", _auth["default"].isAuthenticated, _task.toggleTask);
var _default = router;
exports["default"] = _default;