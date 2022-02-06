
import { Fragment, Component } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { wetransferUpload } from '../services/api.service';


export interface WetransferUploadProps {
   // alert: (message: string) => void;
   files: File[];
   onUploadCompleted: () => void;
   onNewUpload: () => void;
}

export class WetransferUploadComponent extends Component<WetransferUploadProps, any> {

   state: {
      downloadUrl: string | null;
      loading: boolean;
   } = {
         downloadUrl: null,
         loading: false
      };

   constructor(props: WetransferUploadProps) {
      super(props);
      this.onNewUpload = this.onNewUpload.bind(this);
   }

   private onNewUpload = () => {
      this.setState({
         downloadUrl: null
      });
      this.props.onNewUpload();
   }

   private onUploadClicked = async () => {
      const files = this.props.files;
      if (files.length === 0) {
         // TODO: upload at least 1 file
         return;
      }

      this.setState({
         loading: true
      })

      const msg = await wetransferUpload(files);
      this.props.onUploadCompleted();

      console.log(msg);
      const url = `${window.location.protocol}//${window.location.host}/direct/` +
         `${msg.id}/${msg.hash}/${msg.key}`;

      this.setState({
         downloadUrl: url,
         loading: false
      });
   }

   render() {
      return (
         <div className="wetransfer-container">

            {this.state.loading ? (
               <CircularProgress />
            ) : ''}

            {this.state.downloadUrl === null && !this.state.loading ? (
               <Fragment>
                  <Button disabled={this.props.files.length === 0} onClick={this.onUploadClicked} variant="contained" style={{ width: '10rem' }}>
                     Upload
                  </Button>
               </Fragment>
            ) : ''}

            {this.state.downloadUrl !== null && !this.state.loading ? (
               <Fragment>
                  <Button onClick={this.onNewUpload} variant="contained" style={{ width: '10rem' }}>
                     New upload
                  </Button>
                  <Button variant="contained" color="success" style={{ width: '10rem' }}
                     onClick={() => { navigator.clipboard.writeText(this.state.downloadUrl!) }}>
                     Copy link
                  </Button>
               </Fragment>
            ) : ''}
         </div>
      )
   }

}