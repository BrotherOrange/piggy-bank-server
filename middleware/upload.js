import util from 'util';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

var storage = new GridFsStorage({
  url: 'mongodb+srv://markus:zjh991600@treasure.gkhdtga.mongodb.net/piggy-bank',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = file.originalname;
      // console.log(filename);
      return filename;
    }
    return {
      bucketName: "photos",
      filename: file.originalname
    };
  },
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;
