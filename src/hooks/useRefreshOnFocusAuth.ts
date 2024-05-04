import { useCallback, useRef } from 'react';

import { useAuth } from '../providers/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';

export function useRefreshOnFocusAuth<T>(refetch: () => Promise<T>) {
  const { isAuthenticated } = useAuth();
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      if (isAuthenticated) {
        refetch();
      }
    }, [isAuthenticated, refetch])
  );
}
