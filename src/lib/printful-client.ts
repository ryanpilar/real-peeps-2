import { PrintfulClient } from "printful-request";
// const { PrintfulClient } = require("printful-request");

export const printful = new PrintfulClient(process.env.PRINTFUL_API_KEY);
