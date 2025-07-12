// CreateViaAi.tsx
import { axiosInstance } from "@/lib/axiosInstance";
import { Button } from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";

interface QuestionAnswer {
  question: string;
  options: string[];
  correctOption: string;
}

interface IQuiz {
  name: string;
  description: string;
  questionAnswer: QuestionAnswer[];
}

export default function CreateViaAi({
  setShowModal,
  setQuiz,
  quiz
}: {
  setShowModal: (show: boolean) => void;
  setQuiz: (quiz: IQuiz) => void;
  quiz: IQuiz;
}) {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Generate Quiz with AI</h2>

        <label className="block text-sm font-medium mb-1">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded-md"
          placeholder="e.g. JavaScript Basics"
        />

        <label className="block text-sm font-medium mb-1">Number of Questions</label>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full mb-4 border px-3 py-2 rounded-md"
          placeholder="e.g. 5"
        />

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              setIsGenerating(true);
              try {
                const res = await axiosInstance.post("/api/v1/quiz/generate-quiz", {
                  topic,
                  count
                });

                const rawText = res.data.generatedQuiz?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!rawText) {
                  toast.error("Invalid Gemini response");
                  return;
                }

                // Strip ```json and ``` from both ends
                const cleanedJson = rawText
                  .replace(/^```json\\n/, '')
                  .replace(/^```json/, '')
                  .replace(/```$/, '')
                  .replace(/\\n```$/, '');

                let parsed;
                try {
                  parsed = JSON.parse(cleanedJson); // should be { quiz: { questionAnswer: [...] } }
                } catch (err) {
                  toast.error("Failed to parse Gemini JSON");
                  console.error("Parsing error:", err);
                  return;
                }

                const aiQuestions: QuestionAnswer[] = parsed.quiz?.questionAnswer;

                if (
                  aiQuestions &&
                  Array.isArray(aiQuestions) &&
                  aiQuestions.every(
                    (q) =>
                      typeof q.question === "string" &&
                      Array.isArray(q.options) &&
                      typeof q.correctOption === "string" &&
                      q.options.includes(q.correctOption)
                  )
                ) {
                  setQuiz({
                    ...quiz,
                    questionAnswer: [...quiz.questionAnswer, ...aiQuestions]
                  });
                  toast.success("AI quiz generated!");
                  setShowModal(false);
                } else {
                  toast.error("AI returned invalid format");
                }
              } catch (err) {
                console.error(err);
                toast.error("Failed to generate quiz");
              } finally {
                setIsGenerating(false);
              }
            }}
            isLoading={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
