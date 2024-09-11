import { ResumeWorkExperience } from "../../redux/types";
import { hasNumber } from "./extract-profile";
import {
  getBulletPointsFromLines,
  getDescriptionLineIdx,
} from "./lib/bullet-point";
import {
  DATE_FEATURE_SETS,
  getHasText,
} from "./lib/common-feature";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";
import { getSectionLinesByKeywords } from "./lib/get-section-lines";
import { divideSectionIntoSubsection } from "./lib/subsection";
import { isBold } from "../group-lines-into-sections";
import { FeatureSet, ResumeSectionToLines, TextItem } from "../types";

const WORK_EXPERIENCE_KEYWORDS_LOWERCASE = [
  "work",
  "experince",
  "employment",
  "history",
  "job",
];

const JOB_TITLES = [
  "Analyst",
  "Agent",
  "Administrator",
  "Architect",
  "Assistant",
  "Associate",
  "CTO",
];

const hasJobTitle = (item: TextItem) =>
  JOB_TITLES.some((jobTitle) =>
    item.text.split(/\s/).some((word) => word === jobTitle)
  );

const hasMoreThan5Words = (item: TextItem) => item.text.split(/\s/).length > 5;

const JOB_TITLE_FEATURE_LIST: FeatureSet[] = [
  [hasJobTitle, 4],
  [hasNumber, -4],
  [hasMoreThan5Words, -2],
];

export const extractWorkExperince = (sections: ResumeSectionToLines) => {
  const workExperince: ResumeWorkExperience[] = [];
  const workExperinceScores = [];
  const lines = getSectionLinesByKeywords(
    sections,
    WORK_EXPERIENCE_KEYWORDS_LOWERCASE
  );

  const subsections = divideSectionIntoSubsection(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLinesIdx = getDescriptionLineIdx(subsectionLines) ?? 2;

    const subsectionInfoTextItem = subsectionLines
      .slice(0, descriptionsLinesIdx)
      .flat();

    const [date, dateScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItem,
      DATE_FEATURE_SETS
    );

    const [jobTitle, jobTitleScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItem,
      JOB_TITLE_FEATURE_LIST
    );

    const COMPANY_FEATURE_SET: FeatureSet[] = [
      [isBold, 2],
      [getHasText(date), -4],
      [getHasText(jobTitle), -4],
    ];

    const [company, companyScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItem,
      COMPANY_FEATURE_SET,
      false
    );

    const subsectionDescriptionLines =
      subsectionLines.slice(descriptionsLinesIdx);
    const descriptions = getBulletPointsFromLines(subsectionDescriptionLines);

    workExperince.push({ company, jobTitle, date, descriptions });
    workExperinceScores.push({
      companyScores,
      jobTitleScores,
      dateScores,
    });
  }

  return { workExperince, workExperinceScores };
};
