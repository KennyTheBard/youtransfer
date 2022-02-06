import { Button, IconButton } from '@mui/material';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './file-row.component.css';

export interface FileRowProps {
   file: File
   onDelete: () => void
}

export function FileRowComponent(props: FileRowProps) {


   return (
      <div className="file-row">
         <div className="file-row-name">
            {props.file.name}
         </div>
         <div className="file-row-size">
            {bytesToHumanReadable(props.file.size)}
         </div>
         <IconButton onClick={props.onDelete} color="error">
            <DeleteForeverIcon />
         </IconButton>
      </div>
   );
}

function bytesToHumanReadable(bytes: number): string {
   if (bytes < 1024) return `${bytes} B`;
   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
   if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
   return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}