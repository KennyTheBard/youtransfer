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
exports.zip = void 0;
const adm_zip_1 = __importDefault(require("adm-zip"));
function zip(files) {
    return __awaiter(this, void 0, void 0, function* () {
        var zip = new adm_zip_1.default();
        Object.values(files).forEach(file => (Array.isArray(file) ? file : [file]).forEach(f => zip.addFile(f.name, f.data)));
        return zip.toBuffer();
    });
}
exports.zip = zip;
// export function unzip(buf: Buffer): FormData[] {
//    var zip = new AdmZip(buf);
//    const form = new FormData();
//    zip.getEntries().forEach((entry: IZipEntry) => form.append(entry.))
//    const files = fs.
//    return zip.getEntries().map(extractEntryToFile);
// }
// function extractEntryToFile(entry: IZipEntry): File {
//    return new Blob(
//       entry.getData().buffer,
//       entry.entryName
//    );
// }
//# sourceMappingURL=archive.service.js.map