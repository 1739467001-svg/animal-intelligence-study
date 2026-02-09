import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    "app.title": "Animal Intelligence Study Guide",
    "app.subtitle": "A comprehensive revision guide for the final exam",
    "nav.home": "Home",
    "nav.start": "Start Revision",
    "lecture.week": "Week",
    "lecture.concepts": "Key Concepts",
    "lecture.quiz": "Quiz",
    "lecture.exam": "Exam Questions",
    "quiz.check": "Check Answer",
    "quiz.correct": "Correct!",
    "quiz.incorrect": "Incorrect. Try again.",
    "exam.modelAnswer": "Model Answer Points",
    "back.home": "Back to Lectures",
    "hero.title": "Animal Intelligence",
    "hero.subtitle": "Explore the mysteries from tiny brains to collective wisdom. A deep, interactive revision guide.",
    "hero.start": "Start Learning",
    "footer.text": "Created for Animal Intelligence Revision 2026"
  },
  zh: {
    "app.title": "动物智能复习指南",
    "app.subtitle": "期末考试综合复习指南",
    "nav.home": "首页",
    "nav.start": "开始复习",
    "lecture.week": "第几周",
    "lecture.concepts": "核心概念",
    "lecture.quiz": "测验",
    "lecture.exam": "考试真题",
    "quiz.check": "检查答案",
    "quiz.correct": "回答正确！",
    "quiz.incorrect": "回答错误，请重试。",
    "exam.modelAnswer": "参考答案要点",
    "back.home": "返回讲座列表",
    "hero.title": "动物智能",
    "hero.subtitle": "探索从小脑袋的意外智能到群体智慧的奥秘。一份深度交互的期末复习指南。",
    "hero.start": "开始学习",
    "footer.text": "为2026年动物智能期末复习制作"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as requested

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
