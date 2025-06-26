"use client"

import { useState } from "react";
import Header from "./Header";
import { Card } from "./Card";
import { Button } from "./Button";
import { QuizResults } from "./QuizResults";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { axiosInstance } from "@/lib/axiosInstance";
import { IQuizPlay } from "@/types/quiz"
import toast from "react-hot-toast";



interface QuizPlayProps {
    quiz: IQuizPlay      
}

export function QuizPlay ({ quiz }: QuizPlayProps ) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const currentOptions = quiz.options.filter(opt => opt.questionId === currentQuestion.id)
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const canProceed = answers[currentQuestion.id];

    const handleAnswerSelect = (questionId: string, optionId: string) => {
        setAnswers(prev => ({
        ...prev,
        [questionId]: optionId
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
        handleSubmitQuiz();
        } else {
        setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        setIsSubmitting(true);
        
        const answersArray = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId
        }));

        
        const result = await axiosInstance.post(`/api/v1/quiz/submit-quiz/`, {
            quizId: quiz.id,
            answersArray
        });
        
        if (result.status == 200) {
        setResults(result);
        setQuizCompleted(true);
        } else {
            console.error(result.statusText)
        toast.error('Failed to submit quiz. Please try again.');
        }
        
        setIsSubmitting(false);
    };

    if (quizCompleted && results) {
        return (
        <div className="container mx-auto px-4 py-8">
            <QuizResults
            quiz={quiz}
            results={results}
            answers={answers}
            timeElapsed={timeElapsed}
            />
        </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <Header 
            title={quiz.name}
            subtitle={quiz.description || `Created by ${quiz.createdBy.name}`}
        />

        <div className="max-w-4xl mx-auto space-y-8">
            <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quiz.questions.length}
            answered={Object.keys(answers).length}
            />

            <Card>
            <QuizQuestion
                question={currentQuestion}
                options= {currentOptions}
                selectedOptionId={answers[currentQuestion.id]}
                onAnswerSelect={handleAnswerSelect}
                questionNumber={currentQuestionIndex + 1}
            />

            <div className="flex justify-between items-center mt-8">
                <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                >
                Previous
                </Button>

                <div className="text-center text-gray-300">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>

                <Button
                onClick={handleNext}
                disabled={!canProceed}
                isLoading={isSubmitting}
                variant={isLastQuestion ? "primary" : "secondary"}
                >
                {isLastQuestion ? 'Submit Quiz' : 'Next'}
                </Button>
            </div>
            </Card>
        </div>
    </div>
    )
} 
