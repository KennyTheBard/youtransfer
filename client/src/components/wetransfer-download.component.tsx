
import { useEffect } from 'react';
import { wetransferDownload } from '../services/api.service';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { LogoComponent } from './logo.component';


export interface WetransferDownloadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export function WetransferDownloadComponent(props: WetransferDownloadProps) {

   let { id, hash, key } = useParams();

   useEffect(() => {
      wetransferDownload(id!, hash!, key!);
   }, []);
   

   return (
      <div className="download-container">
         <LogoComponent/>
         <p>Your download will be ready any moment</p>
         <CircularProgress/>
      </div>
   )
}