import { lectures as allLectures, type Lecture } from "@/lib/data";

/** localStorage key helpers — must match the keys written by the study cards. */
export const quizKey = (id: string) => `ais.quiz.${id}`;
export const examKey = (id: string) => `ais.exam.${id}`;
export const conceptKey = (lectureId: string, term: string) => `ais.concept.${lectureId}::${term}`;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export type Level = "mastered" | "developing" | "emerging" | "notStarted";

export interface LectureProgress {
  id: string;
  week: number;
  title: string;
  quizTotal: number;
  quizAnswered: number;
  quizCorrect: number;
  examTotal: number;
  examAttempted: number;
  conceptsTotal: number;
  conceptsExplored: number;
  mastery: number; // 0-100
}

export interface Competency {
  key: string;
  label: string;
  description: string;
  lectureIds: string[];
  score: number; // 0-100
  level: Level;
}

export interface Report {
  hasActivity: boolean;
  overall: {
    quizTotal: number;
    quizAnswered: number;
    quizCorrect: number;
    correctRate: number; // 0-100 of answered
    examTotal: number;
    examAttempted: number;
    conceptsTotal: number;
    conceptsExplored: number;
    overallScore: number; // 0-100
  };
  lectures: LectureProgress[];
  competencies: Competency[];
}

export function levelOf(score: number): Level {
  if (score >= 80) return "mastered";
  if (score >= 50) return "developing";
  if (score > 0) return "emerging";
  return "notStarted";
}

/** Course-level competencies, each drawing on one or more lectures. */
interface CompetencyDef {
  key: string;
  lectureIds: string[];
  label: { en: string; zh: string };
  description: { en: string; zh: string };
}

const COMPETENCY_DEFS: CompetencyDef[] = [
  {
    key: "method",
    lectureIds: ["lecture-1", "lecture-2", "lecture-4"],
    label: { en: "Research Methods for Intelligence", zh: "智能研究方法论" },
    description: {
      en: "Define intelligence bottom-up, apply Morgan's Canon, and use models as existence proofs.",
      zh: "从自下而上视角定义智能，运用摩根公理与建模（存在证明）分析行为。",
    },
  },
  {
    key: "embodiment",
    lectureIds: ["lecture-1", "lecture-7"],
    label: { en: "Embodiment & Situated Cognition", zh: "具身与情境认知" },
    description: {
      en: "Explain how body and environment simplify cognition; reason about DOF and forward models.",
      zh: "理解身体与环境如何简化认知，掌握自由度问题与前向模型。",
    },
  },
  {
    key: "collective",
    lectureIds: ["lecture-3"],
    label: { en: "Collective Intelligence", zh: "集体智能与自组织" },
    description: {
      en: "Explain how stigmergy and self-organisation produce group behaviour from local rules.",
      zh: "解释共识主动性与自组织如何从局部规则涌现群体行为。",
    },
  },
  {
    key: "perception",
    lectureIds: ["lecture-5"],
    label: { en: "Active Vision & Perception", zh: "感知与主动视觉" },
    description: {
      en: "Use optic flow and motion parallax to explain and design visually guided behaviour.",
      zh: "运用光流与运动视差解释并设计视觉导引行为。",
    },
  },
  {
    key: "navigation",
    lectureIds: ["lecture-6"],
    label: { en: "Spatial Navigation", zh: "空间导航" },
    description: {
      en: "Distinguish path integration, snapshot homing and cognitive-map strategies.",
      zh: "区分路径积分、快照归巢与认知地图等导航策略。",
    },
  },
  {
    key: "tooluse",
    lectureIds: ["lecture-8"],
    label: { en: "Tool Use & Folk Physics", zh: "工具使用与物理认知" },
    description: {
      en: "Assess what tool use, metatools and folk physics reveal about causal cognition.",
      zh: "评估工具使用、元工具与民间物理所反映的因果认知。",
    },
  },
  {
    key: "evolution",
    lectureIds: ["lecture-9"],
    label: { en: "Brain Evolution & Comparison", zh: "脑与认知演化" },
    description: {
      en: "Compare species with the Social Brain Hypothesis and Encephalization Quotient.",
      zh: "运用社会脑假说与脑化商比较不同物种的认知。",
    },
  },
];

export function computeReport(language: "en" | "zh", lectures: Lecture[] = allLectures): Report {
  const perLecture: LectureProgress[] = lectures.map((lecture) => {
    const en = lecture.en; // ids & correctAnswers are identical across languages
    const quiz = en.quizQuestions;
    const examQs = [...(en.sectionA ?? []), ...(en.sectionB ?? [])];
    const concepts = en.keyConcepts;

    let quizAnswered = 0;
    let quizCorrect = 0;
    for (const q of quiz) {
      const answer = read<number | null>(quizKey(q.id), null);
      if (answer !== null) {
        quizAnswered += 1;
        if (answer === q.correctAnswer) quizCorrect += 1;
      }
    }

    let examAttempted = 0;
    for (const q of examQs) {
      const draft = read<string>(examKey(q.id), "");
      if (draft.trim().length > 0) examAttempted += 1;
    }

    let conceptsExplored = 0;
    for (const c of concepts) {
      if (read<boolean>(conceptKey(lecture.id, c.term), false)) conceptsExplored += 1;
    }

    const quizRate = quiz.length ? quizCorrect / quiz.length : 0;
    const conceptRate = concepts.length ? conceptsExplored / concepts.length : 0;
    const examRate = examQs.length ? examAttempted / examQs.length : 0;
    const mastery = Math.round((quizRate * 0.6 + conceptRate * 0.2 + examRate * 0.2) * 100);

    return {
      id: lecture.id,
      week: lecture.week,
      title: lecture[language].title,
      quizTotal: quiz.length,
      quizAnswered,
      quizCorrect,
      examTotal: examQs.length,
      examAttempted,
      conceptsTotal: concepts.length,
      conceptsExplored,
      mastery,
    };
  });

  const byId = new Map(perLecture.map((l) => [l.id, l]));

  const competencies: Competency[] = COMPETENCY_DEFS.map((def) => {
    const mapped = def.lectureIds.map((id) => byId.get(id)).filter(Boolean) as LectureProgress[];
    const score = mapped.length
      ? Math.round(mapped.reduce((s, l) => s + l.mastery, 0) / mapped.length)
      : 0;
    return {
      key: def.key,
      label: def.label[language],
      description: def.description[language],
      lectureIds: def.lectureIds,
      score,
      level: levelOf(score),
    };
  });

  const sum = (fn: (l: LectureProgress) => number) => perLecture.reduce((s, l) => s + fn(l), 0);
  const quizTotal = sum((l) => l.quizTotal);
  const quizAnswered = sum((l) => l.quizAnswered);
  const quizCorrect = sum((l) => l.quizCorrect);
  const examTotal = sum((l) => l.examTotal);
  const examAttempted = sum((l) => l.examAttempted);
  const conceptsTotal = sum((l) => l.conceptsTotal);
  const conceptsExplored = sum((l) => l.conceptsExplored);
  const overallScore = perLecture.length
    ? Math.round(perLecture.reduce((s, l) => s + l.mastery, 0) / perLecture.length)
    : 0;

  return {
    hasActivity: quizAnswered > 0 || examAttempted > 0 || conceptsExplored > 0,
    overall: {
      quizTotal,
      quizAnswered,
      quizCorrect,
      correctRate: quizAnswered ? Math.round((quizCorrect / quizAnswered) * 100) : 0,
      examTotal,
      examAttempted,
      conceptsTotal,
      conceptsExplored,
      overallScore,
    },
    lectures: perLecture,
    competencies,
  };
}

/** Remove all persisted study progress (quiz answers, exam drafts, explored concepts). */
export function resetProgress() {
  if (typeof window === "undefined") return;
  const toRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && (key.startsWith("ais.quiz.") || key.startsWith("ais.exam.") || key.startsWith("ais.concept."))) {
      toRemove.push(key);
    }
  }
  toRemove.forEach((k) => window.localStorage.removeItem(k));
}
