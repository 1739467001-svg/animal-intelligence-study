import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { computeReport, resetProgress, type Level, type Report } from "@/lib/progress";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Brain,
  GraduationCap,
  Printer,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const SHORT_LABELS: Record<string, { en: string; zh: string }> = {
  method: { en: "Methods", zh: "方法论" },
  embodiment: { en: "Embodiment", zh: "具身认知" },
  collective: { en: "Collective", zh: "集体智能" },
  perception: { en: "Perception", zh: "主动视觉" },
  navigation: { en: "Navigation", zh: "空间导航" },
  tooluse: { en: "Tool Use", zh: "工具使用" },
  evolution: { en: "Evolution", zh: "脑演化" },
};

const LEVEL_META: Record<Level, { en: string; zh: string; className: string }> = {
  mastered: {
    en: "Proficient",
    zh: "精通",
    className: "bg-primary text-primary-foreground border-transparent",
  },
  developing: {
    en: "Developing",
    zh: "熟练",
    className: "bg-secondary text-secondary-foreground border-transparent",
  },
  emerging: {
    en: "Emerging",
    zh: "入门",
    className: "bg-muted text-muted-foreground border-transparent",
  },
  notStarted: {
    en: "Not started",
    zh: "未开始",
    className: "bg-transparent text-muted-foreground border-dashed",
  },
};

function StatTile({
  icon: Icon,
  value,
  label,
  sub,
}: {
  icon: typeof Brain;
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold font-serif leading-none">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{label}</div>
          {sub && <div className="text-xs text-muted-foreground/70">{sub}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LearningReport() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [tick, setTick] = useState(0);

  const report: Report = useMemo(
    () => computeReport(language),
    // recompute when language changes or after a reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, tick],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const zh = language === "zh";
  const today = new Date().toLocaleDateString(zh ? "zh-CN" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const radarData = report.competencies.map((c) => ({
    subject: SHORT_LABELS[c.key]?.[language] ?? c.label,
    score: c.score,
  }));

  const strengths = report.competencies.filter((c) => c.level === "mastered" || c.level === "developing");

  const handleReset = () => {
    const msg = zh
      ? "确定要清空所有学习记录吗？此操作无法撤销。"
      : "Clear all study progress? This cannot be undone.";
    if (window.confirm(msg)) {
      resetProgress();
      setTick((t) => t + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      {/* Header band */}
      <header className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-drift absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="container py-10">
          <Button
            variant="ghost"
            className="mb-6 w-fit pl-0 text-muted-foreground hover:text-foreground print:hidden"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {zh ? "返回首页" : "Back to Home"}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
                <Sparkles className="h-4 w-4" />
                {zh ? "实时学习报告" : "Live Learning Report"}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                {zh ? "动物智能 · 能力报告" : "Animal Intelligence · Competency Report"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {zh ? `生成于 ${today} · 基于你的学习记录实时计算` : `Generated ${today} · computed live from your study record`}
              </p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                {zh ? "打印 / 导出" : "Print / Export"}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {zh ? "重置进度" : "Reset"}
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mt-10 space-y-12">
        {!report.hasActivity ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-serif font-bold">
                {zh ? "还没有学习记录" : "No study activity yet"}
              </h2>
              <p className="max-w-md text-muted-foreground">
                {zh
                  ? "去做几道测验、展开概念、写下你对真题的回答，报告会实时反映你在各项能力上的掌握情况。"
                  : "Answer some quizzes, explore concepts and draft exam answers — this report will reflect your competencies in real time."}
              </p>
              <Button onClick={() => setLocation("/")} className="mt-2">
                {zh ? "开始学习" : "Start studying"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overall score + stat tiles */}
            <section className="grid gap-6 lg:grid-cols-[1.1fr_2fr]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Card className="h-full overflow-hidden">
                  <CardContent className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
                    <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {zh ? "综合掌握度" : "Overall Mastery"}
                    </div>
                    <div className="relative flex h-40 w-40 items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--muted)" strokeWidth="8" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 44}
                          initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - report.overall.overallScore / 100) }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-4xl font-bold font-serif">{report.overall.overallScore}</span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                <StatTile
                  icon={GraduationCap}
                  value={`${report.overall.quizCorrect}/${report.overall.quizAnswered || 0}`}
                  label={zh ? "测验答对 / 已作答" : "Quiz correct / answered"}
                  sub={zh ? `正确率 ${report.overall.correctRate}%` : `${report.overall.correctRate}% accuracy`}
                />
                <StatTile
                  icon={TrendingUp}
                  value={`${report.overall.quizAnswered}/${report.overall.quizTotal}`}
                  label={zh ? "测验覆盖" : "Quiz coverage"}
                />
                <StatTile
                  icon={Brain}
                  value={`${report.overall.conceptsExplored}/${report.overall.conceptsTotal}`}
                  label={zh ? "已探索概念" : "Concepts explored"}
                />
                <StatTile
                  icon={BookOpen}
                  value={`${report.overall.examAttempted}/${report.overall.examTotal}`}
                  label={zh ? "已练习真题" : "Exam questions attempted"}
                />
              </div>
            </section>

            {/* Competency radar + list */}
            <section className="grid items-start gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-serif">
                    <Award className="h-5 w-5 text-primary" />
                    {zh ? "能力雷达图" : "Competency Radar"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} outerRadius="72%">
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          dataKey="score"
                          stroke="var(--primary)"
                          fill="var(--primary)"
                          fillOpacity={0.25}
                          strokeWidth={2}
                          isAnimationActive
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {report.competencies.map((c, i) => {
                  const meta = LEVEL_META[c.level];
                  return (
                    <motion.div
                      key={c.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="transition-shadow hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="mb-1 flex items-center justify-between gap-3">
                            <h3 className="font-semibold">{c.label}</h3>
                            <Badge variant="outline" className={meta.className}>
                              {meta[language]}
                            </Badge>
                          </div>
                          <p className="mb-3 text-sm text-muted-foreground">{c.description}</p>
                          <div className="flex items-center gap-3">
                            <Progress value={c.score} className="h-2" />
                            <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums">
                              {c.score}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Narrative summary */}
            <section>
              <Card className="border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-serif">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {zh ? "能力小结" : "Summary of Abilities"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-[15px] leading-relaxed">
                  {strengths.length > 0 ? (
                    <>
                      <p>
                        {zh
                          ? `根据你的学习记录，你在 ${report.lectures.length} 讲内容中的综合掌握度为 ${report.overall.overallScore}/100，测验正确率 ${report.overall.correctRate}%。你已经具备以下能力：`
                          : `Based on your record, your overall mastery across ${report.lectures.length} lectures is ${report.overall.overallScore}/100, with ${report.overall.correctRate}% quiz accuracy. You have demonstrated the following abilities:`}
                      </p>
                      <ul className="space-y-2">
                        {strengths.map((c) => (
                          <li key={c.key} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>
                              <span className="font-medium">{c.label}</span>
                              <span className="text-muted-foreground">
                                {" — "}
                                {LEVEL_META[c.level][language]}
                                {" · "}
                                {c.description}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>
                      {zh
                        ? "你已经开始学习，但还没有任何能力达到「熟练」水平。多做测验、探索概念并练习真题，即可在这里点亮你的能力。"
                        : "You've started, but no competency has reached the 'Developing' level yet. Keep answering quizzes and exploring concepts to light up your abilities here."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Per-lecture breakdown */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold">
                {zh ? "各讲掌握情况" : "Mastery by Lecture"}
              </h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {report.lectures.map((l) => (
                      <div key={l.id} className="flex items-center gap-4 p-4">
                        <div className="w-8 shrink-0 text-center text-sm font-bold text-muted-foreground">
                          {l.week}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium">{l.title}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {zh
                              ? `测验 ${l.quizCorrect}/${l.quizTotal} 正确 · 概念 ${l.conceptsExplored}/${l.conceptsTotal} · 真题 ${l.examAttempted}/${l.examTotal}`
                              : `Quiz ${l.quizCorrect}/${l.quizTotal} · Concepts ${l.conceptsExplored}/${l.conceptsTotal} · Exam ${l.examAttempted}/${l.examTotal}`}
                          </div>
                        </div>
                        <div className="hidden w-40 sm:block">
                          <Progress value={l.mastery} className="h-2" />
                        </div>
                        <div className="w-12 shrink-0 text-right text-sm font-semibold tabular-nums">
                          {l.mastery}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <p className="text-center text-xs text-muted-foreground">
              {zh
                ? "本报告根据浏览器本地保存的学习记录实时生成，数据仅存储在你的设备上。"
                : "This report is generated in real time from study progress saved locally in your browser."}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
