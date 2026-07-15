import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { lectures } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, GraduationCap, Users } from "lucide-react";
import { Link } from "wouter";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export default function Home() {
  const { language, t } = useLanguage();

  const scrollToLectures = () => {
    document.getElementById("lectures-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="container relative z-10">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 12, delay: 0.15 }}
            >
              <Brain className="h-8 w-8 animate-float" />
            </motion.div>
            <h1 className="text-shimmer text-4xl font-bold tracking-tight sm:text-6xl pb-2">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("hero.subtitle")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  size="lg"
                  className="group gap-2 h-12 px-8 text-base shadow-lg shadow-primary/20"
                  onClick={scrollToLectures}
                >
                  {t("hero.start")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated aurora background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-drift absolute -top-24 left-1/2 -translate-x-1/2 blur-3xl opacity-25">
            <div
              className="aspect-[1155/678] w-[60rem] bg-gradient-to-tr from-[#1A4D2E] to-[#4F6F52]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="animate-drift-slow absolute top-10 right-0 blur-3xl opacity-20">
            <div className="h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#E85C0D] to-[#E8B04B]" />
          </div>
        </div>
      </section>

      {/* Lectures Grid */}
      <section id="lectures-grid" className="container py-16 sm:py-24">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {lectures.map((lecture) => {
            const content = lecture[language];
            const examCount = (content.sectionA?.length || 0) + (content.sectionB?.length || 0);

            return (
              <motion.div
                key={lecture.id}
                variants={item}
                whileHover={{ y: -8, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.985 }}
              >
                <Link href={`/lecture/${lecture.id}`}>
                  <Card className="group relative h-full cursor-pointer overflow-hidden border-muted/40 bg-card/50 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="aspect-video w-full overflow-hidden bg-muted sheen">
                      <img
                        src={lecture.image}
                        alt={content.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm shadow-sm">
                        {language === "zh" ? `第 ${lecture.week} 讲` : `Week ${lecture.week}`}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {language === "zh" ? `第 ${lecture.week} 讲` : `Lecture ${lecture.week}`}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-1 transition-colors group-hover:text-primary">
                        {content.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {content.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 transition-colors group-hover:text-primary">
                          <Brain className="h-4 w-4" />
                          <span>{content.keyConcepts.length}</span>
                        </div>
                        <div className="flex items-center gap-1 transition-colors group-hover:text-primary">
                          <GraduationCap className="h-4 w-4" />
                          <span>{content.quizQuestions.length}</span>
                        </div>
                        <div className="flex items-center gap-1 transition-colors group-hover:text-primary">
                          <Users className="h-4 w-4" />
                          <span>{examCount}</span>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t("footer.text")}</p>
        </div>
      </footer>
    </div>
  );
}
