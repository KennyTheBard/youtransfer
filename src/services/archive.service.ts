import AdmZip, { IZipEntry } from 'adm-zip';

export async function zip(files: File[]): Promise<Buffer> {
   var zip = new AdmZip();

   for (const file of files) {
      const arrayBuf = await file.arrayBuffer();
      zip.addFile(file.name, Buffer.from(arrayBuf));
   }
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
