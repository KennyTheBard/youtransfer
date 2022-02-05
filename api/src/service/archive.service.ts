import AdmZip, { IZipEntry } from 'adm-zip';
import { FileArray } from 'express-fileupload';
import { Blob } from 'buffer';

export async function zip(files: FileArray): Promise<Buffer> {
   var zip = new AdmZip();

   Object.values(files).forEach(file =>
      (Array.isArray(file) ? file : [file]).forEach(f =>
         zip.addFile(f.name, f.data)
      )
   )

   return zip.toBuffer();
}

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
