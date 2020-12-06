"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSubscriber = exports.publishMessage = exports.addSubscriberAll = exports.addSubscriber = void 0;
const nk_js_library_1 = require("nk-js-library");
const org = nk_js_library_1.Services.PubSubService.Organizer;
const addSubscriber = (messageType, subscriber) => {
    return org.addSubscriber(messageType, subscriber);
};
exports.addSubscriber = addSubscriber;
const addSubscriberAll = (messageTypes, subscriber) => {
    return org.addSubscriberAll(messageTypes, subscriber);
};
exports.addSubscriberAll = addSubscriberAll;
const publishMessage = (message) => {
    return org.publishMessage(message);
};
exports.publishMessage = publishMessage;
const removeSubscriber = (messageType, subscriber) => {
    return org.removeSubscriber(messageType, subscriber);
};
exports.removeSubscriber = removeSubscriber;
