import { Request, Response, Router } from 'express';
import { unzip, zip } from '../service/archive.service';
import { decrypt, encrypt } from '../service/ecrypt.service';
import { wtDownload, wtUpload } from '../service/wetransfer.service';
import { WtMessage } from '../types/types';
import { InstanceManager } from '../util/instance-manager';

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

      const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
      const data = encrypt(password, await zip(files));

      console.log(password);
      console.log(unzip(decrypt(password, data)));

      const msg: WtMessage = await (new Promise((resolve, reject) => 
         wtUpload(data)
            .on('progress', (data: WtMessage) => {
               console.log('PROGRESS', data)
            })
            .on('end', async (data: WtMessage) => {
               console.log('PROGRESS', data)
               resolve(data);
            })
            .on('error', (error: any) => {
               console.error('ERROR', error)
               reject(error);
            })
      ));

      res.status(200).send({
         id: msg.id,
         hash: msg.security_hash
      })
   }

   /**
    * POST /wt/download
    */
   download = async (req: Request, res: Response) => {
      const {
         id, hash, password
      } = req.body;

      (await wtDownload(id, hash)).pipe(res);
   }
}