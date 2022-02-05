import AdmZip, { IZipEntry } from 'adm-zip';
import { FileArray } from 'express-fileupload';

export async function zip(files: FileArray): Promise<Buffer> {
   var zip = new AdmZip();

   Object.values(files).forEach(file =>
      (Array.isArray(file) ? file : [file]).forEach(f =>
         zip.addFile(f.name, f.data)
      )
   )

   return zip.toBuffer();
}

export async function unzip(buf: Buffer): Promise<File[]> {
   var zip = new AdmZip(buf);

   return zip.getEntries().map(extractEntryToFile);
}


function extractEntryToFile(entry: IZipEntry): File {
   return new File(
      [entry.getData().buffer],
      entry.entryName
   );
}
