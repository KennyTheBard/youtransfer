"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const wetransfer_controller_1 = require("./controllers/wetransfer.controller");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // load environment vars
        dotenv.config();
        // init app with an websocket server
        const app = (0, express_1.default)();
        // add middleware
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(new middleware_1.ErrorHandlerMiddleware().use);
        app.use((0, express_fileupload_1.default)({
            limits: { fileSize: 2 * 1024 * 1024 * 1024 },
        }));
        // init controllers
        [
            new wetransfer_controller_1.WeTransferController(),
        ].forEach(controller => app.use(`${controller.path}`, controller.router));
        // start server
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
    catch (err) {
        console.error(err);
    }
}))();
//# sourceMappingURL=server.js.map