import { WetransferUploadMeta } from './../types/types.d';
import axios from 'axios'
import fileDownload from 'js-file-download';
// import WebTorrent from 'webtorrent';

export async function wetransferUpload(
   files: File[]
): Promise<WetransferUploadMeta> {
   const formData = new FormData();
   files.forEach((file, idx) => formData.append(`file${idx}`, file, file.name));

   const res = await axios.post(`http://localhost:3000/wt/upload`, formData);
   return res.data as unknown as WetransferUploadMeta;
}

export async function wetransferDownload(
   id: string,
   hash: string,
   key: string
): Promise<void> {
   const res = await axios.post(`http://localhost:3000/wt/download`, {
      id, hash, key
   }, {
      responseType: 'blob'
   });

   fileDownload(res.data, 'download.zip', 'application/zip');
}
