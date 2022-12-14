import "../loadEnvironment";
import Debug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = Debug("users:database:index");

const connectDB = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newDocument = { ...ret };
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._v;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;
        delete newDocument.passwd;
        return newDocument;
      },
    });
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to Database", error.message));
        reject(error);
        return;
      }
      debug(chalk.green("Connected to Database"));
      resolve(true);
    });
  });

export default connectDB;
