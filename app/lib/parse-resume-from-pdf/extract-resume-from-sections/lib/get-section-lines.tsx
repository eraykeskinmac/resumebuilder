import { ResumeSectionToLines } from "../../types";

export const getSectionLinesByKeywords = (
  sections: ResumeSectionToLines,
  keywords: string[]
) => {
  for (const sectionName in sections) {
    const hasKeyword = keywords.some((keyword) =>
      sectionName.toLowerCase().includes(keyword)
    );
    if (hasKeyword) {
      return sections[sectionName];
    }
  }
  return [];
};
