import { WtUploadMeta } from './../types/types.d';
import axios from 'axios'
import fileDownload from 'js-file-download';

export async function wtUpload(files: File[]){
   const formData = new FormData();
   files.forEach((file, idx) => formData.append(`file${idx}`, file, file.name));

   const res = await axios.post(`http://localhost:3000/wt/upload`, formData);
   return res.data as unknown as WtUploadMeta;
}

export async function wtDownload(
   id: string,
   hash: string,
   key: string
){
   const res = await axios.post(`http://localhost:3000/wt/download`, {
      id, hash, key
   }, {
      responseType: 'blob'
   });

   fileDownload(res.data, 'download.zip', 'application/zip');
}