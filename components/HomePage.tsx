"use client";
import { QuizWithoutQuestionAnswer } from "@/types/quiz";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
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
  session?: Session | null;
  totalUsers: number;
  totalQuizCount: number
}

export default function HomePage({ session, totalUsers, totalQuizCount }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quizes, setQuizes] = useState<QuizWithoutQuestionAnswer[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [userQuizzesLength, setUserQuizzesLength] = useState(0)

  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreQuizzes = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const res = await axiosInstance.get(`/api/v1/home?page=${page}`);
      const newQuizzes = res.data.quizzes;
      const total = res.data.total;
      setUserQuizzesLength(res.data.userQuizzes)

      setQuizes(prev => {
        const existingIds = new Set(prev.map(q => q.id));
        const dedupedNew = newQuizzes.filter((q: any) => !existingIds.has(q.id));
        return [...prev, ...dedupedNew];
      });

      if ((page + 1) * 9 >= total || newQuizzes.length === 0) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load quizzes", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, page]);

  useEffect(() => {
    loadMoreQuizzes();
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
        loadMoreQuizzes();
      }
    });

    if (loaderRef.current) observer.current.observe(loaderRef.current);

    return () => observer.current?.disconnect();
  }, [loadMoreQuizzes, hasMore, isLoadingMore]);

  const { userQuizzes, totalAttempts } = useMemo(() => {
    const userQuizzes = quizes.filter(quiz => quiz.createdById == session?.user.id)
    const totalAttempts = quizes.reduce((acc, quiz) => acc + quiz.quizAttempt.length, 0);
    return { userQuizzes, totalAttempts };
  }, [quizes, session?.user.id]);

  const filteredQuizzes = useMemo(() => {
    let filtered = quizes.filter(quiz => {
      const matchesSearch =
        !searchTerm ||
        quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === "My Quizzes") {
        return quiz.createdById === session?.user.id;
      }

      return true;
    });

    switch (activeFilter) {
      case "Popular":
        return [...filtered].sort((a, b) => b.quizAttempt.length - a.quizAttempt.length);
      case "Recent":
        return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "All":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [quizes, searchTerm, activeFilter, session?.user.id]);

  const handlePlayQuiz = useCallback(
    (quiz: QuizWithoutQuestionAnswer, createdById: string) => {
      if (createdById === session?.user.id) {
        router.push(`/quiz/${quiz.id}/attempts`);
      }else {
        const userAttempt = quiz.quizAttempt.find(
          (attempt) => attempt.userId === session?.user.id
        );
  
        if (userAttempt) {
          router.push(`/quiz/${quiz.id}/attempts/${userAttempt.id}`);
        }
       else {
        router.push(`/quiz/play/${quiz.id}`);
      }
    }
    },
    [router, session?.user.id]
  );

  const handleShareQuiz = useCallback(async (quizId: string, quizName: string) => {
    try {
      const shareUrl = `${window.location.origin}/quiz/play/${quizId}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (navigator.share && isMobile) {
        await navigator.share({ title: `Quiz: ${quizName}`, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing quiz:", error);
      toast.error("Failed to share quiz. Please try again.");
    }
  }, []);

  const handleCreateQuiz = useCallback(() => {
    if (!session) {
      router.push("/signup");
    } else {
      router.push("/quiz/create");
    }
  }, [router, session]);

  const handleDeleteQuiz = useCallback(async (quizId: string) => {
    if (!quizId) return;

    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/api/v1/quiz/delete-quiz/${quizId}`);
      toast.success("Quiz deleted successfully!");
      setQuizes(prev => prev.filter(quiz => quiz.id !== quizId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not delete the quiz. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  }, []);

  const openDeleteModal = useCallback((quizId: string) => {
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
        <Header title="Dashboard" subtitle="Create, play, and share amazing quizzes with the world" />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button size="lg" onClick={handleCreateQuiz} className="flex-1 sm:flex-initial">
            <Plus className="w-5 h-5 mr-2" /> Create New Quiz
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/quiz/myQuizzes" className="block">
            <StatsCard icon={Trophy} label="Your Quizzes" value={userQuizzesLength} color="bg-gradient-to-r from-purple-600 to-pink-600" />
          </Link>
          <StatsCard icon={Users} label="Total Users" value={totalUsers} color="bg-gradient-to-r from-blue-600 to-cyan-600" />
          <StatsCard icon={Eye} label="Quiz Attempts" value={totalAttempts} color="bg-gradient-to-r from-green-600 to-teal-600" />
          <StatsCard icon={Star} label="Total Quizzes" value={totalQuizCount} color="bg-gradient-to-r from-orange-600 to-red-600" />
        </div>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Discover Quizzes</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter & Search</span>
            </div>
          </div>

          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className="grid grid-cols-1 sm:w-[85%] md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPlay={handlePlayQuiz}
                onShare={() => handleShareQuiz(quiz.id as string, quiz.name)}
                isOwned={quiz.createdById === session?.user.id}
                isAttempted={quiz.quizAttempt.some(attempt => attempt.userId === session?.user.id)}
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
              <Button variant="ghost" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}

          {hasMore && <div ref={loaderRef} className="h-10" />}
        </section>
      </div>

      {showDeleteModal && selectedId && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={() => handleDeleteQuiz(selectedId)}
          itemType="Quiz"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
