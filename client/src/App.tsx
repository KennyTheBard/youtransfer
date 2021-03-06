import React from 'react';
import Helmet from 'react-helmet';
import { UploadComponent } from './components/upload.component';
import { WetransferDownloadComponent } from './components/wetransfer-download.component';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';
import { BubblesComponent } from './components/bubbles.component';


export default class App extends React.Component {

  state: {
    alerts: string[],
  } = {
      alerts: []
    }

  constructor(props: any) {
    super(props);

    this.addAlert = this.addAlert.bind(this);
  }


  addAlert(message: string) {
    this.setState({
      alerts: [
        ...this.state.alerts,
        message
      ]
    });
    setTimeout(() => {
      this.setState({ alerts: [...this.state.alerts].slice(1) });
    },
      3000
    );
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>YouTransfer</title>
        </Helmet>

        <div className='header-space'></div>
        <div className='content-card'>
          <BrowserRouter basename='/'>
            <Routes>
              <Route path='/' element={
                <UploadComponent alert={this.addAlert} />
              } />
              <Route path='/direct/:id/:hash/:key' element={
                <WetransferDownloadComponent alert={this.addAlert} />
              } />
            </Routes>
          </BrowserRouter>
        </div>

        <BubblesComponent/>
      </div>
    );
  }
}
