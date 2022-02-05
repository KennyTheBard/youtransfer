import { Request, Response, Router } from 'express';
import { zip } from '../service/archive.service';
import { decrypt, encrypt, generatePassword } from '../service/ecrypt.service';
import { wtDownload, wtUpload } from '../service/wetransfer.service';
import { WtMessage } from '../types/types';
import streams from 'memory-streams';
import fs from 'fs';


export class WeTransferController {

   public path = '/wt';
   public router = Router();

   constructor() {
      this.router.post('/upload', this.upload);
      this.router.post('/download', this.download);
   }

   /**
    * POST /wt/upload
    */
   upload = async (req: Request, res: Response) => {
      const files = req.files;

      if (files === undefined) {
         res.status(400).send();
         return;
      }

      const key = generatePassword();
      const data = encrypt(key, await zip(files));

      const msg: WtMessage = await (new Promise((resolve, reject) =>
         wtUpload(data)
            .on('progress', (data: WtMessage) => {
               // console.log('PROGRESS', data)
            })
            .on('end', async (data: WtMessage) => {
               // console.log('PROGRESS', data)
               resolve(data);
            })
            .on('error', (error: any) => {
               console.error('ERROR', error)
               reject(error);
            })
      ));

      res.status(200).send({
         id: msg.id,
         hash: msg.security_hash,
         key: key.toString('hex')
      })
   }

   /**
    * POST /wt/download
    */
   download = async (req: Request, res: Response) => {
      const {
         id, hash, key: hexKey
      } = req.body;
      const key = Buffer.from(hexKey, 'hex');

      const rs = (await wtDownload(id, hash));
      const ws = new streams.WritableStream();
      rs.pipe(ws);

      rs.on('end', () => ws.end());
      await new Promise(resolve =>
         ws.on('finish', () => resolve(null))
      );


      res.status(200)
         .send(decrypt(key, ws.toBuffer()));
   }
}