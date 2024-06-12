import { Settings, initialSettings, setSettings } from "./settingsSlice";
import { useEffect } from "react";
import { AppDispatch, RootState, store } from "./store";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./local-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { initialResumeState, setResume } from "./resumeSlice";
import { deepMerge } from "../deep-merge";
import { Resume } from "./types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSaveStateLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });

    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }

    if (state.Settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      ) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  }, []);
};
