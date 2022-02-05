
import { Component } from 'react';
import * as H from 'history';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
import { wtUpload } from '../services/wetransfer.service';
import { unzip, zip } from '../services/archive.service';
import { decrypt, encrypt } from '../services/ecrypt.service';
import { WtMessage } from '../types/types';



export interface WeTransferProps {
   // alert: (message: string) => void;
   // history: H.History;
}

export class WeTransferComponent extends Component<WeTransferProps, any> {

   state: {
      files: File[]
   } = {
         files: []
      };

   private handleFileDropOrSelect = (files: FileList) => {
      console.log(files);
      this.setState({
         files: [
            ...this.state.files,
            ...Array.from(files)
         ]
      });
   };

   private onUploadClicked = () => {
      if (this.state.files.length === 0) {
         // TODO: upload at least 1 file
         return;
      }

      this.uploadToWeTransfer(this.state.files);
   }

   private uploadToWeTransfer = async (files: File[]) => {
      const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
      const data = encrypt(password, await zip(files));

      console.log(password);
      console.log(unzip(decrypt(password, data)));
      
      wtUpload(data)
         .on('progress', (data: WtMessage) => {
            console.log('PROGRESS', data)
         })
         .on('end', async (data: WtMessage) => {
            console.log('PROGRESS', data)
         })
         .on('error', (error: any) => console.error('ERROR', error));;
   }

   render() {
      return (
         <div>
            <FileUploader handleChange={this.handleFileDropOrSelect} name="file" multiple={true} />
            {
               this.state.files.map((file: File, idx: number) => {
                  return <div key={idx}>{file.name}</div>;
               })
            }
            <Button onClick={this.onUploadClicked} variant="contained">Upload</Button>
         </div>
      )
   }

}