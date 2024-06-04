import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperince,
} from './types';

export const initialProfile: ResumeProfile = {
  name: '',
  summary: '',
  email: '',
  phone: '',
  location: '',
  url: '',
};

export const initialWorkExperince: ResumeWorkExperince = {
  company: '',
  jobTitle: '',
  date: '',
  description: [],
};

export const initialEducation: ResumeEducation = {
  school: '',
  date: '',
  degree: '',
  gpa: '',
  description: [],
};

export const initialProject: ResumeProject = {
  project: '',
  date: '',
  description: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: '', rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});

export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  description: [],
};

export const initialCustom = {
  description: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperince: [initialWorkExperince],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
};

export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, 'description'>;
      value: string;
    }
  | {
      field: 'description';
      value: string[];
    }
);

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>,
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperince: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperince>
      >,
    ) => {
      const { idx, field, value } = action.payload;
      const workExperince = draft.workExperince[idx];
      workExperince[field] = value as any;
    },
  },
});
