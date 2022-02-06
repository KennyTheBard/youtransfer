
import { Fragment, useEffect, useState } from 'react';
import { wetransferDownload } from '../services/api.service';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { LogoComponent } from './logo.component';
import { Button } from '@mui/material';


export interface WetransferDownloadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export function WetransferDownloadComponent(props: WetransferDownloadProps) {

   const { id, hash, key } = useParams();
   const [loading, setLoading] = useState<boolean>(true);
   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true);

      wetransferDownload(id!, hash!, key!).then(() => {
         setTimeout(() => setLoading(false), 500);
      });
   }, []);

   return (
      <div className="download-container">
         <LogoComponent />
         {loading ?
            <Fragment>
               <p>Your download will be ready any moment</p>
               <CircularProgress />
            </Fragment>
            :
            <Fragment>
               <p>Your download is ready</p>
               <Button variant="contained" onClick={() => navigate('/')}>
                  Go to Upload
               </Button>
            </Fragment>
         }

      </div>
   )
}