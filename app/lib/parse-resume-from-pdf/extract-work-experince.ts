import { ResumeWorkExperience } from "../redux/types";
import { getSectionLinesByKeywords } from "./extract-resume-from-sections/lib/get-section-lines";
import { divideSectionIntoSubsection } from "./extract-resume-from-sections/lib/subsection";
import { ResumeSectionToLines } from "./types";

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

export const extractWorkExperince = (sections: ResumeSectionToLines) => {
  const workExperince: ResumeWorkExperience[] = [];
  const workExperinceScores = [];
  const lines = getSectionLinesByKeywords(
    sections,
    WORK_EXPERIENCE_KEYWORDS_LOWERCASE
  );

  const subsections = divideSectionIntoSubsection(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLinesIdx = 
  }
};
