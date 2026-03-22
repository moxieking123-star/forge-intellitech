// ============================================
// FORM SUBMISSION HOOK - CONNECTED TO API
// ============================================

import { useState, useCallback } from 'react';

interface UseFormSubmitOptions {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

export function useFormSubmit(options: UseFormSubmitOptions) {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    success: false,
    error: null,
  });

  const submitForm = useCallback(async (formData: Record<string, unknown>) => {
    setState({
      isLoading: true,
      success: false,
      error: null,
    });

    try {
      const response = await fetch(options.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setState({
        isLoading: false,
        success: true,
        error: null,
      });

      if (options.onSuccess) {
        options.onSuccess();
      }

      return { success: true, error: null };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      
      setState({
        isLoading: false,
        success: false,
        error: errorMessage,
      });

      if (options.onError) {
        options.onError(errorMessage);
      }

      return { success: false, error: errorMessage };
    }
  }, [options]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      success: false,
      error: null,
    });
  }, []);

  return {
    submitForm,
    reset,
    isLoading: state.isLoading,
    success: state.success,
    error: state.error,
  };
}