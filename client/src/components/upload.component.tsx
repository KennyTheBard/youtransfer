
import { Component } from 'react';
import * as H from 'history';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
import { WtMessage } from '../types/types';
import { wtUpload } from '../services/api.service';
import { WeTransferComponent } from './wetransfer.component';



export interface UploadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export class UploadComponent extends Component<UploadProps, any> {

   componentDidMount() {
      console.log('upload')
   }

   render() {

      return (
         <div>
            <WeTransferComponent/>
         </div>
      )
   }

}