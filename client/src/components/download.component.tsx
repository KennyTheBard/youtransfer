
import { Component, useEffect } from 'react';
import * as H from 'history';
import { FileUploader } from 'react-drag-drop-files';
import { Button } from '@mui/material';
import { WtMessage } from '../types/types';
import { wtDownload, wtUpload } from '../services/api.service';
import { WeTransferComponent } from './wetransfer.component';
import { useParams } from 'react-router-dom';


export interface DownloadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export function DownloadComponent(props: DownloadProps) {

   let { id, hash, key } = useParams();

   useEffect(() => {
      wtDownload(id!, hash!, key!);
   }, []);
   

   return (
      <div>
         <p>id {id}</p>
         <p>hash {hash}</p>
         <p>key {key}</p>
      </div>
   )
}