"use client"
import { QuizWithoutQuestionAnswer } from "@/types/quiz";
import {  useState } from "react";
import Header from "./Header";
import { Button } from "./Button";
import { Eye, Filter, Plus, Search, Star, Trophy, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { QuizCard } from "./QuizCard";
import { FilterBar } from "./FilterBar";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function HomePage({quizes, session, totalUsers}: {quizes: QuizWithoutQuestionAnswer[], session: Session, totalUsers: number }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const topQuizzes = quizes.sort((a,b) => b.quizAttempt.length - a.quizAttempt.length)

  const userQuizzes = quizes.filter(quiz => quiz.createdBy != session.user.id)
  const router = useRouter()
  let totalAttempt = 0
  quizes.forEach(quiz=> {
    totalAttempt += quiz.quizAttempt.length
  })
  // useEffect(() => {
    // Simulate API calls
  //   const mockUserQuizzes = [
  //     {
  //       id: 1,
  //       title: 'JavaScript Fundamentals',
  //       description: 'Test your knowledge of JS basics',
  //       duration: 15,
  //       participants: 234,
  //       rating: 4.8,
  //       created: '2024-06-10'
  //     },
  //     {
  //       id: 2,
  //       title: 'React Hooks Deep Dive',
  //       description: 'Advanced React concepts and patterns',
  //       duration: 25,
  //       participants: 156,
  //       rating: 4.9,
  //       created: '2024-06-08'
  //     }
  //   ];

  //   const mockTopQuizzes = [
  //     {
  //       id: 3,
  //       title: 'World Geography Challenge',
  //       description: 'How well do you know world capitals and landmarks?',
  //       duration: 20,
  //       participants: 1250,
  //       rating: 4.7,
  //       featured: true
  //     },
  //     {
  //       id: 4,
  //       title: 'Science Trivia Masters',
  //       description: 'From physics to biology, test your scientific knowledge',
  //       duration: 30,
  //       participants: 890,
  //       rating: 4.6,
  //       featured: false
  //     },
  //     {
  //       id: 5,
  //       title: 'Movie Buff Challenge',
  //       description: 'Classic films to modern blockbusters',
  //       duration: 18,
  //       participants: 2100,
  //       rating: 4.8,
  //       featured: true
  //     },
  //     {
  //       id: 6,
  //       title: 'History Timeline',
  //       description: 'Major events that shaped our world',
  //       duration: 22,
  //       participants: 445,
  //       rating: 4.5,
  //       featured: false
  //     }
  //   ];

  //   setUserQuizzes(mockUserQuizzes);
  //   setTopQuizzes(mockTopQuizzes);
  // }, []);

  const handlePlayQuiz = (quizId: string) => {
    router.push(`/quiz/play/${quizId}`)
  };

  const showStats = (quizId: string) => {
    router.push(`/quiz/stats/${quizId}`)
  }

  const handleShareQuiz = async (quizId: string, quizName: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(navigator.share && isMobile){
      await navigator.share({
        title: `Quiz on ${quizName}`,
        url: `${window.location.origin}/quiz/${quizId}`
      })
    }else{
      await navigator.clipboard.writeText(`${window.location.origin}/quiz/${quizId}`)
      toast.success("Link coppied to your clipboard")
    }
  };

  const handleCreateQuiz = () => {
    router.push("/quiz/create")
  };

  const filteredQuizzes = topQuizzes.filter(quiz => {
    const matchesSearch = quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeFilter) {
      case 'Popular':
        return matchesSearch;
      case 'Recent':
        return matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header 
          title="QuizMaster Dashboard" 
          subtitle="Create, play, and share amazing quizzes with the world"
        />

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button size="lg" onClick={handleCreateQuiz} className="flex-1 sm:flex-initial">
            <Plus className="w-5 h-5" />
            Create New Quiz
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href={`/quiz/myQuizzes`}>
          <StatsCard 
            icon={Trophy} 
            label="Quizzes Created" 
            value={userQuizzes.length} 
            color="bg-gradient-to-r from-purple-600 to-pink-600"
          />
          </Link>
          <StatsCard 
            icon={Users} 
            label="Total Participants" 
            value={totalUsers}
            color="bg-gradient-to-r from-blue-600 to-cyan-600"
          />
          <StatsCard 
            icon={Eye} 
            label="Quiz Views" 
            value={totalAttempt} 
            color="bg-gradient-to-r from-green-600 to-teal-600"
          />
        </div>

        {/* My Quizzes Section */}
        {userQuizzes.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Quizzes</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userQuizzes.map(quiz => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  onPlay={showStats}
                  onShare={() => handleShareQuiz(quiz.id as string, quiz.name)}
                  isOwned={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Top Quizzes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Discover Quizzes</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter & Search</span>
            </div>
          </div>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                onPlay={handlePlayQuiz}
                onShare={() => handleShareQuiz(quiz.id as string, quiz.name)}
              />
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-2" />
                No quizzes found matching your criteria
              </div>
              <Button variant="ghost" onClick={() => {setSearchTerm(''); setActiveFilter('All');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}