"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
  });
}
function apigetDayRandom() {
  return utils_request.request({ url: "/randomWall" });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apigetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiGetSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassify = apiGetClassify;
exports.apiGetNotice = apiGetNotice;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apigetClassList = apigetClassList;
exports.apigetDayRandom = apigetDayRandom;
