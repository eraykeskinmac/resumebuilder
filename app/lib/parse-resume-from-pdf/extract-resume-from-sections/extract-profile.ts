import {
  hasLetterAndIsAllUpperCase,
  isBold,
} from "../group-lines-into-sections";
import { FeatureSet, ResumeSectionToLines, TextItem } from "../types";

// name
export const matchOnlyLetterSpaceOrPeriod = (item: TextItem) =>
  item.text.match(/^[A-Za-z\s\.]+$/);

//email
export const matchEmail = (item: TextItem) => item.text.match(/\S+@\S+\.\S+/);
const hasAt = (item: TextItem) => item.text.includes("@");

// phone
export const matchPhone = (item: TextItem) =>
  item.text.match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
const hasParenthesis = (item: TextItem) => /\([0-9]+\)/.test(item.text);
export const hasNumber = (item: TextItem) => /[0-9]/.test(item.text);

//Location
export const matchCityAndState = (item: TextItem) =>
  item.text.match(/[A-Z][a-zA-Z\s]+,[A-Z]{2}/);

export const hasComma = (item: TextItem) => item.text.includes(",");

//Url
export const matchUrl = (item: TextItem) => item.text.match(/\S+\.[a-z]+\/S+/);

const matchUrlHttpFallback = (item: TextItem) =>
  item.text.match(/https?:\/\/S+\.\S+/);

const matchUrlWwwFallback = (item: TextItem) =>
  item.text.match(/www\.\S+\.\S+/);
const hasSlash = (item: TextItem) => item.text.includes("/");

//Summary
const has4OrMoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

const NAME_FEATURE_SETS: FeatureSet[] = [
  [matchOnlyLetterSpaceOrPeriod, 3, true],
  [isBold, 2],
  [hasLetterAndIsAllUpperCase, 2],
  [hasAt, -4],
  [hasNumber, -4],
  [hasParenthesis, -4],
  [hasSlash, -4],
  [hasComma, -4],
  [has4OrMoreWords, -2],
];

export const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();
};
