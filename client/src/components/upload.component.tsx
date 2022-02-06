
import { Component } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { WetransferUploadComponent } from './wetransfer-upload.component';
import './upload.component.css';
import { FileRowComponent } from './file-row.component';
import { LogoComponent } from './logo.component';

export interface UploadComponentProps {
   alert: (message: string) => void;
   // history: H.History;
}

export class UploadComponent extends Component<UploadComponentProps, any> {

   state: {
      files: File[],
   } = {
         files: [],
      };

   constructor(props: UploadComponentProps) {
      super(props);
      this.onUploadCompleted = this.onUploadCompleted.bind(this);
   }

   private onUploadCompleted() {
      this.setState({ files: [] })
   }

   private handleFileDropOrSelect = (files: FileList) => {
      this.setState({
         files: [
            ...this.state.files,
            ...Array.from(files)
         ]
      });
   };

   private deleteFile = (idxToDelete: number) => {
      return () => {
         this.setState({
            files: this.state.files.filter((_, idx) => idx !== idxToDelete)
         });
      }
   }

   render() {
      return (
         <div className="upload-container">
            <div className="upload-container-header">
               <LogoComponent/>
            </div>
            <div className="upload-container-main">
               <div className="upload-container-row">
                  <div className="file-drop-container">
                     <FileUploader handleChange={this.handleFileDropOrSelect} name="file" multiple={true} />
                  </div>
                  <WetransferUploadComponent files={this.state.files} onUploadCompleted={this.onUploadCompleted}/>
               </div>
            </div>
            <div className="upload-container-footer">
               {this.state.files.map((file: File, idx: number) =>
                  <FileRowComponent key={idx} file={file} onDelete={this.deleteFile(idx)}/>
               )}
            </div>
         </div>
      )
   }

}