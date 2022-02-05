
import { Component } from 'react';
import * as H from 'history';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
import { WtMessage } from '../types/types';
import { wtUpload } from '../services/api.service';



export interface WeTransferProps {
   // alert: (message: string) => void;
   // history: H.History;
}

export class WeTransferComponent extends Component<WeTransferProps, any> {

   state: {
      files: File[],
      downloadUrl: string | null
   } = {
         files: [],
         downloadUrl: null
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

   private onUploadClicked = async () => {
      const files = this.state.files;
      if (files.length === 0) {
         // TODO: upload at least 1 file
         return;
      }

      const msg = await wtUpload(files);

      console.log(msg);
      const url = `${window.location.protocol}//${window.location.host}/download/` +
         `${msg.id}/${msg.hash}/${msg.key}`;

      console.log(url);
      this.setState({
         downloadUrl: url
      });
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
            {this.state.downloadUrl !== null ? this.state.downloadUrl : ''}
         </div>
      )
   }

}