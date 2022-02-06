
import { Component } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
// import { webtorrentUpload } from '../services/api.service';



export interface WetorrentUploadProps {
   // alert: (message: string) => void;
   // history: H.History;
   files: File[]
}

export class WebtorrentUploadComponent extends Component<WetorrentUploadProps, any> {

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

      // const magnet = await webtorrentUpload(files);

      // const url = `${window.location.protocol}//${window.location.host}/direct/${magnet}`;

      // console.log(url);
      // this.setState({
      //    downloadUrl: url
      // });
   }

   render() {
      return (
         <div>
            <Button onClick={this.onUploadClicked} variant="contained">Seed</Button>
            {this.state.downloadUrl !== null ? this.state.downloadUrl : ''}
         </div>
      )
   }

}