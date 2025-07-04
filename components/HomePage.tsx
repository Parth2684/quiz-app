"use client"
import { QuizWithoutQuestionAnswer } from "@/types/quiz";
import { useState, useMemo, useCallback } from "react";
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
import { DeleteModal } from "./DeleteModal";
import { axiosInstance } from "@/lib/axiosInstance";

interface HomePageProps {
  quizes: QuizWithoutQuestionAnswer[];
  session?: Session | null;
  totalUsers: number;
}

export default function HomePage({ quizes, session, totalUsers }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  // Memoized calculations for better performance
  const { userQuizzes, topQuizzes, totalAttempts } = useMemo(() => {
    const userQuizzes = quizes.filter(quiz => quiz.createdById === session?.user.id);
    const topQuizzes = [...quizes].sort((a, b) => b.quizAttempt.length - a.quizAttempt.length);
    const totalAttempts = quizes.reduce((total, quiz) => total + quiz.quizAttempt.length, 0);
    
    return { userQuizzes, topQuizzes, totalAttempts };
  }, [quizes, session?.user.id]);

  // Filtered quizzes with proper search and filter logic
  const popularQuizes = quizes.sort((a, b) => b.quizAttempt.length - a.quizAttempt.length)
  const filteredQuizzes = useMemo(() => {
    return topQuizzes.filter(quiz => {
      const matchesSearch = !searchTerm || 
        quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      switch (activeFilter) {
        case 'Popular':
          return matchesSearch; // Define what makes a quiz popular
        case 'Recent':
          // Assuming there's a createdAt field, otherwise use current logic
          return matchesSearch && quizes.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        case 'My Quizzes':
          return matchesSearch && quiz.createdById === session?.user.id;
        default:
          return matchesSearch;
      }
    });
  }, [topQuizzes, searchTerm, activeFilter, session?.user.id]);

  // Optimized event handlers with useCallback
  const handlePlayQuiz = useCallback((quizId: string) => {
    router.push(`/quiz/play/${quizId}`);
  }, [router]);

  const showStats = useCallback((quizId: string) => {
    router.push(`/quiz/${quizId}/attempts`);
  }, [router]);

  const handleShareQuiz = useCallback(async (quizId: string, quizName: string) => {
    try {
      const shareUrl = `${window.location.origin}/quiz/${quizId}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (navigator.share && isMobile) {
        await navigator.share({
          title: `Quiz: ${quizName}`,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing quiz:', error);
      toast.error("Failed to share quiz. Please try again.");
    }
  }, []);

  const handleCreateQuiz = useCallback(() => {
    if(!session) {
      router.push("/signup")
    }else{
      router.push("/quiz/create");
    }
  }, [router]);

  const handleDeleteQuiz = useCallback(async (quizId: string) => {
    if (!quizId) return;
    
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/api/v1/quiz/delete-quiz/${quizId}`);
      toast.success("Quiz deleted successfully!");
      quizes.filter(quiz => quiz.id !== quizId)
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Could not delete the quiz. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  }, [router]);

  const openDeleteModal = useCallback((quizId: string) => {
    console.log("Delete modal open")
    setSelectedId(quizId);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setSelectedId(null);
    setShowDeleteModal(false);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setActiveFilter('All');
  }, []);

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
          <Button 
            size="lg" 
            onClick={handleCreateQuiz} 
            className="flex-1 sm:flex-initial"
            aria-label="Create a new quiz"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Quiz
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/quiz/myQuizzes" className="block">
            <StatsCard 
              icon={Trophy} 
              label="Quizzes Created" 
              value={userQuizzes.length} 
              color="bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </Link>
          <StatsCard 
            icon={Users} 
            label="Total Users" 
            value={totalUsers}
            color="bg-gradient-to-r from-blue-600 to-cyan-600"
          />
          <StatsCard 
            icon={Eye} 
            label="Quiz Attempts" 
            value={totalAttempts} 
            color="bg-gradient-to-r from-green-600 to-teal-600"
          />
          <StatsCard 
            icon={Star} 
            label="Your Quizzes" 
            value={userQuizzes.length} 
            color="bg-gradient-to-r from-orange-600 to-red-600"
          />
        </div>

        {/* My Quizzes Section */}
        {userQuizzes.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Quizzes</h2>
              <Link href="/quiz/myQuizzes">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userQuizzes.slice(0, 6).map(quiz => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  onPlay={showStats}
                  onShare={() => handleShareQuiz(quiz.id as string, quiz.name)}
                  isOwned={true}
                  onDelete={() => openDeleteModal(quiz.id as string)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Discover Quizzes Section */}
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
                isOwned={quiz.createdById === session?.user.id}
                onDelete={quiz.createdById === session?.user.id ? () => openDeleteModal(quiz.id as string) : undefined}
              />
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg mb-2">No quizzes found</p>
                <p className="text-sm">Try adjusting your search terms or filters</p>
              </div>
              <Button variant="ghost" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {(showDeleteModal === true) && selectedId && (
        <DeleteModal 
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={() => handleDeleteQuiz(selectedId!)}
          itemType="Quiz"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}