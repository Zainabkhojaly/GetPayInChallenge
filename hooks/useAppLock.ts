import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLocked } from '../state/appSlice';
import { RootState } from '../state/store';
import { LOCK_TIMEOUT } from '../config';

export const useAppLock = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLocked = useSelector((state: RootState) => state.app.isLocked);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    if (isAuthenticated && !isLocked) {
      timerId.current = setTimeout(() => {
        dispatch(setLocked(true));
      }, LOCK_TIMEOUT);
    }
  };

  useEffect(() => {
    resetTimer();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        if (timerId.current) clearTimeout(timerId.current);
        if (isAuthenticated) {
          dispatch(setLocked(true));
        }
      } else if (nextAppState === 'active') {
        resetTimer();
      }
    });

    return () => {
      subscription.remove();
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [isAuthenticated, isLocked]);

  return { resetTimer };
};
