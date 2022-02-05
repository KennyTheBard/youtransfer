import { EventEmitter } from 'stream';
import * as wt from 'wetransfert';

export function wtUpload(buf: Buffer): EventEmitter {
   const toUpload = [
      new wt.Payload({
         name: "Content",
         buffer: buf
      })
   ];

   return wt.upload('', '', toUpload, 'Hello World', 'en');
}

export async function wtDownload(downloadId: string, securityHash: string): Promise<any> {
   const url = `https://wetransfer.com/downloads/${downloadId}/${securityHash}`;
   return (await wt.downloadPipe(url, null));
}