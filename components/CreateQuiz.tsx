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
import CreateViaAi from "./CreateViaAi";



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
    const [showAiModal, setShowAiModal] = useState(false);

  
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
        router.push("/home")
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
          <h1 className="text-2xl font-bold text-white">Create Quiz</h1>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setShowAiModal(true)} size="sm">
              ✨ Generate with AI
            </Button>

            <Button variant="outline" size="sm" onClick={togglePreview}>
              <Eye size={20} />
              Preview
            </Button>

            <Button variant="primary" onClick={saveQuiz} size="sm" isLoading={isLoading}>
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
  
            <div className="flex justify-center gap-4 mb-10">
            <Button variant="primary" onClick={addQuestion} size="md">
              <Plus size={20} />
              Add Question
            </Button>

            <Button variant="secondary" onClick={() => setShowAiModal(true)} size="md">
              ✨ Generate with AI
            </Button>
            {showAiModal && (
            <CreateViaAi 
              setShowModal={setShowAiModal} 
              setQuiz={setQuiz}
              quiz={quiz}
            />
          )}

          </div>

        </div>
      </div>
    );
  };
  
