"use client"
import { MouseEvent, useState } from "react";
import { PreviewMode } from "./PreviewQuiz";
import { Button } from "./Button";
import { Eye, Plus, Save } from "lucide-react";
import { QuizHeader } from "./QuizHeader";
import { Question } from "./Question";
import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({
      name: '',
      description: '',
      questionAnswer: [
        {
          question: '',
          options: ['', ''],
          correctOption: ''
        }
      ]
    });
  
    const router = useRouter()
    const [previewMode, setPreviewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const updateQuizName = (name: string) => {
      setQuiz(prev => ({ ...prev, name }));
    };
  
    const updateQuizDescription = (description: string) => {
      setQuiz(prev => ({ ...prev, description }));
    };
  
    const addQuestion = () => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: [
          ...prev.questionAnswer,
          {
            question: '',
            options: ['', ''],
            correctOption: ''
          }
        ]
      }));
    };
  
    const updateQuestion = (questionIndex: number, value: string) => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: prev.questionAnswer.map((q, i) => 
          i === questionIndex ? { ...q, question: value } : q
        )
      }));
    };
  
    const deleteQuestion = (questionIndex: number) => {
      if (quiz.questionAnswer.length > 1) {
        setQuiz(prev => ({
          ...prev,
          questionAnswer: prev.questionAnswer.filter((_, i) => i !== questionIndex)
        }));
      }
    };
  
    const addOption = (questionIndex: number) => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: prev.questionAnswer.map((q, i) => 
          i === questionIndex 
            ? { ...q, options: [...q.options, ''] }
            : q
        )
      }));
    };
  
    const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: prev.questionAnswer.map((q, i) => 
          i === questionIndex 
            ? {
                ...q,
                options: q.options.map((opt, j) => 
                  j === optionIndex ? value : opt
                )
              }
            : q
        )
      }));
    };
  
    const deleteOption = (questionIndex: number, optionIndex: number) => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: prev.questionAnswer.map((q, i) => 
          i === questionIndex && q.options.length > 2
            ? { 
                ...q, 
                options: q.options.filter((_, j) => j !== optionIndex),
                correctOption: q.correctOption === q.options[optionIndex] ? '' : q.correctOption
              }
            : q
        )
      }));
    };
  
    const toggleCorrectOption = (questionIndex: number, optionIndex: number) => {
      setQuiz(prev => ({
        ...prev,
        questionAnswer: prev.questionAnswer.map((q, i) => 
          i === questionIndex 
            ? {
                ...q,
                correctOption: q.correctOption === q.options[optionIndex] ? '' : q.options[optionIndex]
              }
            : q
        )
      }));
    };
  
    const saveQuiz = async () => {
      try {
        setIsLoading(true);
        await axiosInstance.post("/api/v1/quiz/create-quiz", {
          name: quiz.name,
          description: quiz.description,
          questionAnswer: quiz.questionAnswer
        })  
        toast.success("Quiz Created Successfully")
      } catch (error) {
        console.error('Error saving quiz:', error);
        toast.error('Failed to save quiz. Please try again.');
      } finally {
        setIsLoading(false);
        
      }
    };
  
    const togglePreview = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setPreviewMode(!previewMode);
    };
  
    if (previewMode) {
      return <PreviewMode quiz={quiz} onExit={togglePreview} />;
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Create Quiz</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={togglePreview}>
                <Eye size={20} />
                Preview
              </Button>
              <Button variant="primary" onClick={saveQuiz} size="lg" isLoading={isLoading}>
                <Save size={20} />
                {isLoading ? 'Saving...' : 'Save Quiz'}
              </Button>
            </div>
          </div>
  
          <QuizHeader
            name={quiz.name}
            description={quiz.description}
            onNameChange={updateQuizName}
            onDescriptionChange={updateQuizDescription}
          />
  
          {quiz.questionAnswer.map((question, index) => (
            <Question
              key={index}
              question={question}
              questionIndex={index}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onDeleteOption={deleteOption}
              onToggleCorrect={toggleCorrectOption}
            />
          ))}
  
          <div className="flex justify-center">
            <Button variant="primary" onClick={addQuestion} size="lg" className="mb-10">
              <Plus size={20} />
              Add Question
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
