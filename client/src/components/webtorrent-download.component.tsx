
import { useEffect } from 'react';
// import { webtorrentDownload } from '../services/api.service';
import { useParams } from 'react-router-dom';


export interface DownloadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export function WebtorrentDownloadComponent(props: DownloadProps) {

   const { magnet } = useParams();

   useEffect(() => {
      // webtorrentDownload(magnet!);
   }, []);
   

   return (
      <div>
         <p>magnet {magnet}</p>
      </div>
   )
}