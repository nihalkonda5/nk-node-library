"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSub = exports.AuthorService = exports.BaseService = void 0;
const base_service_1 = require("./base.service");
exports.BaseService = base_service_1.default;
const author_service_1 = require("./author.service");
exports.AuthorService = author_service_1.default;
const PubSub = require("./pubsub.service");
exports.PubSub = PubSub;
