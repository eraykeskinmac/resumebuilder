import { readPdf } from "./read-pdf";

export const parseResumeFromPdf = async (fileUrl: string) => {
  // step 1. Read a pdf resume file into text items to prepare  for processing

  const textItems = await readPdf(fileUrl);

  // step 2. Group text items into lines
};
