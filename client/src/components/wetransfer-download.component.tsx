
import { useEffect } from 'react';
import { wetransferDownload } from '../services/api.service';
import { useParams } from 'react-router-dom';


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
      <div>
         <p>id {id}</p>
         <p>hash {hash}</p>
         <p>key {key}</p>
      </div>
   )
}