import { ConceptCard, ExamQuestionCard, QuizCard } from "@/components/StudyCards";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { lectures } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, GraduationCap, HelpCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";

export default function LectureDetail() {
  const [, params] = useRoute("/lecture/:id");
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  
  const lecture = lectures.find(l => l.id === params?.id);

  // Preload image
  useEffect(() => {
    if (lecture?.image) {
      const img = new Image();
      img.src = lecture.image;
    }
  }, [lecture?.image]);

  // Jump to the top when navigating between lectures
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params?.id]);

  if (!lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif font-bold">Lecture Not Found</h1>
          <Button onClick={() => setLocation("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const content = lecture[language];

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      {/* Header */}
      <header className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={lecture.image} 
            alt={content.title} 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 w-fit mb-6 pl-0"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t('back.home')}
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium backdrop-blur-sm">
                {language === 'zh' ? `第 ${lecture.week} 讲` : `Lecture ${lecture.week}`}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="container mt-12">
        <Tabs defaultValue="concepts" className="space-y-8">
          <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 h-auto rounded-none space-x-8 overflow-x-auto">
            <TabsTrigger 
              value="concepts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-lg font-serif text-muted-foreground data-[state=active]:text-foreground transition-all whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t('lecture.concepts')}
            </TabsTrigger>
            <TabsTrigger 
              value="quiz"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-lg font-serif text-muted-foreground data-[state=active]:text-foreground transition-all whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              {t('lecture.quiz')}
            </TabsTrigger>
            <TabsTrigger 
              value="exam"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-lg font-serif text-muted-foreground data-[state=active]:text-foreground transition-all whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              {t('lecture.exam')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concepts" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-6">
              {content.keyConcepts.map((concept: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ConceptCard concept={concept} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-8 max-w-3xl">
              {content.quizQuestions.length > 0 ? (
                content.quizQuestions.map((q: any, idx: number) => (
                  <QuizCard key={q.id} question={q} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                  <p>{language === 'zh' ? '本讲座暂无测验题目。' : 'No quiz questions available for this lecture yet.'}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="exam" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section A: Shorter Questions */}
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h2 className="text-2xl font-serif font-bold">Section A: Shorter Questions</h2>
                <p className="text-muted-foreground mt-1">
                  {language === 'zh' 
                    ? '简答题（约100-250词）：重点考察核心概念的定义与理解。' 
                    : 'Focus on definitions and understanding of core concepts (~100-250 words).'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 max-w-3xl">
                {content.sectionA && content.sectionA.length > 0 ? (
                  content.sectionA.map((q: any, idx: number) => (
                    <ExamQuestionCard key={q.id} question={q} section="A" />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                    <p>{language === 'zh' ? '本部分暂无题目。' : 'No questions available for this section.'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Section B: Longer Questions */}
            <div className="space-y-6">
              <div className="border-l-4 border-secondary pl-4 py-1">
                <h2 className="text-2xl font-serif font-bold">Section B: Longer Questions</h2>
                <p className="text-muted-foreground mt-1">
                  {language === 'zh' 
                    ? '设计与论述题（约300-350词）：要求结合理论设计实验或深入阐述观点。' 
                    : 'Design and essay questions (~300-350 words): Require applying theory to design experiments or discuss in depth.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 max-w-3xl">
                {content.sectionB && content.sectionB.length > 0 ? (
                  content.sectionB.map((q: any, idx: number) => (
                    <ExamQuestionCard key={q.id} question={q} section="B" />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                    <p>{language === 'zh' ? '本部分暂无题目。' : 'No questions available for this section.'}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
