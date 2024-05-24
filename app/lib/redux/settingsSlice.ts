import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GeneralSetting } from './settingsSlice';

export interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    workExperinces: boolean;
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  fromToHeading: {
    workExperinces: string;
    educations: string;
    projects: string;
    skills: string;
    custom: string;
  };
  formsOrder: ShowForm[];
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
}

export type ShowForm = keyof Settings['formToShow'];
export type FormWithBulletPoints = keyof Settings['showBulletPoints'];
export type GeneralSetting = Exclude<
  keyof Settings,
  'formToShow' | 'fromToHeading' | 'formsOrder' | 'showBulletPoint'
>;
export const DEFAULT_THEME_COLOR = '#38bdf8';
export const DEFAULT_FONT_FAMILY = 'Roboto';
export const DEFAULT_FONT_SIZE = '11';
export const DEFAULT_FONT_COLOR = '#171717';

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  documentSize: 'Letter',
  formToShow: {
    workExperinces: true,
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  fromToHeading: {
    workExperinces: 'WORK EXPERINCE',
    educations: 'EDUCAITON',
    projects: 'PROJECT',
    skills: 'SKILLS',
    custom: 'CUSTOM SECTIONS',
  },
  formsOrder: ['workExperinces', 'educations', 'projects', 'skills', 'custom'],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
};

export const settingsSlice = createSlice({
  name: 'settings ',
  initialState: initialSettings,
  reducers: {
    changeSettings: (
      draft,
      action: PayloadAction<{ field: GeneralSetting; value: string }>,
    ) => {
      const { field, value } = action.payload;
      draft[field] = value;
    },
  },
});
