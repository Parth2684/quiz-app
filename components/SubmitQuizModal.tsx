'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface QuizSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  answeredQuestions: number;
  quizName: string;
  isSubmitting?: boolean;
}

export function QuizSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredQuestions,
  quizName,
  isSubmitting = false
}: QuizSubmitModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const unansweredCount = totalQuestions - answeredQuestions;
  const hasUnanswered = unansweredCount > 0;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <Card className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Submit Quiz?
            </h2>
            <p className="text-gray-300">
              {quizName}
            </p>
          </div>

          {/* Quiz Stats */}
          <div className="space-y-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Questions:</span>
                <span className="text-white font-semibold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Answered:</span>
                <span className="text-green-400 font-semibold">{answeredQuestions}</span>
              </div>
              {hasUnanswered && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Unanswered:</span>
                  <span className="text-yellow-400 font-semibold">{unansweredCount}</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Completion</span>
                <span>{Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Warning for unanswered questions */}
            {hasUnanswered && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-yellow-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm">
                      Incomplete Quiz
                    </p>
                    <p className="text-yellow-300 text-sm mt-1">
                      You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. 
                      These will be marked as incorrect.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Review Answers
            </Button>
            <Button
              onClick={handleConfirm}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              Once submitted, you cannot change your answers
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}