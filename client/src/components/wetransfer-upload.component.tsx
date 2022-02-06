
import { Component } from 'react';
import * as H from 'history';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
import { WetransferMessage } from '../types/types';
import { wetransferUpload } from '../services/api.service';



export interface WetransferUploadProps {
   // alert: (message: string) => void;
   // history: H.History;
   files: File[];
}

export class WetransferUploadComponent extends Component<WetransferUploadProps, any> {

   state: {
      downloadUrl: string | null
   } = {
         downloadUrl: null
      };

   private onUploadClicked = async () => {
      const files = this.props.files;
      if (files.length === 0) {
         // TODO: upload at least 1 file
         return;
      }

      const msg = await wetransferUpload(files);

      console.log(msg);
      const url = `${window.location.protocol}//${window.location.host}/direct/` +
         `${msg.id}/${msg.hash}/${msg.key}`;

      console.log(url);
      this.setState({
         downloadUrl: url
      });
   }

   render() {
      return (
         <div>
            <Button onClick={this.onUploadClicked} variant="contained">Upload</Button>
            {this.state.downloadUrl !== null ? this.state.downloadUrl : ''}
         </div>
      )
   }

}