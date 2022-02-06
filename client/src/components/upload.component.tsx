
import { Component } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { WetransferUploadComponent } from './wetransfer-upload.component';


export interface UploadProps {
   alert: (message: string) => void;
   // history: H.History;
}

export class UploadComponent extends Component<UploadProps, any> {

   state: {
      files: File[],
   } = {
         files: [],
      };

   private handleFileDropOrSelect = (files: FileList) => {
      console.log(files);
      this.setState({
         files: [
            ...this.state.files,
            ...Array.from(files)
         ]
      });
   };

   render() {
      return (
         <div>
            <FileUploader handleChange={this.handleFileDropOrSelect} name="file" multiple={true} />
            {
               this.state.files.map((file: File, idx: number) => {
                  return <div key={idx}>{file.name}</div>;
               })
            }
            <WetransferUploadComponent files={this.state.files}/>
         </div>
      )
   }

}