import express from 'express';
import { ErrorHandlerMiddleware } from './middleware';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { WeTransferController } from './controllers/wetransfer.controller';

(async () => {
   try {
      // load environment vars
      dotenv.config();

      // init app with an websocket server
      const app = express();

      // add middleware
      app.use(cors());
      app.use(new ErrorHandlerMiddleware().use);
      app.use(fileUpload({
         limits: { fileSize: 2 * 1024 * 1024 * 1024 },
      }));


      // init controllers
      [
         new WeTransferController(),
      ].forEach(controller => app.use(`${controller.path}`, controller.router))

      // start server
      const port = process.env.PORT;
      app.listen(port, () => {
         console.log(`App listening on the port ${port}`);
      });


   } catch (err) {
      console.error(err);
   }
})();