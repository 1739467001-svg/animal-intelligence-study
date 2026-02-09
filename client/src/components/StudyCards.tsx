import { useLanguage } from "@/contexts/LanguageContext";
import { Concept, ExamQuestion, QuizQuestion } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Globe, GraduationCap, HelpCircle, Lightbulb, XCircle } from "lucide-react";
import { useState } from "react";
import { Streamdown } from "streamdown";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

export function ConceptCard({ concept }: { concept: Concept }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
      <CardHeader 
        className="cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-1" />
            <CardTitle className="text-xl font-serif">{concept.term}</CardTitle>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-4 space-y-6">
              {/* Definition */}
              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {language === 'zh' ? '定义' : 'Definition'}
                </h4>
                <div className="text-base leading-relaxed pl-6 border-l-2 border-muted">
                  <Streamdown>{concept.definition}</Streamdown>
                </div>
              </div>

              {/* Web Explanation */}
              {concept.webExplanation && (
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {language === 'zh' ? '网络拓展' : 'Web Context'}
                  </h4>
                  <div className="text-base leading-relaxed pl-6 border-l-2 border-blue-200 bg-blue-50/30 py-2 rounded-r-md">
                    <Streamdown>{concept.webExplanation}</Streamdown>
                  </div>
                </div>
              )}

              {/* Lecture Example */}
              {concept.lectureExample && (
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {language === 'zh' ? '课堂案例' : 'Lecture Example'}
                  </h4>
                  <div className="text-base leading-relaxed pl-6 border-l-2 border-green-200 bg-green-50/30 py-2 rounded-r-md">
                    <Streamdown>{concept.lectureExample}</Streamdown>
                  </div>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export function QuizCard({ question }: { question: QuizQuestion }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { language } = useLanguage();

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  return (
    <Card className="border-l-4 border-l-secondary">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold text-secondary uppercase tracking-wider">
            {language === 'zh' ? '测验' : 'Quiz'}
          </span>
        </div>
        <CardTitle className="text-lg font-medium leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, idx) => {
            let variant = "outline";
            let icon = null;
            
            if (selectedOption !== null) {
              if (idx === question.correctAnswer) {
                variant = "default"; // Correct answer always green/primary
                icon = <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />;
              } else if (idx === selectedOption) {
                variant = "destructive"; // Wrong selection
                icon = <XCircle className="w-4 h-4 ml-auto text-destructive" />;
              }
            }

            return (
              <Button
                key={idx}
                variant="outline"
                className={`justify-start h-auto py-3 px-4 text-left whitespace-normal ${
                  selectedOption !== null && idx === question.correctAnswer 
                    ? "border-green-500 bg-green-50 hover:bg-green-50 text-green-900" 
                    : selectedOption === idx && idx !== question.correctAnswer
                    ? "border-destructive bg-destructive/10 hover:bg-destructive/10 text-destructive"
                    : ""
                }`}
                onClick={() => handleOptionClick(idx)}
                disabled={selectedOption !== null}
              >
                <span className="mr-3 font-bold text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                {option}
                {icon}
              </Button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-muted/30 p-4 rounded-lg border border-border mt-4"
            >
              <h4 className="font-bold mb-2 flex items-center gap-2">
                {language === 'zh' ? '解析' : 'Explanation'}
              </h4>
              <p className="text-muted-foreground">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function ExamQuestionCard({ question, section }: { question: ExamQuestion, section?: string }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDetailedAnswer, setShowDetailedAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const { language } = useLanguage();

  return (
    <Card className={`border-l-4 ${section === 'B' ? 'border-l-secondary' : 'border-l-primary'}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <GraduationCap className={`w-5 h-5 ${section === 'B' ? 'text-secondary' : 'text-primary'}`} />
            <span className={`text-sm font-bold uppercase tracking-wider ${section === 'B' ? 'text-secondary' : 'text-primary'}`}>
              {question.year} {language === 'zh' ? '真题' : 'Exam'}
            </span>
            {section && (
              <Badge variant={section === 'B' ? 'secondary' : 'default'} className="ml-2">
                Section {section}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg font-medium leading-relaxed font-serif">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Answer Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {language === 'zh' ? '你的回答：' : 'Your Answer:'}
          </label>
          <Textarea 
            placeholder={language === 'zh' ? '在此输入你的答案...' : 'Type your answer here...'}
            className="min-h-[150px] resize-y font-sans"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </div>

        {/* Answer Toggle */}
        {!showAnswer ? (
          <Button 
            variant="ghost" 
            className="w-full border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 h-auto py-4 text-muted-foreground"
            onClick={() => setShowAnswer(true)}
          >
            {language === 'zh' ? '点击查看参考答案与解析' : 'Click to reveal answer & analysis'}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <h4 className="font-bold mb-3 text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {language === 'zh' ? '参考答案要点' : 'Key Answer Points'}
              </h4>
              <ul className="space-y-2 mb-6">
                {question.modelAnswerPoints.map((point, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>

              {question.detailedAnswer && (
                <div className="border-t border-border/50 pt-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mb-4"
                    onClick={() => setShowDetailedAnswer(!showDetailedAnswer)}
                  >
                    {showDetailedAnswer 
                      ? (language === 'zh' ? '收起详细解析' : 'Hide Detailed Answer')
                      : (language === 'zh' ? '显示详细学术解析' : 'Show Detailed Academic Answer')
                    }
                  </Button>
                  
                  <AnimatePresence>
                    {showDetailedAnswer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-background/50 p-4 rounded-md border border-border/50 text-sm leading-relaxed space-y-2">
                          <Streamdown>{question.detailedAnswer}</Streamdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                setShowAnswer(false);
                setShowDetailedAnswer(false);
              }}
            >
              {language === 'zh' ? '收起答案' : 'Hide Answer'}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
