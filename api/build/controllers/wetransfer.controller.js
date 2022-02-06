"use strict";
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
exports.WeTransferController = void 0;
const express_1 = require("express");
const archive_service_1 = require("../service/archive.service");
const ecrypt_service_1 = require("../service/ecrypt.service");
const wetransfer_service_1 = require("../service/wetransfer.service");
const memory_streams_1 = __importDefault(require("memory-streams"));
class WeTransferController {
    constructor() {
        this.path = '/wt';
        this.router = (0, express_1.Router)();
        /**
         * POST /wt/upload
         */
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Request upload');
            const files = req.files;
            if (files === undefined) {
                res.status(400).send();
                return;
            }
            const key = (0, ecrypt_service_1.generatePassword)();
            const data = (0, ecrypt_service_1.encrypt)(key, yield (0, archive_service_1.zip)(files));
            const msg = yield (new Promise((resolve, reject) => (0, wetransfer_service_1.wtUpload)(data)
                .on('progress', (data) => {
                // console.log('PROGRESS', data)
            })
                .on('end', (data) => __awaiter(this, void 0, void 0, function* () {
                // console.log('PROGRESS', data)
                resolve(data);
            }))
                .on('error', (error) => {
                console.error('ERROR', error);
                reject(error);
            })));
            res.status(200).send({
                id: msg.id,
                hash: msg.security_hash,
                key: key.toString('hex')
            });
        });
        /**
         * POST /wt/download
         */
        this.download = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Request download', req.body);
            const { id, hash, key: hexKey } = req.body;
            const key = Buffer.from(hexKey, 'hex');
            try {
                const rs = (yield (0, wetransfer_service_1.wtDownload)(id, hash));
                const ws = new memory_streams_1.default.WritableStream();
                rs.pipe(ws);
                rs.on('end', () => ws.end());
                yield new Promise(resolve => ws.on('finish', () => resolve(null)));
                rs.unpipe(ws);
                res.status(200)
                    .send((0, ecrypt_service_1.decrypt)(key, ws.toBuffer()));
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.router.post('/upload', this.upload);
        this.router.post('/download', this.download);
    }
}
exports.WeTransferController = WeTransferController;
//# sourceMappingURL=wetransfer.controller.js.map