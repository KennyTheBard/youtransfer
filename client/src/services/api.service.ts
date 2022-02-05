import { WtMessage } from './../../../api/src/types/types.d';
import axios from 'axios'


export async function wtUpload(files: File[]): Promise<WtMessage> {
   const res = await axios.post(`http://localhost:3000/wt/upload`, files);
   return res as unknown as WtMessage;
}

export async function wtDownload(
   id: string,
   hash: string,
   password: string
): Promise<WtMessage> {
   const res = await axios.post(`http://localhost:3000/wt/download`, {
      id, hash, password
   });
   return res as unknown as WtMessage;
}