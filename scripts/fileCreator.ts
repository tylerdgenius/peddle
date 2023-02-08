import readline from "readline";
import fs from "fs";
import { normalCaseGenerator } from "normal-case-generator";

type FileTypes = "services" | "middleware" | "types";

//Use readline instance to grab user input via command line
const mod = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkResponseForType = (response: string) => {
  try {
    const checker =
      response.toLowerCase() !== "services" ||
      response.toLowerCase() !== "middleware" ||
      response.toLowerCase() !== "types";

    console.log({ response, checker });

    if (!checker) throw new Error("Response is not valid");

    return response.toLocaleLowerCase();
  } catch (error) {
    return null;
  }
};

const checkFileResponseForFileExtension = (response: string) => {
  try {
    const checker = response.toLowerCase().includes(".");

    if (checker) throw new Error("Response is invalid");

    return response;
  } catch (err) {
    return null;
  }
};

const createData = (
  fileType: FileTypes,
  filename: string,
  filter: "default" | "controller" | "router" | "model"
) => {
  if (fileType === "services") {
    switch (filter) {
      case "controller":
        return `\n
           import { RequestHandler } from "express";

           export const ${filename}Controller: RequestHandler = (req, res) => {
            // Write code here
           };

        \n
        `;
      case "router":
        return `\n 
           import { Router } from "express";
           import { HandlerCreatorProps } from "@utilities/types";
           import { ${filename}Controller } from "./${filename}.controller"

           const serviceLoaders: HandlerCreatorProps[] = [
            {
                path: "",
                method: "get" // can be changed or updated,
                handlers: [
                    ${filename}Controller
                    //Put controllers in here
                ]
            }
           ]

           const ${filename}Router = Router();


           serviceLoaders.map((singleService) => {
            ${filename}Router[singleService.method](singleService.path, ...singleService.handlers)
           });

           export {
            ${filename}Router
           };
        \n`;
      default:
        return `\n
        import {model, Schema} from "mongoose";

        const ${filename}Schema = new Schema({

        }, {timestamps: true});

        const ${filename}Model = model("${filename}", ${filename}Schema);

        type InsertOne = (props: {
            data: any;
        }) => Promise<any>;

        const insertOne: InsertOne = async ({ data }) => {
            try {
                const returnedData = await ${filename}Model.create({
                    ...data
                });

                return returnedData;
            } catch (err) {
                return null;
            }
        }

        type RetrieveOne = (props: {
            filter: any;
        }) => Promise<any>;

        const retrieveOne: RetrieveOne =  async ({ filter }) => {
            try {
                const returnedData = await ${filename}Model.findOne({
                    ...filter
                });

                if(!returnedData || Object.keys(returnedData).length <= 0) throw new Error("Unable to find model data");

                return returnedData;

            } catch (error) {
                return null;
            }
        }

        type UpdateOne = (props: {
            filter: any;
            updateQuery: any;
        }) => Promise<any>;

        const updateOne: UpdateOne = async ({ filter, updateQuery }) => {
            try {
                const returnedData = await ${filename}Model.findOneAndUpdate({
                    ...filter
                }, {
                    ...updateQuery
                }, {
                    returnOriginal: false
                })

                if(!returnedData || Object.keys(returnedData).length <= 0) throw new Error("Unable to update model data");

                return returnedData;
            } catch (error) {
                return null;
            }
        }

        export {
            updateOne,
            retrieveOne,
            insertOne,
            ${filename}Model
        }
         \n`;
    }
  }

  switch (fileType) {
    case "types":
      return `export type ${normalCaseGenerator(filename)} {
        
      }\n`;

    default:
      return `\n

      import { RequestHandler } from 'express'

        export const ${filename}Middleware : RequestHandler = (req, res, next) => {
            next();
        }

      \n`;
  }
};

const createFile = (
  filename: string,
  filetype: FileTypes,
  filepath: string,
  filter: "default" | "controller" | "router" | "model"
) => {
  try {
    if (filter === "default") {
      return fs.writeFile(
        `${filepath}/${filename}.ts`,
        createData(filetype, filename, filter),
        (err) => {
          if (err) throw new Error(err.message);
          console.log(
            `${normalCaseGenerator(
              filetype
            )} file has been successfully created`
          );
        }
      );
    }

    return fs.writeFile(
      `${filepath}/${filename}.${filter}.ts`,
      createData(filetype, filename, filter),
      (err) => {
        if (err) throw new Error(err.message);
        console.log(
          `${normalCaseGenerator(filetype)} ${normalCaseGenerator(
            filter
          )} file has been successfully created`
        );
      }
    );
  } catch (error: any) {
    return null;
  }
};

const createFolder = async (filename: string, filetype: FileTypes) => {
  try {
    const filePath =
      filetype === "services"
        ? `../src/${filetype}/rest/${filename}`
        : filetype === "middleware"
        ? `../src/${filetype}/general/${filename}`
        : `../src/${filetype}/${filename}`;

    fs.mkdir(filePath, { recursive: true }, (err) => {
      if (err && err.message) throw new Error(err.message);

      if (filetype === "services") {
        createFile(filename, filetype, filePath, "controller");
        createFile(filename, filetype, filePath, "model");
        createFile(filename, filetype, filePath, "router");
        return;
      }

      createFile(filename, filetype, filePath, "default");
      return;
    });
  } catch (error) {
    return null;
  }
};

//Get file type
mod.question(
  "What is the type of the file - ('services | types | middleware')? \n",
  (response) => {
    console.log({ response });
    if (!checkResponseForType(response)) {
      console.log("Response type is invalid");
      return mod.close();
    }

    mod.question(
      "What is the name of the file? (without extension) \n",
      async (fileNameResponse) => {
        if (!checkFileResponseForFileExtension(fileNameResponse)) {
          console.log("Response type is invalid");
          return mod.close();
        }

        await createFolder(fileNameResponse, response as FileTypes);

        return mod.close();
      }
    );
  }
);

//Get file name
// Check what type of file it is - service | middleware | types
// Create file and output file creation done
