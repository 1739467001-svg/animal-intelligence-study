import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { lectures } from "@/lib/data";
import { ArrowRight, BookOpen, Brain, GraduationCap, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { language, t } = useLanguage();

  const scrollToLectures = () => {
    const element = document.getElementById('lectures-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 pb-2">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="gap-2 h-12 px-8 text-base" onClick={scrollToLectures}>
                {t('hero.start')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
      </section>

      {/* Lectures Grid */}
      <section id="lectures-grid" className="container py-16 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lectures.map((lecture) => {
            const content = lecture[language];
            const examCount = (content.sectionA?.length || 0) + (content.sectionB?.length || 0);
            
            return (
              <Link key={lecture.id} href={`/lecture/${lecture.id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-muted/40 bg-card/50 backdrop-blur-sm">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img 
                      src={lecture.image} 
                      alt={content.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> 
                        {language === 'zh' ? `第 ${lecture.week} 讲` : `Lecture ${lecture.week}`}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                      {content.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {content.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Brain className="h-4 w-4" />
                        <span>{content.keyConcepts.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{content.quizQuestions.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{examCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t('footer.text')}</p>
        </div>
      </footer>
    </div>
  );
}
