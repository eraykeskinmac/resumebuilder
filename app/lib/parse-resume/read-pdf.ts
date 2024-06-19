import { TextItems } from "./types";
import * as pdfjs from "pdfjs-dist";

export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const pdffile = await pdfjs.getDocument(fileUrl).promise;
  let textItems: TextItems = [];

  for (let i = 1; i <= pdffile.numPages; i++) {
    const page = await pdffile.getPage(i);
    const textContent = await page.getTextContent();

    await page.getOperatorList();
    const commonObjs = page.commonObjs;

    const pageTextItems = textContent.items.map((item) => {});
  }
};
