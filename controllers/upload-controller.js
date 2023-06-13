import upload from "../middleware/upload.js";
import { MongoClient } from "mongodb";
import { GridFSBucket } from "mongodb";
import { ObjectId } from "mongodb";

const baseUrl = "http://localhost:4000/files/";

const url = "mongodb+srv://markus:zjh991600@treasure.gkhdtga.mongodb.net";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log("files: ", req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }
    return res.status(200).json(req.files);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("piggy-bank");
    const images = database.collection("photos" + ".files");
    let fileInfos = [];

    if ((await images.estimatedDocumentCount()) === 0) {
      fileInfos = [];
    }

    let cursor = images.find({});
    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc._id,
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("piggy-bank");
    const bucket = new GridFSBucket(database, {
      bucketName: "photos",
    });

    const fileId = new ObjectId(req.params.id);
    let downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export default (app) => {
  app.post("/api/files/upload", uploadFiles);
  app.get("/api/files", getListFiles);
  app.get("/api/files/:id", download);
};
