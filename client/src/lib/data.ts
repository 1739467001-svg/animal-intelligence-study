

export interface Concept {
  term: string;
  definition: string;
  example?: string;
  webExplanation?: string;
  lectureExample?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  year: string;
  question: string;
  modelAnswerPoints: string[];
  detailedAnswer?: string;
}

export interface LocalizedContent {
  title: string;
  description: string;
  keyConcepts: Concept[];
  quizQuestions: QuizQuestion[];
  sectionA: ExamQuestion[]; // Short questions
  sectionB: ExamQuestion[]; // Design/Long questions
}

export interface Lecture {
  id: string;
  week: number;
  image: string;
  en: LocalizedContent;
  zh: LocalizedContent;
}

export const lectures: Lecture[] = [
  {
    id: "lecture-1",
    week: 1,
    image: "/images/hero-banner.webp",
    en: {
      title: "No Brains (Introduction)",
      description: "Introduction to the course, defining intelligence from a bottom-up perspective, and the concepts of embodiment and situatedness.",
      keyConcepts: [
        {
          term: "Bottom-up vs Top-down",
          definition: "Top-down approaches start with human abilities (e.g., language) and look for them in animals. Bottom-up approaches view intelligence as adaptive behaviour emerging from simple mechanisms.",
          webExplanation: "In cognitive science, 'Top-down' often refers to processing driven by prior knowledge and expectations, while 'Bottom-up' is data-driven, starting from sensory input. In the context of AI and ALife, 'Bottom-up' emphasizes building intelligence from basic sensorimotor interactions rather than pre-programming complex cognitive modules.",
          lectureExample: "Instead of asking 'Do ants teach?' (Top-down), ask 'How does tandem running help the colony survive?' (Bottom-up). This avoids semantic debates about definitions."
        },
        {
          term: "Embodiment",
          definition: "The idea that the body (sensors, actuators, morphology) plays a crucial role in intelligent behaviour. Intelligence is not just in the brain.",
          webExplanation: "Embodied AI posits that intelligence cannot exist without a physical body interacting with an environment. The physical properties of the body (like the elasticity of legs or the placement of eyes) solve computational problems that the brain would otherwise have to handle.",
          lectureExample: "Braitenberg Vehicles: Complex behaviours like 'aggression' or 'love' emerge purely from the physical wiring of sensors to motors (crossed vs. uncrossed), without any internal processing or 'brain'."
        },
        {
          term: "Situatedness",
          definition: "The agent is embedded in an environment. Behaviour is a result of the interaction between the agent and its environment.",
          webExplanation: "Situated robotics emphasizes that robots should exist in the real world, dealing with noisy, dynamic environments rather than abstract simulations. The environment itself serves as an external memory and a source of information.",
          lectureExample: "Simon's Ant: The complex path of an ant on a beach reflects the complexity of the beach (dunes, obstacles), not necessarily a complex internal navigation program in the ant's head."
        }
      ],
      quizQuestions: [
        {
          id: "q1-1",
          question: "What is the main problem with 'Top-down' definitions of intelligence?",
          options: [
            "They are too simple.",
            "They lead to arguments about definitions (semantics) rather than understanding mechanisms.",
            "They cannot be applied to humans.",
            "They focus too much on evolution."
          ],
          correctAnswer: 1,
          explanation: "Top-down definitions often start with human traits (like language or teaching) and try to fit animal behaviour into these boxes, leading to endless debates about whether an animal 'truly' possesses that trait."
        },
        {
          id: "q1-2",
          question: "In Braitenberg's 'Aggressor' vehicle, how are the sensors connected to the motors?",
          options: [
            "Uncrossed excitatory connections (Left sensor -> Left motor)",
            "Crossed excitatory connections (Left sensor -> Right motor)",
            "Uncrossed inhibitory connections",
            "Crossed inhibitory connections"
          ],
          correctAnswer: 1,
          explanation: "Crossed excitatory connections mean that when the light is on the left, the right motor speeds up, turning the vehicle towards the light and causing it to accelerate into it (Aggression)."
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-1-new-2024",
              year: "2024",
              question: "i. Define embodiment and situatedness. ii. Considering embodiment and situatedness, why will the outdoor robot be harder to design? iii. Propose design elements for the outdoor robot which overcome these environmental challenges.",
              modelAnswerPoints: [
                "Embodiment: Cognition influenced by physical body (sensors, actuators).",
                "Situatedness: Cognition/behaviour influenced by environment/context.",
                "Challenge: Outdoor environment is unstructured, dynamic (sand, light, weather).",
                "Design Elements: Wide wheels/tracks for sand (Mobility), Low CoG (Stability), Sealed body (Durability), IR/Vision sensors (Sensing)."
              ]
            },
            {
              id: "sa1-1",
          year: "Sample",
          question: "Describe situatedness as we use it in this module (~100-150 words)",
          modelAnswerPoints: [
            "Situatedness refers to an agent being embedded in its environment.",
            "The agent interacts with the world directly through its sensors and actuators.",
            "The environment is dynamic and affects the agent's behaviour.",
            "The agent does not deal with abstract descriptions but with the 'here and now'."
          ]
        },
        {
          id: "sa1-2",
          year: "Sample",
          question: "Explain with one carefully chosen example how an animal's situatedness can simplify a task that the animal needs to achieve. (~150-250 words)",
          modelAnswerPoints: [
            "Example: Cricket phonotaxis or Simon's Ant.",
            "The complexity of the behaviour comes from the environment, not just the internal program.",
            "The animal uses the environment structure to reduce computational load.",
            "It reacts to local cues rather than building a global map."
          ],
          detailedAnswer: `**Detailed Academic Answer:**

**Example: Cricket Phonotaxis**

Female crickets locate mates by tracking the chirping sound of males. This task is simplified by the cricket's **situatedness** and **embodiment**. The cricket's ears are located on its front legs, and a tracheal tube connects the two ears internally. This physical structure acts as a pressure difference receiver.

Instead of complex neural processing to calculate the sound source's angle (like triangulation), the cricket simply moves its legs. The phase difference of the sound wave arriving at the two ears, modulated by the body's position, naturally creates a directional signal. The cricket only needs a simple rule: "turn towards the side with the louder sound." The environment (sound physics) and the body (ear placement) do the "computation," drastically reducing the cognitive load on the cricket's brain.`
        }
      ],
      sectionB: [
        {
          id: "sb1-1",
          year: "Sample",
          question: "You are tasked with developing a robotics lab exercise that will demonstrate to students the importance of situatedness when considering the design of a robotic agent. Outline your approach and show how it draws on what you have learned about the relationship between brain, embodiment, and situatedness. (~300-350 words)",
          modelAnswerPoints: [
            "Design a task where a robot must navigate a cluttered environment.",
            "Compare a 'remote control' or 'map-based' approach vs. a 'reactive/situated' approach.",
            "Show how the situated robot uses local sensor cues (e.g., whiskers, light sensors) to handle obstacles without complex planning.",
            "Highlight that the 'brain' (control code) can be simpler if the body (embodiment) and environment interactions (situatedness) are well-designed."
          ],
          detailedAnswer: `**Detailed Academic Answer:**

**Lab Exercise Proposal: The "Blind" Navigator**

**Objective:** To demonstrate how situatedness allows simple agents to navigate complex environments without internal maps.

**Setup:**
1.  **Environment:** A walled arena with random obstacles (blocks, ramps).
2.  **Robot A (Control - "Map-Based"):** A robot programmed with a pre-loaded map of the arena. It must plan a path from Start to Finish.
3.  **Robot B (Experimental - "Situated"):** A robot with no map, equipped only with "whisker" touch sensors and a simple rule: "If left whisker touches, turn right; if right whisker touches, turn left; otherwise, move forward."

**Procedure:**
Students will run both robots. Then, the instructor will *move* an obstacle.
*   **Robot A** will likely fail or collide, as its internal map no longer matches the reality. It is not "situated" in the current reality.
*   **Robot B** will successfully navigate around the moved obstacle because it reacts to the immediate physical world.

**Analysis:**
This exercise illustrates that **situatedness** (reacting to the here-and-now) makes the agent robust to environmental changes. The "intelligence" of Robot B emerges from its interaction with the environment, not from a complex internal brain. It shows that a well-designed body (whiskers) and simple situated rules can outperform complex planning in dynamic settings.`
        }
      ]
    },
    zh: {
      title: "无脑智能 (导论)",
      description: "课程介绍，从自下而上的角度定义智能，以及具身性（Embodiment）和情境性（Situatedness）的概念。",
      keyConcepts: [
        {
          term: "自下而上 vs 自上而下 (Bottom-up vs Top-down)",
          definition: "自上而下的方法从人类能力（如语言）出发，在动物身上寻找对应。自下而上的方法将智能视为从简单机制中涌现的适应性行为。",
          webExplanation: "在认知科学中，'自上而下'通常指由先验知识和期望驱动的处理，而'自下而上'是数据驱动的，从感官输入开始。在人工智能和人工生命语境下，'自下而上'强调从基本的感知-运动交互构建智能，而不是预编程复杂的认知模块。",
          lectureExample: "不要问'蚂蚁会教学吗？'（自上而下），而要问'串联跑（tandem running）如何帮助蚁群生存？'（自下而上）。这避免了关于定义的语义争论。"
        },
        {
          term: "具身性 (Embodiment)",
          definition: "身体（传感器、执行器、形态）在智能行为中起着至关重要的作用。智能不仅仅存在于大脑中。",
          webExplanation: "具身人工智能（Embodied AI）认为，没有与环境互动的物理身体，智能就不可能存在。身体的物理属性（如腿的弹性或眼睛的位置）解决了大脑否则必须处理的计算问题。",
          lectureExample: "布雷滕贝格车辆（Braitenberg Vehicles）：像'攻击'或'爱'这样的复杂行为纯粹源于传感器到电机的物理连接（交叉与非交叉），没有任何内部处理或'大脑'。"
        },
        {
          term: "情境性 (Situatedness)",
          definition: "智能体嵌入在环境中。行为是智能体与其环境相互作用的结果。",
          webExplanation: "情境机器人学（Situated robotics）强调机器人应该存在于现实世界中，处理嘈杂、动态的环境，而不是抽象的模拟。环境本身充当外部记忆和信息源。",
          lectureExample: "西蒙的蚂蚁（Simon's Ant）：蚂蚁在沙滩上路径的复杂性反映了沙滩的复杂性（沙丘、障碍物），而不一定反映了蚂蚁头脑中复杂的内部导航程序。"
        }
      ],
      quizQuestions: [
        {
          id: "q1-1",
          question: "'自上而下'的智能定义主要存在什么问题？",
          options: [
            "它们太简单了。",
            "它们导致关于定义（语义）的争论，而不是对机制的理解。",
            "它们不能应用于人类。",
            "它们过于关注进化。"
          ],
          correctAnswer: 1,
          explanation: "自上而下的定义通常从人类特征（如语言或教学）开始，试图将动物行为装入这些框框中，导致关于动物是否'真正'拥有该特征的无休止辩论。"
        },
        {
          id: "q1-2",
          question: "在布雷滕贝格的'攻击者（Aggressor）'车辆中，传感器是如何连接到电机的？",
          options: [
            "不交叉的兴奋性连接（左传感器 -> 左电机）",
            "交叉的兴奋性连接（左传感器 -> 右电机）",
            "不交叉的抑制性连接",
            "交叉的抑制性连接"
          ],
          correctAnswer: 1,
          explanation: "交叉的兴奋性连接意味着当光线在左侧时，右侧电机加速，使车辆转向光线并加速冲向它（表现出攻击性）。"
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-1-new-2024",
              year: "2024",
              question: "i. 定义“具身性”和“情境性”。ii. 考虑到具身性和情境性，为什么户外机器人更难设计？iii. 提出能够克服这些环境挑战的户外机器人设计元素。",
              modelAnswerPoints: [
                "具身性: 认知受物理身体（传感器、执行器）影响。",
                "情境性: 认知/行为受环境/语境影响。",
                "挑战: 户外环境非结构化、动态（沙地、光线、天气）。",
                "设计元素: 宽轮/履带适应沙地（移动性），低重心（稳定性），密封机身（耐用性），红外/视觉传感器（感知）。"
              ]
            },
            {
              id: "sa1-1",
          year: "示例",
          question: "描述我们在本模块中使用的'情境性（Situatedness）'概念（约100-150词）",
          modelAnswerPoints: [
            "情境性指的是智能体嵌入在其环境中。",
            "智能体通过传感器和执行器直接与世界互动。",
            "环境是动态的，并影响智能体的行为。",
            "智能体不处理抽象描述，而是处理'此时此地'的信息。"
          ]
        },
        {
          id: "sa1-2",
          year: "Sample",
          question: "用一个精心选择的例子解释动物的情境性如何简化它需要完成的任务。（约150-250词）",
          modelAnswerPoints: [
            "例子：蟋蟀的趋声性或西蒙的蚂蚁。",
            "行为的复杂性来自环境，而不仅仅是内部程序。",
            "动物利用环境结构来减少计算负荷。",
            "它对局部线索做出反应，而不是构建全局地图。"
          ],
          detailedAnswer: `**详细学术解析：**

**案例：蟋蟀的趋声性 (Cricket Phonotaxis)**

雌性蟋蟀通过追踪雄性的鸣叫声来寻找配偶。这项任务通过蟋蟀的**情境性**和**具身性**得到了简化。蟋蟀的耳朵位于其前腿上，并且气管在内部连接了两只耳朵。这种物理结构充当了压差接收器。

蟋蟀不需要复杂的神经处理来计算声源的角度（如三角测量），只需移动它的腿。到达两耳的声波相位差，受身体位置的调制，自然地产生了一个方向信号。蟋蟀只需要一个简单的规则：“转向声音更大的一侧”。环境（声音物理学）和身体（耳朵位置）完成了“计算”，大大降低了蟋蟀大脑的认知负荷。`
        }
      ],
      sectionB: [
        {
          id: "sb1-1",
          year: "Sample",
          question: "你的任务是开发一个机器人实验室练习，向学生展示在考虑机器人智能体设计时情境性的重要性。概述你的方法，并展示它如何利用你所学到的关于大脑、具身性和情境性之间关系的知识。（约300-350词）",
          modelAnswerPoints: [
            "设计一个任务，机器人必须在杂乱的环境中导航。",
            "比较“遥控”或“基于地图”的方法与“反应式/情境化”的方法。",
            "展示情境化机器人如何利用局部传感器线索（如胡须、光传感器）来处理障碍物，而无需复杂的规划。",
            "强调如果身体（具身性）和环境交互（情境性）设计得当，“大脑”（控制代码）可以更简单。"
          ],
          detailedAnswer: `**详细学术解析：**

**实验练习提案：“盲”导航员**

**目标：** 演示情境性如何允许简单的智能体在没有内部地图的情况下在复杂环境中导航。

**设置：**
1.  **环境**：一个带有随机障碍物（积木、斜坡）的围墙竞技场。
2.  **机器人 A (对照组 - “基于地图”)**：编程预装了竞技场地图的机器人。它必须规划从起点到终点的路径。
3.  **机器人 B (实验组 - “情境化”)**：没有地图的机器人，仅配备“胡须”触觉传感器和一条简单规则：“如果左胡须接触，向右转；如果右胡须接触，向左转；否则，向前进。”

**过程：**
学生将运行两个机器人。然后，指导员将*移动*一个障碍物。
*   **机器人 A** 可能会失败或碰撞，因为它的内部地图不再与现实相符。它没有“情境化”于当前的现实中。
*   **机器人 B** 将成功绕过移动后的障碍物，因为它对当前的物理世界做出反应。

**分析：**
这个练习说明了**情境性**（对此时此地做出反应）使智能体对环境变化具有鲁棒性。机器人 B 的“智能”源于其与环境的互动，而不是源于复杂的内部大脑。它表明，设计良好的身体（胡须）和简单的情境规则可以在动态设置中胜过复杂的规划。`
        }
      ]
    }
  },
  {
    id: "lecture-2",
    week: 2,
    image: "/images/collective-intelligence.webp",
    en: {
      title: "Unexpected Cleverness",
      description: "Exploring how small-brained animals exhibit complex behaviours and the importance of 'Kill-joy' explanations.",
      keyConcepts: [
        {
          term: "Morgan's Canon",
          definition: "A principle of parsimony: Do not interpret an action as the outcome of a higher mental faculty if it can be interpreted as the outcome of a lower one.",
          webExplanation: "Formulated by C. Lloyd Morgan in 1894. It is a specific application of Occam's Razor to animal psychology, warning against anthropomorphism (attributing human-like thoughts to animals).",
          lectureExample: "Clever Hans: The horse appeared to do math, but was actually reading subtle body language cues from the trainer (a 'lower' faculty). This illustrates why Morgan's Canon is necessary."
        },
        {
          term: "Kill-joy Explanation",
          definition: "Using simple mechanisms (associative learning, species-specific predispositions, or sensory adaptations) to explain seemingly complex/intelligent behaviour.",
          webExplanation: "Often seen as 'spoiling the fun' of believing animals are geniuses, but scientifically crucial. It forces researchers to rule out simple explanations before claiming high-level cognition.",
          lectureExample: "Digger Wasps: They seem to 'inspect' their burrows intelligently, but experiments show they are just following a rigid stimulus-response chain. If you move the prey while they are inside, they repeat the inspection loop endlessly."
        },
        {
          term: "Portia Spider Strategies",
          definition: "A jumping spider that uses trial-and-error (generating vibrations) and planning (detouring) to catch prey despite having a tiny brain.",
          webExplanation: "Portia fimbriata is known as the 'eight-legged cat'. It hunts other spiders. Its ability to take detours where it loses sight of the prey suggests some form of representation or 'object permanence'.",
          lectureExample: "Detouring: Portia can spot prey, turn away to find a path (losing visual contact), and successfully navigate to a position above the prey to attack. This challenges the idea that small brains can only be reactive."
        }
      ],
      quizQuestions: [
        {
          id: "q2-1",
          question: "What was the secret of 'Clever Hans' the horse?",
          options: [
            "He was a mathematical genius.",
            "He memorized the answers.",
            "He responded to subtle visual cues from the questioner.",
            "He could hear the correct answer being whispered."
          ],
          correctAnswer: 2,
          explanation: "Hans stopped tapping his hoof when he saw the questioner relax or move their head slightly, indicating the correct count had been reached."
        },
        {
          id: "q2-2",
          question: "Why is the Digger Wasp's behaviour considered 'stupid' despite looking intelligent?",
          options: [
            "It cannot fly very well.",
            "It gets stuck in a loop if the environment changes unexpectedly (e.g., moving the cricket).",
            "It forgets where its nest is.",
            "It stings the wrong prey."
          ],
          correctAnswer: 1,
          explanation: "The wasp's behaviour is a rigid chain of reflexes. It lacks the flexibility to adapt when the chain is broken (e.g., prey moved back from the entrance)."
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-2-new-Unknown",
              year: "Unknown",
              question: "Discuss the issue with using anthropomorphic language (like 'enjoy' or 'fun') to describe animal behaviour, such as bumblebees rolling balls.",
              modelAnswerPoints: [
                "Issue: Implies human-like emotions/motivations not present in small-brained insects.",
                "Risk: Oversimplifies/misrepresents cognitive processes.",
                "Alternative 1: Sensory stimulation.",
                "Alternative 2: Exploratory behaviour (curiosity).",
                "Alternative 3: Stress reduction/displacement.",
                "Alternative 4: Reflexive response to physical properties."
              ]
            },
            {
              id: "sa2-1",
          year: "Sample",
          question: "Explain Morgan's Canon and its relevance to the study of animal intelligence. (~100-150 words)",
          modelAnswerPoints: [
            "Morgan's Canon is a principle of parsimony.",
            "It states we should not attribute higher psychological processes if a lower one suffices.",
            "It prevents anthropomorphism (projecting human traits onto animals).",
            "It encourages looking for simple, mechanistic explanations first."
          ]
        },
        {
          id: "sa2-2",
          year: "Sample",
          question: "Describe the 'Clever Hans' effect and how it serves as a cautionary tale for animal cognition researchers. (~150-200 words)",
          modelAnswerPoints: [
            "Clever Hans was a horse that seemed to do math.",
            "He was actually reacting to the trainer's involuntary body language.",
            "It shows that animals are very good at picking up subtle cues.",
            "Researchers must control for these cues (e.g., double-blind experiments) to avoid false positives."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb2-1",
          year: "Sample",
          question: "Design an experiment to test whether a spider is using a 'cognitive map' to navigate a detour or simply following a chemical trail. (~300-350 words)",
          modelAnswerPoints: [
            "Setup: A maze with a prey visible but accessible only via a long detour.",
            "Control: Clean the maze to remove chemical trails.",
            "Manipulation: Block the direct path and see if the spider chooses the correct detour path immediately.",
            "Crucial test: If the spider takes the correct path without line-of-sight and without chemical cues, it suggests a representation (map). If it wanders randomly, it does not."
          ]
        }
      ]
    },
    zh: {
      title: "意想不到的聪明 (Unexpected Cleverness)",
      description: "探索小脑动物如何表现出复杂的行为，以及'扫兴解释（Kill-joy explanations）'的重要性。",
      keyConcepts: [
        {
          term: "摩根公理 (Morgan's Canon)",
          definition: "简约原则：如果一个行为可以被解释为低级心理能力的结果，就不要将其解释为高级心理能力的结果。",
          webExplanation: "由 C. Lloyd Morgan 于 1894 年提出。它是奥卡姆剃刀在动物心理学中的具体应用，警告不要拟人化（将人类的思想归因于动物）。",
          lectureExample: "聪明的汉斯：这匹马看起来会做数学题，但实际上是在阅读训练员微妙的肢体语言线索（一种'低级'能力）。这说明了为什么摩根公理是必要的。"
        },
        {
          term: "扫兴解释 (Kill-joy Explanation)",
          definition: "使用简单的机制（如联想学习、物种特有的倾向或感官适应）来解释看似复杂/智能的行为。",
          webExplanation: "通常被视为'破坏'相信动物是天才的乐趣，但在科学上至关重要。它迫使研究人员在声称高级认知之前排除简单的解释。",
          lectureExample: "掘土蜂：它们似乎在智能地'检查'洞穴，但实验表明它们只是遵循僵化的刺激-反应链。如果你在它们进去的时候移动猎物，它们会无休止地重复检查循环。"
        },
        {
          term: "波西亚蜘蛛策略 (Portia Spider Strategies)",
          definition: "一种跳蛛，尽管大脑很小，但能利用试错（产生振动）和规划（绕道）来捕捉猎物。",
          webExplanation: "Portia fimbriata 被称为'八脚猫'。它捕食其他蜘蛛。它在失去猎物视线的情况下绕道的能力表明了某种形式的表征或'客体永久性'。",
          lectureExample: "绕道：Portia 可以发现猎物，转身寻找路径（失去视觉接触），并成功导航到猎物上方的位置进行攻击。这挑战了小脑只能是被动反应的观点。"
        }
      ],
      quizQuestions: [
        {
          id: "q2-1",
          question: "'聪明的汉斯'这匹马的秘密是什么？",
          options: [
            "它是一个数学天才。",
            "它记住了答案。",
            "它对提问者微妙的视觉线索做出了反应。",
            "它能听到有人低声说出正确答案。"
          ],
          correctAnswer: 2,
          explanation: "当汉斯看到提问者放松或轻微移动头部时，它就会停止敲击蹄子，这表明已经达到了正确的计数。"
        },
        {
          id: "q2-2",
          question: "为什么掘土蜂的行为虽然看起来很聪明，却被认为是'愚蠢'的？",
          options: [
            "它飞得不是很好。",
            "如果环境发生意外变化（例如，移动蟋蟀），它就会陷入循环。",
            "它忘记了巢穴在哪里。",
            "它刺痛了错误的猎物。"
          ],
          correctAnswer: 1,
          explanation: "黄蜂的行为是一条僵化的反射链。当链条断裂（例如，猎物从入口移开）时，它缺乏适应的灵活性。"
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-2-new-Unknown",
              year: "Unknown",
              question: "讨论使用拟人化语言（如“享受”或“乐趣”）描述动物行为（如大黄蜂滚球）的问题。",
              modelAnswerPoints: [
                "问题: 暗示小脑昆虫具有类似人类的情感/动机。",
                "风险: 过度简化/误解认知过程。",
                "替代解释1: 感官刺激。",
                "替代解释2: 探索行为（好奇心）。",
                "替代解释3: 减压/替代行为。",
                "替代解释4: 对物理属性的反射性反应。"
              ]
            },
            {
              id: "sa2-1",
          year: "示例",
          question: "解释摩根公理及其与动物智能研究的相关性。（约100-150词）",
          modelAnswerPoints: [
            "摩根公理是一个简约原则。",
            "它指出，如果低级心理过程足以解释，我们就不应归因于高级心理过程。",
            "它防止拟人化（将人类特征投射到动物身上）。",
            "它鼓励首先寻找简单的、机械的解释。"
          ]
        },
        {
          id: "sa2-2",
          year: "示例",
          question: "描述'聪明的汉斯'效应，并说明它如何作为动物认知研究人员的警示故事。（约150-200词）",
          modelAnswerPoints: [
            "聪明的汉斯是一匹似乎会做数学题的马。",
            "它实际上是对训练员不自主的肢体语言做出反应。",
            "这表明动物非常擅长捕捉微妙的线索。",
            "研究人员必须控制这些线索（例如，双盲实验）以避免假阳性。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb2-1",
          year: "示例",
          question: "设计一个实验来测试蜘蛛是使用'认知地图'来导航绕道，还是仅仅跟随化学痕迹。（约300-350词）",
          modelAnswerPoints: [
            "设置：一个迷宫，猎物可见但只能通过长绕道到达。",
            "控制：清洁迷宫以去除化学痕迹。",
            "操作：阻断直接路径，看蜘蛛是否立即选择正确的绕道路径。",
            "关键测试：如果蜘蛛在没有视线和化学线索的情况下采取正确的路径，这表明存在表征（地图）。如果它随机游荡，则不存在。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-3",
    week: 3,
    image: "/images/collective-intelligence.webp",
    en: {
      title: "Collective Intelligence",
      description: "Stigmergy, self-organization, and how complex group behaviours emerge from simple local rules.",
      keyConcepts: [
        {
          term: "Stigmergy",
          definition: "A mechanism of indirect coordination where the trace left in the environment by an action stimulates the performance of a next action.",
          webExplanation: "Coined by Pierre-Paul Grassé. It explains how termites build massive cathedrals without a blueprint. One worker drops a mud ball, which stimulates others to drop more mud nearby.",
          lectureExample: "Termite Mound Building: Pheromones on mud balls attract other termites to deposit more mud. This positive feedback loop leads to the emergence of pillars and arches."
        },
        {
          term: "Self-Organization",
          definition: "The process where a structure or pattern appears in a system without a central authority or external element imposing it.",
          webExplanation: "Examples include flocking birds, schooling fish, and traffic jams. Global order arises from local interactions between agents.",
          lectureExample: "Boids (Flocking Simulation): Three simple rules (Separation, Alignment, Cohesion) are enough to recreate realistic bird flocking behaviour without any 'leader' bird."
        }
      ],
      quizQuestions: [
        {
          id: "q3-1",
          question: "What is the key feature of Stigmergy?",
          options: [
            "Direct communication between agents (e.g., talking).",
            "Indirect coordination via the environment.",
            "A central leader giving orders.",
            "Genetic programming."
          ],
          correctAnswer: 1,
          explanation: "Agents communicate by modifying their environment (e.g., leaving a pheromone trail), which then influences the behaviour of other agents."
        },
        {
          id: "q3-2",
          question: "Which of the following is NOT one of Reynolds' Boids rules?",
          options: [
            "Separation (avoid crowding)",
            "Alignment (steer towards average heading of neighbours)",
            "Cohesion (steer towards average position of neighbours)",
            "Leadership (follow the strongest bird)"
          ],
          correctAnswer: 3,
          explanation: "Flocking is a decentralized system. There is no leader. The behaviour emerges from the first three local rules."
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-3-new-2024",
              year: "2024",
              question: "A flock of birds and a military drone formation appear, on first inspection, to be very similar. They both involve a large number of interacting agents, each performing specific tasks, and which, as a whole, perform complex behaviours. Thinking back to the lecture on self-organisation, discuss whether either or both of these two qualify as a self-organising complex system and why. For any that does not qualify, please explain why.",
              modelAnswerPoints: [
                "Flock of birds (Yes): Moves as a coordinated group, forming dynamic structures. Follows simple local rules (distance, speed matching). Emergent behaviour from local interactions. No central control.",
                "Military drone formation (No): Moves according to central control or pre-set paths. Position tightly regulated. Determined by external commands, not local interactions. No emergent properties."
              ]
            },
            {
              id: "sa3-1",
          year: "Sample",
          question: "Define Stigmergy and explain how it differs from direct communication. (~100-150 words)",
          modelAnswerPoints: [
            "Stigmergy is indirect coordination via the environment.",
            "Direct communication involves signal transmission between sender and receiver.",
            "In stigmergy, the 'message' persists in the environment (e.g., pheromones, mud structure).",
            "It allows for asynchronous collaboration (agents don't need to be there at the same time)."
          ]
        },
        {
          id: "sa3-2",
          year: "Sample",
          question: "Explain the role of positive feedback in termite mound construction. (~150-200 words)",
          modelAnswerPoints: [
            "Positive feedback amplifies small fluctuations.",
            "A random deposit of mud attracts more deposits (due to pheromones).",
            "This causes pillars to grow rapidly from random beginnings.",
            "It is balanced by negative feedback (pheromone decay/depletion) to stabilize the structure."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb3-1",
          year: "Sample",
          question: "Design a swarm robotics system to clean up oil spills, using principles of Stigmergy. (~300-350 words)",
          modelAnswerPoints: [
            "Agents: Simple floating robots with oil sensors.",
            "Rule 1: Move randomly until oil is detected.",
            "Rule 2 (Stigmergy): When oil is found, release a 'virtual pheromone' (radio signal) that attracts other robots.",
            "Rule 3: If crowded, disperse slightly (Separation) to cover more area.",
            "Outcome: Robots self-organize around oil patches without a central controller."
          ]
        }
      ]
    },
    zh: {
      title: "集体智能 (Collective Intelligence)",
      description: "共识主动性（Stigmergy）、自组织以及复杂的群体行为如何从简单的局部规则中涌现。",
      keyConcepts: [
        {
          term: "共识主动性 (Stigmergy)",
          definition: "一种间接协调机制，其中行动在环境中留下的痕迹会刺激下一个行动的执行。",
          webExplanation: "由 Pierre-Paul Grassé 创造。它解释了白蚁如何在没有蓝图的情况下建造巨大的大教堂。一个工蚁扔下一个泥球，刺激其他工蚁在附近扔下更多的泥。",
          lectureExample: "白蚁丘建造：泥球上的费洛蒙吸引其他白蚁沉积更多的泥。这种正反馈循环导致柱子和拱门的出现。"
        },
        {
          term: "自组织 (Self-Organization)",
          definition: "在没有中央权威或外部元素强加的情况下，系统中出现结构或模式的过程。",
          webExplanation: "例子包括鸟群、鱼群和交通拥堵。全局秩序源于智能体之间的局部互动。",
          lectureExample: "Boids (鸟群模拟)：三个简单的规则（分离、对齐、凝聚）足以重建逼真的鸟群行为，而无需任何'领导'鸟。"
        }
      ],
      quizQuestions: [
        {
          id: "q3-1",
          question: "共识主动性的关键特征是什么？",
          options: [
            "智能体之间的直接交流（例如，说话）。",
            "通过环境进行的间接协调。",
            "中央领导发号施令。",
            "基因编程。"
          ],
          correctAnswer: 1,
          explanation: "智能体通过修改环境（例如，留下费洛蒙痕迹）进行交流，进而影响其他智能体的行为。"
        },
        {
          id: "q3-2",
          question: "以下哪项不是 Reynolds 的 Boids 规则之一？",
          options: [
            "分离（避免拥挤）",
            "对齐（转向邻居的平均航向）",
            "凝聚（转向邻居的平均位置）",
            "领导（跟随最强壮的鸟）"
          ],
          correctAnswer: 3,
          explanation: "群聚是一个去中心化的系统。没有领导者。行为是从前三个局部规则中涌现出来的。"
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-3-new-2024",
              year: "2024",
              question: "一群鸟和一队军用无人机编队，乍一看非常相似。它们都涉及大量的交互个体，每个个体都执行特定的任务，从而整体上表现出复杂的行为。回顾关于自组织的讲座，讨论这两者中是否有一个或两个都符合自组织复杂系统的条件，并说明理由。对于不符合条件的，请解释原因。",
              modelAnswerPoints: [
                "鸟群 (是): 以协调群体形式移动，形成动态结构。遵循简单局部规则（保持距离、匹配速度）。涌现行为源于局部互动。无中央控制。",
                "军用无人机编队 (不是): 根据中央控制器或预设路径移动。位置受严格调节。由外部指令决定，而非局部互动。无涌现特性。"
              ]
            },
            {
              id: "sa3-1",
          year: "示例",
          question: "定义共识主动性（Stigmergy）并解释它与直接交流有何不同。（约100-150词）",
          modelAnswerPoints: [
            "共识主动性是通过环境进行的间接协调。",
            "直接交流涉及发送者和接收者之间的信号传输。",
            "在共识主动性中，'信息'在环境中持续存在（例如，费洛蒙、泥土结构）。",
            "它允许异步协作（智能体不需要同时在场）。"
          ]
        },
        {
          id: "sa3-2",
          year: "示例",
          question: "解释正反馈在白蚁丘建造中的作用。（约150-200词）",
          modelAnswerPoints: [
            "正反馈放大微小的波动。",
            "随机沉积的泥土会吸引更多的沉积物（由于费洛蒙）。",
            "这导致柱子从随机的起点迅速生长。",
            "它通过负反馈（费洛蒙衰减/耗尽）来平衡，以稳定结构。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb3-1",
          year: "示例",
          question: "利用共识主动性原理，设计一个清理漏油的群体机器人系统。（约300-350词）",
          modelAnswerPoints: [
            "智能体：带有油传感器的简单浮动机器人。",
            "规则 1：随机移动直到检测到油。",
            "规则 2（共识主动性）：当发现油时，释放'虚拟费洛蒙'（无线电信号）吸引其他机器人。",
            "规则 3：如果拥挤，稍微分散（分离）以覆盖更多区域。",
            "结果：机器人围绕油斑自组织，无需中央控制器。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-4",
    week: 4,
    image: "/images/hero-banner.webp",
    en: {
      title: "What is a model?",
      description: "The utility of models in scientific research: abstraction, prediction, and existence proofs.",
      keyConcepts: [
        {
          term: "Existence Proof",
          definition: "A model that demonstrates a certain behaviour is *possible* using a specific mechanism, even if it doesn't prove that nature works exactly that way.",
          webExplanation: "In AI, building a robot that walks using only spinal reflexes proves that a brain is not *required* for walking, challenging previous assumptions.",
          lectureExample: "Barbara Webb's Cricket Robot: By building a robot with simple electronic ears that successfully performed phonotaxis, she proved that complex auditory processing is not needed for this task."
        },
        {
          term: "Braitenberg Vehicles",
          definition: "Thought experiments (and physical models) showing how complex behaviours can arise from simple sensor-motor connections.",
          webExplanation: "Vehicle 2a (Fear) and 2b (Aggression) show that we naturally attribute emotions to simple machines based on their movement.",
          lectureExample: "The 'Law of Uphill Analysis and Downhill Invention': It is much harder to guess the internal mechanism by observing behaviour (analysis) than to create complex behaviour from simple mechanisms (invention)."
        }
      ],
      quizQuestions: [
        {
          id: "q4-1",
          question: "What is the 'Law of Uphill Analysis and Downhill Invention'?",
          options: [
            "It is easier to analyze a system than to build it.",
            "It is easier to build a system that produces complex behaviour than to reverse-engineer that behaviour from observation.",
            "Invention requires more energy than analysis.",
            "Robots should always move downhill."
          ],
          correctAnswer: 1,
          explanation: "Braitenberg argued that we overestimate the complexity of internal mechanisms when we observe behaviour. Synthesis (building) reveals how simple the mechanisms can actually be."
        },
        {
          id: "q4-2",
          question: "Why are models useful even if they are not perfect replicas of reality?",
          options: [
            "They look cool.",
            "They allow us to isolate variables and test specific hypotheses (like existence proofs).",
            "They are cheaper than real animals.",
            "To save money on experiments."
          ],
          correctAnswer: 1,
          explanation: "Models allow us to test whether a proposed mechanism (e.g., a specific navigation rule) is actually sufficient to generate the observed behaviour. If the model works, the mechanism is plausible."
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-4-new-2024",
              year: "2024",
              question: "Describe what optic flow is and what type of information it can provide (a very good answer would list 4 types). Illustrate each type of information using one animal or robot example.",
              modelAnswerPoints: [
                "Definition: Pattern of apparent motion of objects/surfaces as observer moves.",
                "Info 1: Direction/Speed (e.g., Honeybees using texture).",
                "Info 2: Distance to Objects (e.g., Honeybees in corridors).",
                "Info 3: Heading/Focus of Expansion (e.g., Pilots/Gibson experiment).",
                "Info 4: Time-to-Contact (e.g., UAVs landing)."
              ]
            },
            {
              id: "sa4-1",
          year: "Sample",
          question: "What is an 'existence proof' in the context of biorobotics? Give an example. (~100-150 words)",
          modelAnswerPoints: [
            "An existence proof demonstrates that a specific mechanism is sufficient to produce a behaviour.",
            "It counters claims that a more complex mechanism is necessary.",
            "Example: Webb's robot cricket proved that phase delays (simple mechanism) are enough for sound localization, without complex neural processing."
          ]
        },
        {
          id: "sa4-2",
          year: "Sample",
          question: "Explain Braitenberg's 'Law of Uphill Analysis and Downhill Invention'. (~150-200 words)",
          modelAnswerPoints: [
            "Downhill Invention: It is easy to create complex-looking behaviour from simple rules (synthesis).",
            "Uphill Analysis: It is hard to deduce those simple rules just by observing the behaviour (analysis).",
            "Implication: We tend to overestimate the cognitive complexity of animals."
          ]
        }
      ],
          sectionB: [
            {
              id: "sectionB-lecture-4-new-2024",
              year: "2024",
              question: "You are tasked by a farmer to design a minimalistic robot able to patrol crop fields and scare away or capture small pests like birds or insects. In other words, your robot must detect small, fast-moving objects in its vicinity without the computational complexity of an advanced vision system. Taking inspiration from what has been learned during this module, particularly the vision lecture, propose and describe a suitable motion detection system for this task and explain why it would be effective.",
              modelAnswerPoints: [
                "Proposal: Elementary Motion Detector (EMD).",
                "Mechanism: Detects motion via temporal delays and multiplication of signals from adjacent sensors.",
                "Advantages: Real-time detection, low computational requirements.",
                "Application: Suitable for detecting small moving objects in fields without complex vision."
              ]
            },
            {
              id: "sb4-1",
          year: "Sample",
          question: "Design a physical model (robot) to test the hypothesis that moths navigate to light sources using a simple 'balance' mechanism between two eyes. (~300-350 words)",
          modelAnswerPoints: [
            "Hypothesis: Moths turn until light intensity is equal in both eyes.",
            "Robot Design: Two light sensors (eyes), two motors (wheels).",
            "Wiring: Connect Left Sensor to Right Motor, Right Sensor to Left Motor (Crossed Excitatory - Vehicle 2b).",
            "Prediction: The robot should turn towards and track a moving light source.",
            "Validation: If the robot mimics moth flight paths, the hypothesis is supported."
          ]
        }
      ]
    },
    zh: {
      title: "什么是模型？(What is a model?)",
      description: "模型在科学研究中的效用：抽象、预测和存在证明。",
      keyConcepts: [
        {
          term: "存在证明 (Existence Proof)",
          definition: "一种模型，证明使用特定机制产生某种行为是*可能的*，即使它不能证明自然界正是以这种方式运作的。",
          webExplanation: "在人工智能中，制造一个仅使用脊髓反射行走的机器人证明了行走并不*需要*大脑，挑战了先前的假设。",
          lectureExample: "芭芭拉·韦伯的蟋蟀机器人：通过制造一个带有简单电子耳朵并成功执行趋声性的机器人，她证明了这项任务不需要复杂的听觉处理。"
        },
        {
          term: "布雷滕贝格车辆 (Braitenberg Vehicles)",
          definition: "思想实验（和物理模型），展示了复杂的行为如何从简单的传感器-电机连接中产生。",
          webExplanation: "车辆 2a（恐惧）和 2b（攻击）表明，我们自然地根据简单机器的运动将情感归因于它们。",
          lectureExample: "'上坡分析和下坡发明定律'：通过观察行为来猜测内部机制（分析）比从简单机制创造复杂行为（发明）要困难得多。"
        }
      ],
      quizQuestions: [
        {
          id: "q4-1",
          question: "什么是'上坡分析和下坡发明定律'？",
          options: [
            "分析一个系统比构建它更容易。",
            "构建一个产生复杂行为的系统比从观察中逆向工程该行为更容易。",
            "发明比分析需要更多的能量。",
            "机器人应该总是下坡移动。"
          ],
          correctAnswer: 1,
          explanation: "布雷滕贝格认为，当我们观察行为时，我们高估了内部机制的复杂性。综合（构建）揭示了机制实际上可以多么简单。"
        },
        {
          id: "q4-2",
          question: "为什么模型即使不是现实的完美复制品也很有用？",
          options: [
            "它们看起来很酷。",
            "它们允许我们隔离变量并测试特定的假设（如存在证明）。",
            "它们比真正的动物便宜。",
            "为了节省实验资金。"
          ],
          correctAnswer: 1,
          explanation: "模型允许我们测试提出的机制（例如，特定的导航规则）是否实际上足以产生观察到的行为。如果模型有效，则该机制是合理的。"
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-4-new-2024",
              year: "2024",
              question: "描述什么是光流 (optic flow)，以及它可以提供哪些类型的信息（一个很好的答案会列出4种类型）。请用一个动物或机器人的例子来说明每种信息类型。",
              modelAnswerPoints: [
                "定义: 观察者移动时物体/表面的表观运动模式。",
                "信息1: 移动方向/速度 (例: 蜜蜂利用纹理)。",
                "信息2: 物体距离 (例: 蜜蜂在走廊中)。",
                "信息3: 前进方向/扩张焦点 (例: 飞行员/吉布森实验)。",
                "信息4: 接触时间 (例: 无人机着陆)。"
              ]
            },
            {
              id: "sa4-1",
          year: "示例",
          question: "在生物机器人学的背景下，什么是'存在证明'？举一个例子。（约100-150词）",
          modelAnswerPoints: [
            "存在证明表明特定机制足以产生某种行为。",
            "它反驳了需要更复杂机制的说法。",
            "例子：韦伯的机器人蟋蟀证明，相位延迟（简单机制）足以进行声音定位，无需复杂的神经处理。"
          ]
        },
        {
          id: "sa4-2",
          year: "示例",
          question: "解释布雷滕贝格的'上坡分析和下坡发明定律'。（约150-200词）",
          modelAnswerPoints: [
            "下坡发明：从简单的规则创造看起来复杂的行为很容易（综合）。",
            "上坡分析：仅仅通过观察行为很难推断出那些简单的规则（分析）。",
            "含义：我们倾向于高估动物的认知复杂性。"
          ]
        }
      ],
          sectionB: [
            {
              id: "sectionB-lecture-4-new-2024",
              year: "2024",
              question: "一位农民委托您设计一款简约的机器人，用于巡逻农田并吓走或捕捉鸟类或昆虫等小型害虫。换言之，您的机器人必须能够检测其附近小而快速移动的物体，而无需高级视觉系统的计算复杂性。请借鉴本模块（特别是视觉讲座）所学知识，提出并描述一个适合此任务的运动检测系统，并解释其有效性。",
              modelAnswerPoints: [
                "方案: 初级运动检测器 (EMD)。",
                "原理: 通过检测相邻传感器信号间的时间延迟和乘积来工作。",
                "优势: 实时检测，计算要求低。",
                "应用: 适合在无需复杂视觉系统的情况下检测田间小型移动物体。"
              ]
            },
            {
              id: "sb4-1",
          year: "示例",
          question: "设计一个物理模型（机器人）来测试飞蛾使用两眼之间的简单'平衡'机制导航到光源的假设。（约300-350词）",
          modelAnswerPoints: [
            "假设：飞蛾转动直到双眼的光强相等。",
            "机器人设计：两个光传感器（眼睛），两个电机（轮子）。",
            "接线：将左传感器连接到右电机，右传感器连接到左电机（交叉兴奋 - 车辆 2b）。",
            "预测：机器人应该转向并跟踪移动的光源。",
            "验证：如果机器人模仿飞蛾的飞行路径，则假设得到支持。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-5",
    week: 5,
    image: "/images/embodied-intelligence.webp",
    en: {
      title: "Moving through the world",
      description: "Active vision, optic flow, and Gibsonian ecological psychology.",
      keyConcepts: [
        {
          term: "Optic Flow",
          definition: "The pattern of apparent motion of objects, surfaces, and edges in a visual scene caused by the relative motion between an observer and a scene.",
          webExplanation: "First described by J.J. Gibson. It provides crucial information about depth, speed, and heading without needing to recognize objects. Things close to you move faster in your visual field than things far away.",
          lectureExample: "Bees Landing: Bees keep the rate of optic flow constant on their retina as they approach a surface. To do this, they must slow down as they get closer (because closer objects cause faster flow). This ensures a smooth landing."
        },
        {
          term: "Motion Parallax",
          definition: "A depth cue in which we view objects that are closer to us as moving faster than objects that are further away.",
          webExplanation: "By moving the head side-to-side (peering), an animal can generate motion parallax to estimate distance. This is an active sensing strategy.",
          lectureExample: "Locust Peering: Before jumping, a locust sways its head from side to side. The amount the target image moves on its retina tells it how far away the target is."
        }
      ],
      quizQuestions: [
        {
          id: "q5-1",
          question: "How do bees use optic flow to land safely?",
          options: [
            "They calculate the distance to the ground using stereo vision.",
            "They keep the rate of optic flow constant, which forces them to slow down as they approach the ground.",
            "They use echolocation.",
            "They look for specific landing markers."
          ],
          correctAnswer: 1,
          explanation: "By maintaining a constant optic flow rate, the bee's velocity automatically decreases as the height decreases, leading to a smooth touchdown with zero velocity."
        }
      ],
      sectionA: [
        {
          id: "sa5-1",
          year: "Sample",
          question: "Explain how 'Active Vision' differs from passive image processing. (~100-150 words)",
          modelAnswerPoints: [
            "Passive vision processes static images.",
            "Active vision involves the observer moving to generate information.",
            "Example: Motion parallax requires head movement to reveal depth.",
            "It simplifies computation by creating structure in the sensory input."
          ]
        },
        {
          id: "sa5-2",
          year: "Sample",
          question: "Describe the 'centering response' in bees and how it uses optic flow. (~150-200 words)",
          modelAnswerPoints: [
            "Bees fly down the center of a tunnel by balancing optic flow on both eyes.",
            "If one wall is closer, flow is faster on that side.",
            "The bee turns away from the faster flow until flow is equal.",
            "This works without knowing the width of the tunnel."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb5-1",
          year: "Sample",
          question: "Design a control system for a drone that allows it to fly down a corridor without crashing into walls, using only a single camera and optic flow principles. (~300-350 words)",
          modelAnswerPoints: [
            "Sensor: Single forward-facing camera.",
            "Algorithm: Calculate optic flow vectors for left and right halves of the image.",
            "Control Rule: If Flow_Left > Flow_Right, steer Right. If Flow_Right > Flow_Left, steer Left.",
            "Logic: Closer walls create faster flow. Steering away balances the distance.",
            "Advantage: No need for heavy LIDAR or depth mapping."
          ]
        }
      ]
    },
    zh: {
      title: "在世界中移动 (Moving through the world)",
      description: "主动视觉、光流和吉布森生态心理学。",
      keyConcepts: [
        {
          term: "光流 (Optic Flow)",
          definition: "由于观察者和场景之间的相对运动，视觉场景中物体、表面和边缘的视运动模式。",
          webExplanation: "由 J.J. Gibson 首次描述。它提供了关于深度、速度和航向的关键信息，而无需识别物体。离你近的东西在视野中移动得比远的东西快。",
          lectureExample: "蜜蜂着陆：蜜蜂在接近表面时保持视网膜上的光流速率恒定。为此，它们必须在靠近时减速（因为更近的物体导致更快的光流）。这确保了平稳着陆。"
        },
        {
          term: "运动视差 (Motion Parallax)",
          definition: "一种深度线索，即我们看到离我们较近的物体比离我们较远的物体移动得更快。",
          webExplanation: "通过左右移动头部（窥视），动物可以产生运动视差来估计距离。这是一种主动感知策略。",
          lectureExample: "蝗虫窥视：在跳跃之前，蝗虫会左右摇晃头部。目标图像在其视网膜上移动的量告诉它目标有多远。"
        }
      ],
      quizQuestions: [
        {
          id: "q5-1",
          question: "蜜蜂如何利用光流安全着陆？",
          options: [
            "它们使用立体视觉计算到地面的距离。",
            "它们保持光流速率恒定，这迫使它们在接近地面时减速。",
            "它们使用回声定位。",
            "它们寻找特定的着陆标记。"
          ],
          correctAnswer: 1,
          explanation: "通过保持恒定的光流速率，蜜蜂的速度随着高度的降低而自动降低，导致零速度的平稳着陆。"
        }
      ],
      sectionA: [
        {
          id: "sa5-1",
          year: "示例",
          question: "解释'主动视觉'与被动图像处理有何不同。（约100-150词）",
          modelAnswerPoints: [
            "被动视觉处理静态图像。",
            "主动视觉涉及观察者移动以产生信息。",
            "例子：运动视差需要头部运动来揭示深度。",
            "它通过在感官输入中创建结构来简化计算。"
          ]
        },
        {
          id: "sa5-2",
          year: "示例",
          question: "描述蜜蜂的'居中反应'以及它如何使用光流。（约150-200词）",
          modelAnswerPoints: [
            "蜜蜂通过平衡双眼的光流在隧道中心飞行。",
            "如果一侧墙壁较近，该侧的光流较快。",
            "蜜蜂转向远离较快光流的一侧，直到光流相等。",
            "这在不知道隧道宽度的情况下也能工作。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb5-1",
          year: "示例",
          question: "设计一个无人机控制系统，使其仅使用单摄像头和光流原理就能飞过走廊而不撞墙。（约300-350词）",
          modelAnswerPoints: [
            "传感器：单前向摄像头。",
            "算法：计算图像左半部分和右半部分的光流矢量。",
            "控制规则：如果 左侧流 > 右侧流，向右转。如果 右侧流 > 左侧流，向左转。",
            "逻辑：较近的墙壁产生较快的流。转向远离可以平衡距离。",
            "优势：不需要笨重的激光雷达或深度映射。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-6",
    week: 6,
    image: "/images/navigation.webp",
    en: {
      title: "Animal and Robot Navigation",
      description: "Path integration, visual homing, and the debate between cognitive maps and route following.",
      keyConcepts: [
        {
          term: "Path Integration (Dead Reckoning)",
          definition: "Updating one's current position by continuously integrating direction and distance travelled from a starting point.",
          webExplanation: "Used by sailors and desert ants. It requires a compass (direction) and an odometer (distance). It accumulates error over time, so it needs calibration with landmarks.",
          lectureExample: "Cataglyphis Ants: In the featureless desert, these ants run hundreds of meters to find food and then run in a straight line back to the nest. They count steps (odometer) and use polarized light (compass)."
        },
        {
          term: "Snapshot Model (Visual Homing)",
          definition: "Navigating by comparing the current visual view with a stored 'snapshot' of the goal location.",
          webExplanation: "A simple, view-based navigation method. The agent moves to reduce the difference between what it sees now and what it remembers seeing at the goal.",
          lectureExample: "Bees at the Nest: Bees take 'orientation flights' when leaving the nest to memorize the visual surroundings (snapshots) so they can match them upon return."
        }
      ],
      quizQuestions: [
        {
          id: "q6-1",
          question: "What is the main limitation of Path Integration?",
          options: [
            "It requires GPS.",
            "It accumulates error over time (cumulative error).",
            "It only works at night.",
            "It requires a large brain."
          ],
          correctAnswer: 1,
          explanation: "Small errors in measuring angle or distance add up. Without external landmarks to reset the position, the estimated location becomes increasingly inaccurate over long distances."
        }
      ],
      sectionA: [
        {
          id: "sa6-1",
          year: "Sample",
          question: "Compare and contrast 'Path Integration' and 'Landmark Navigation'. (~100-150 words)",
          modelAnswerPoints: [
            "Path Integration: Internal, egocentric, accumulates error, works in featureless terrain.",
            "Landmark Navigation: External, allocentric (often), resets error, requires visible features.",
            "Animals often combine both (using landmarks to calibrate path integration)."
          ]
        },
        {
          id: "sa6-2",
          year: "Sample",
          question: "What is a 'Cognitive Map' and why is it controversial in insect navigation? (~150-200 words)",
          modelAnswerPoints: [
            "Cognitive Map: An internal representation of the spatial relationships between landmarks (like a mental street map).",
            "Controversy: Some argue insects use simple view-matching (snapshots) and route following, which looks like a map but isn't one.",
            "Evidence: Insects often struggle with shortcuts they haven't traveled before."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb6-1",
          year: "Sample",
          question: "Design an experiment to determine if an ant is using Path Integration or Visual Landmarks to return to its nest. (~300-350 words)",
          modelAnswerPoints: [
            "Training: Let the ant find food at a specific location.",
            "Test 1 (Displacement): Pick up the ant and move it to a new location. If it runs parallel to the original homeward vector -> Path Integration.",
            "Test 2 (Landmark Shift): Move the landmarks surrounding the nest. If the ant searches in the wrong place relative to the landmarks -> Visual Landmarks.",
            "Conclusion: Most ants use PI first, then switch to landmarks near the nest."
          ]
        }
      ]
    },
    zh: {
      title: "动物与机器人导航 (Animal and Robot Navigation)",
      description: "路径积分、视觉归巢以及认知地图与路线跟随之间的争论。",
      keyConcepts: [
        {
          term: "路径积分 (Path Integration)",
          definition: "通过连续积分从起点行进的方向和距离来更新当前位置。",
          webExplanation: "水手和沙漠蚂蚁使用。它需要指南针（方向）和里程表（距离）。它会随着时间的推移积累误差，因此需要用地标进行校准。",
          lectureExample: "Cataglyphis 蚂蚁：在毫无特征的沙漠中，这些蚂蚁跑几百米寻找食物，然后直线跑回巢穴。它们数步数（里程表）并使用偏振光（指南针）。"
        },
        {
          term: "快照模型 (Snapshot Model)",
          definition: "通过比较当前视觉视图与目标位置的存储'快照'来导航。",
          webExplanation: "一种简单的、基于视图的导航方法。智能体移动以减少它现在看到的与它记忆中在目标处看到的之间的差异。",
          lectureExample: "巢穴处的蜜蜂：蜜蜂在离开巢穴时进行'定向飞行'，以记忆周围的视觉环境（快照），以便它们在返回时进行匹配。"
        }
      ],
      quizQuestions: [
        {
          id: "q6-1",
          question: "路径积分的主要局限性是什么？",
          options: [
            "它需要 GPS。",
            "它会随着时间的推移积累误差（累积误差）。",
            "它只在晚上有效。",
            "它需要很大的大脑。"
          ],
          correctAnswer: 1,
          explanation: "测量角度或距离的小误差会累加。如果没有外部地标来重置位置，估计的位置在长距离上会变得越来越不准确。"
        }
      ],
      sectionA: [
        {
          id: "sa6-1",
          year: "示例",
          question: "比较和对比'路径积分'和'地标导航'。（约100-150词）",
          modelAnswerPoints: [
            "路径积分：内部的，自我中心的，积累误差，在无特征地形中有效。",
            "地标导航：外部的，非自我中心的（通常），重置误差，需要可见特征。",
            "动物通常结合两者（使用地标来校准路径积分）。"
          ]
        },
        {
          id: "sa6-2",
          year: "示例",
          question: "什么是'认知地图'？为什么它在昆虫导航中存在争议？（约150-200词）",
          modelAnswerPoints: [
            "认知地图：地标之间空间关系的内部表征（像心理街道地图）。",
            "争议：有人认为昆虫使用简单的视图匹配（快照）和路线跟随，这看起来像地图但不是。",
            "证据：昆虫通常难以处理它们以前没有走过的捷径。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb6-1",
          year: "示例",
          question: "设计一个实验来确定蚂蚁是使用路径积分还是视觉地标返回巢穴。（约300-350词）",
          modelAnswerPoints: [
            "训练：让蚂蚁在特定位置找到食物。",
            "测试 1（位移）：拿起蚂蚁并将其移动到新位置。如果它平行于原来的归巢矢量跑 -> 路径积分。",
            "测试 2（地标移动）：移动巢穴周围的地标。如果蚂蚁在地标相对的错误位置搜索 -> 视觉地标。",
            "结论：大多数蚂蚁首先使用 PI，然后在巢穴附近切换到地标。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-7",
    week: 7,
    image: "/images/embodied-intelligence.webp",
    en: {
      title: "Movement and Motor Systems",
      description: "The difficulties of motor control (redundancy, noise, delays) and how embodiment simplifies them.",
      keyConcepts: [
        {
          term: "Degrees of Freedom (DOF) Problem",
          definition: "The problem of controlling a body that has many more ways to move (joints/muscles) than are strictly necessary to perform a task.",
          webExplanation: "Bernstein's problem. For example, there are infinite ways to touch your nose with your finger. The brain must select one solution from infinite possibilities.",
          lectureExample: "Octopus Arm: An octopus arm has virtually infinite DOFs (it's flexible everywhere). It simplifies control by using 'stereotypical patterns' like propagating a bend along the arm to fetch food."
        },
        {
          term: "Forward Model",
          definition: "An internal model that predicts the sensory consequences of a motor command.",
          webExplanation: "It allows for rapid movement correction before sensory feedback arrives (which is slow). It also helps distinguish self-generated sensations (tickling yourself) from external ones.",
          lectureExample: "Tickling: You can't tickle yourself because your brain's forward model predicts the sensation and cancels it out. If the prediction is delayed (by a machine), the tickling sensation returns."
        }
      ],
      quizQuestions: [
        {
          id: "q7-1",
          question: "Why can't you tickle yourself?",
          options: [
            "Your skin is not sensitive enough.",
            "Your Forward Model predicts the sensation and suppresses the response.",
            "You know it's coming, so it's not a surprise.",
            "Your muscles are tense."
          ],
          correctAnswer: 1,
          explanation: "The brain sends a copy of the motor command (efference copy) to the forward model, which predicts the sensory outcome. This prediction is subtracted from the actual sensation, cancelling it out."
        }
      ],
      sectionA: [
        {
          id: "sa7-1",
          year: "Sample",
          question: "What is the 'Degrees of Freedom' problem in motor control? (~100-150 words)",
          modelAnswerPoints: [
            "The body has more joints/muscles than needed for a task (redundancy).",
            "This creates an infinite number of possible movement trajectories.",
            "The brain must choose one efficient solution.",
            "Embodiment (e.g., muscle elasticity) helps constrain these choices."
          ]
        },
        {
          id: "sa7-2",
          year: "Sample",
          question: "Explain the function of a 'Forward Model' in handling sensory delays. (~150-200 words)",
          modelAnswerPoints: [
            "Sensory feedback is slow (tens of milliseconds).",
            "Waiting for feedback causes jerky, unstable movement.",
            "A Forward Model predicts the outcome immediately.",
            "The system uses the prediction to correct movement instantly, using actual feedback later for calibration."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb7-1",
          year: "Sample",
          question: "Design a robotic arm control system that solves the Degrees of Freedom problem using 'Muscle Synergies'. (~300-350 words)",
          modelAnswerPoints: [
            "Problem: Controlling 20 individual motors is hard.",
            "Solution: Group motors into 'synergies' (e.g., grasping synergy, reaching synergy).",
            "Control: The 'brain' sends one command to the synergy, which automatically coordinates the 20 motors.",
            "Inspiration: Human spinal cord activates groups of muscles together, simplifying the brain's job."
          ]
        }
      ]
    },
    zh: {
      title: "运动与运动系统 (Movement and Motor Systems)",
      description: "运动控制的困难（冗余、噪声、延迟）以及具身性如何简化它们。",
      keyConcepts: [
        {
          term: "自由度 (DOF) 问题",
          definition: "控制一个拥有比执行任务严格所需的更多运动方式（关节/肌肉）的身体的问题。",
          webExplanation: "伯恩斯坦问题。例如，用手指摸鼻子有无数种方式。大脑必须从无限的可能性中选择一种解决方案。",
          lectureExample: "章鱼触手：章鱼触手拥有几乎无限的自由度（到处都是柔性的）。它通过使用'刻板模式'（如沿着触手传播弯曲来获取食物）来简化控制。"
        },
        {
          term: "前向模型 (Forward Model)",
          definition: "一种预测运动指令的感官后果的内部模型。",
          webExplanation: "它允许在感官反馈（很慢）到达之前进行快速的运动修正。它还有助于区分自身产生的感觉（挠自己痒痒）和外部产生的感觉。",
          lectureExample: "挠痒痒：你不能挠自己痒痒，因为你大脑的前向模型预测了这种感觉并将其抵消。如果预测被延迟（通过机器），挠痒痒的感觉就会回来。"
        }
      ],
      quizQuestions: [
        {
          id: "q7-1",
          question: "为什么你不能挠自己痒痒？",
          options: [
            "你的皮肤不够敏感。",
            "你的前向模型预测了感觉并抑制了反应。",
            "你知道它要来了，所以并不意外。",
            "你的肌肉很紧张。"
          ],
          correctAnswer: 1,
          explanation: "大脑将运动指令的副本（传出副本）发送给前向模型，前向模型预测感官结果。这个预测从实际感觉中减去，将其抵消。"
        }
      ],
      sectionA: [
        {
          id: "sa7-1",
          year: "示例",
          question: "什么是运动控制中的'自由度'问题？（约100-150词）",
          modelAnswerPoints: [
            "身体拥有的关节/肌肉比任务所需的更多（冗余）。",
            "这产生了无限数量的可能运动轨迹。",
            "大脑必须选择一种有效的解决方案。",
            "具身性（例如，肌肉弹性）有助于约束这些选择。"
          ]
        },
        {
          id: "sa7-2",
          year: "示例",
          question: "解释'前向模型'在处理感官延迟中的功能。（约150-200词）",
          modelAnswerPoints: [
            "感官反馈很慢（几十毫秒）。",
            "等待反馈会导致运动不平稳、不稳定。",
            "前向模型立即预测结果。",
            "系统使用预测来即时修正运动，稍后使用实际反馈进行校准。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb7-1",
          year: "示例",
          question: "设计一个机器人手臂控制系统，使用'肌肉协同（Muscle Synergies）'来解决自由度问题。（约300-350词）",
          modelAnswerPoints: [
            "问题：控制 20 个单独的电机很难。",
            "解决方案：将电机分组为'协同'（例如，抓取协同、伸展协同）。",
            "控制：'大脑'向协同发送一个指令，协同自动协调 20 个电机。",
            "灵感：人类脊髓一起激活肌肉群，简化了大脑的工作。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-8",
    week: 8,
    image: "/images/tool-use.webp",
    en: {
      title: "Tool Use",
      description: "Definitions of tool use, folk physics, and the role of embodiment and play.",
      keyConcepts: [
        {
          term: "Folk Physics",
          definition: "A common-sense understanding of how the physical world works (gravity, solidity, causality) without formal scientific training.",
          webExplanation: "Animals with good folk physics can predict the outcome of physical interactions. For example, knowing that pulling a towel will bring the food on top of it closer.",
          lectureExample: "Trap Tube Task: Animals must push food out of a tube while avoiding a trap hole. Understanding *why* the food falls into the hole requires folk physics, not just associative learning."
        },
        {
          term: "Metatool Use",
          definition: "Using one tool to obtain another tool.",
          webExplanation: "A sign of advanced planning and hierarchical cognition. It requires keeping a sub-goal in mind (get the stick) to achieve the main goal (get the food).",
          lectureExample: "New Caledonian Crows: Betty the crow bent a straight wire into a hook to lift a bucket of food. This showed understanding of the tool's properties and the task requirements."
        }
      ],
      quizQuestions: [
        {
          id: "q8-1",
          question: "What did Betty the crow do that was so significant?",
          options: [
            "She used a stick to get food.",
            "She bent a straight wire into a hook to solve a novel problem.",
            "She taught other crows how to use tools.",
            "She used a stone to crack a nut."
          ],
          correctAnswer: 1,
          explanation: "Spontaneous modification of a tool (bending the wire) to solve a new problem suggests causal understanding (folk physics) rather than just instinct or rote learning."
        }
      ],
      sectionA: [
        {
          id: "sa8-1",
          year: "Sample",
          question: "Define 'Metatool Use' and explain why it is considered cognitively demanding. (~100-150 words)",
          modelAnswerPoints: [
            "Metatool use is using tool A to get tool B.",
            "It requires hierarchical planning (Goal -> Sub-goal).",
            "The animal must inhibit the urge to go directly for the food.",
            "It implies a deeper understanding of causal chains."
          ]
        },
        {
          id: "sa8-2",
          year: "Sample",
          question: "What is the 'Trap Tube Task' and what does it test? (~150-200 words)",
          modelAnswerPoints: [
            "A tube with a trap hole in the middle.",
            "The animal must push food away from the trap.",
            "It tests 'Folk Physics' (understanding gravity/solidity) vs. Associative Learning.",
            "Many animals fail or learn a simple rule ('always push left') without understanding gravity."
          ]
        }
      ],
      sectionB: [
        {
          id: "sb8-1",
          year: "Sample",
          question: "Design a new test to distinguish between 'Associative Learning' and 'Causal Understanding' in tool-using birds. (~300-350 words)",
          modelAnswerPoints: [
            "Task: A puzzle box that can be opened by dropping a stone.",
            "Phase 1: Train bird that Stone -> Food.",
            "Phase 2 (Test): Present two mechanisms: one with a visible physical connection (string), one with no connection (magic).",
            "Prediction: If they understand causality, they should prefer the physically connected mechanism. If associative, they might choose randomly.",
            "Transfer Test: Change the materials (e.g., color) but keep the physics. Causal understanders should adapt immediately."
          ]
        }
      ]
    },
    zh: {
      title: "工具使用 (Tool Use)",
      description: "工具使用的定义、民间物理学以及具身性和游戏的作​​用。",
      keyConcepts: [
        {
          term: "民间物理学 (Folk Physics)",
          definition: "对物理世界如何运作（重力、坚固性、因果关系）的常识性理解，无需正式的科学训练。",
          webExplanation: "拥有良好民间物理学的动物可以预测物理相互作用的结果。例如，知道拉毛巾会把上面的食物拉近。",
          lectureExample: "陷阱管任务：动物必须将食物推出管子，同时避开陷阱孔。理解*为什么*食物会掉进洞里需要民间物理学，而不仅仅是联想学习。"
        },
        {
          term: "元工具使用 (Metatool Use)",
          definition: "使用一个工具来获取另一个工具。",
          webExplanation: "高级规划和分层认知的标志。它需要记住子目标（拿到棍子）以实现主要目标（拿到食物）。",
          lectureExample: "新喀里多尼亚乌鸦：乌鸦贝蒂将一根直铁丝弯成钩子来提起一桶食物。这表明了对工具属性和任务要求的理解。"
        }
      ],
      quizQuestions: [
        {
          id: "q8-1",
          question: "乌鸦贝蒂做了什么如此重要的事情？",
          options: [
            "她用棍子获取食物。",
            "她将直铁丝弯成钩子来解决一个新问题。",
            "她教其他乌鸦如何使用工具。",
            "她用石头砸坚果。"
          ],
          correctAnswer: 1,
          explanation: "自发地修改工具（弯曲铁丝）来解决新问题表明了因果理解（民间物理学），而不仅仅是本能或死记硬背。"
        }
      ],
      sectionA: [
        {
          id: "sa8-1",
          year: "示例",
          question: "定义'元工具使用'并解释为什么它被认为对认知要求很高。（约100-150词）",
          modelAnswerPoints: [
            "元工具使用是用工具 A 去获取工具 B。",
            "它需要分层规划（目标 -> 子目标）。",
            "动物必须抑制直接去取食物的冲动。",
            "它意味着对因果链有更深的理解。"
          ]
        },
        {
          id: "sa8-2",
          year: "示例",
          question: "什么是'陷阱管任务'，它测试什么？（约150-200词）",
          modelAnswerPoints: [
            "一个中间有陷阱孔的管子。",
            "动物必须将食物推离陷阱。",
            "它测试'民间物理学'（理解重力/坚固性）与联想学习。",
            "许多动物失败或学会简单的规则（'总是向左推'）而不理解重力。"
          ]
        }
      ],
      sectionB: [
        {
          id: "sb8-1",
          year: "示例",
          question: "设计一个新的测试来区分使用工具的鸟类的'联想学习'和'因果理解'。（约300-350词）",
          modelAnswerPoints: [
            "任务：一个可以通过扔石头打开的拼图盒。",
            "阶段 1：训练鸟 石头 -> 食物。",
            "阶段 2（测试）：呈现两种机制：一种有可见的物理连接（绳子），一种没有连接（魔法）。",
            "预测：如果它们理解因果关系，它们应该更喜欢物理连接的机制。如果是联想，它们可能会随机选择。",
            "迁移测试：改变材料（如颜色）但保持物理特性。因果理解者应该立即适应。"
          ]
        }
      ]
    }
  },
  {
    id: "lecture-9",
    week: 9,
    image: "/images/hero-banner.webp",
    en: {
      title: "Brain Size",
      description: "Theories on why brains vary in size and what 'more brain' actually buys you.",
      keyConcepts: [
        {
          term: "Social Brain Hypothesis",
          definition: "The theory that large brains evolved primarily to handle the computational demands of complex social systems (tracking relationships, deception, alliances).",
          webExplanation: "Proposed by Robin Dunbar. It correlates neocortex size with group size in primates. Living in a group requires predicting the behaviour of others, which is cognitively demanding.",
          lectureExample: "Dunbar's Number: The cognitive limit to the number of people with whom one can maintain stable social relationships (approx. 150 for humans), predicted by our brain size."
        },
        {
          term: "Encephalization Quotient (EQ)",
          definition: "A measure of relative brain size defined as the ratio between actual brain mass and predicted brain mass for an animal of a given size.",
          webExplanation: "A more accurate measure of intelligence than raw brain weight. Humans have a high EQ (~7.5), meaning our brains are much larger than expected for a mammal of our body size.",
          lectureExample: "Human vs. Whale: A whale has a larger brain in absolute terms, but a lower EQ than a human. The extra brain mass is needed to manage the massive body, not necessarily for higher cognition."
        }
      ],
      quizQuestions: [
        {
          id: "q9-1",
          question: "According to the Social Brain Hypothesis, what drives the evolution of large brains?",
          options: [
            "Tool use.",
            "Complex social interactions.",
            "Finding fruit.",
            "Navigating large territories."
          ],
          correctAnswer: 1,
          explanation: "The hypothesis argues that the complexity of social life (maintaining cohesion, managing conflicts) exerts the strongest selection pressure on brain size in primates."
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-9-new-2023",
              year: "2023",
              question: "Describe at least 2 key challenges faced when deploying bipedal robots in the kind of factory environment shown on the photograph. Speculate on Amazon’s rationale for the design of the legs.",
              modelAnswerPoints: [
                "Challenge 1: Balance/Stability in unstructured environments (debris, uneven floors).",
                "Challenge 2: Safety/Interaction with humans (predicting movement, avoiding collisions).",
                "Rationale: Biomimicry (energy efficiency), Brownfield Integration (navigating stairs/gaps built for humans)."
              ]
            },
            {
              id: "sa9-1",
          year: "Sample",
          question: "Explain the 'Social Brain Hypothesis' and the evidence supporting it. (~100-150 words)",
          modelAnswerPoints: [
            "Large brains evolved to handle social complexity.",
            "Evidence: Correlation between neocortex size and group size in primates.",
            "Social life requires memory, recognition, and prediction of others' behaviour.",
            "It explains why primates have larger brains than solitary mammals of similar size."
          ]
        },
        {
          id: "sa9-2",
          year: "Sample",
          question: "Why is 'Encephalization Quotient' (EQ) a better measure of intelligence than absolute brain size? (~150-200 words)",
          modelAnswerPoints: [
            "Absolute brain size scales with body size (larger body needs larger brain for maintenance).",
            "EQ controls for body size (Actual Brain / Predicted Brain).",
            "High EQ indicates 'extra' brain tissue available for cognitive tasks.",
            "Example: Humans have high EQ; Whales have large brains but lower EQ."
          ]
        }
      ],
          sectionB: [
            {
              id: "sectionB-lecture-9-new-2024",
              year: "2024",
              question: "You are asked by a manufacturing company to design a baseball batting robot. Focusing on motor control, explain why this is actually a hard problem for a robot.",
              modelAnswerPoints: [
                "Precision and Timing: Hitting requires ms timing and high precision. Ball speed 80-100+ mph.",
                "High-Speed Motion Control: Requires powerful actuators for fast acceleration/deceleration without overshooting.",
                "Dynamic Adaptability: Must adapt to pitch speed, spin, location variations. Pre-programmed swing fails on diverse pitches.",
                "Control System Complexity: Sophisticated coordination of motors/actuators needed."
              ]
            },
            {
              id: "sb9-1",
          year: "Sample",
          question: "Design a comparative study to test the 'Ecological Intelligence Hypothesis' vs. the 'Social Brain Hypothesis' in a group of mammals. (~300-350 words)",
          modelAnswerPoints: [
            "Subjects: Choose related species with different diets (fruit vs. leaf) and social structures (solitary vs. group).",
            "Measure: Brain size (or neocortex ratio).",
            "Correlation 1 (Ecological): Does brain size correlate with diet complexity (fruit requires spatial memory)?",
            "Correlation 2 (Social): Does brain size correlate with group size?",
            "Analysis: Use statistical regression to see which factor (Diet or Sociality) better predicts brain size."
          ]
        }
      ]
    },
    zh: {
      title: "脑容量 (Brain Size)",
      description: "关于大脑大小为何变化以及'更多的大脑'实际上能带来什么的理论。",
      keyConcepts: [
        {
          term: "社会脑假说 (Social Brain Hypothesis)",
          definition: "该理论认为，大脑袋的进化主要是为了处理复杂社会系统的计算需求（跟踪关系、欺骗、联盟）。",
          webExplanation: "由罗宾·邓巴提出。它将灵长类动物的新皮层大小与群体大小联系起来。生活在群体中需要预测他人的行为，这对认知要求很高。",
          lectureExample: "邓巴数：一个人可以维持稳定社会关系的人数的认知极限（人类约为 150），由我们的大脑大小预测。"
        },
        {
          term: "脑形成商数 (Encephalization Quotient, EQ)",
          definition: "相对脑大小的度量，定义为实际脑质量与给定大小动物的预测脑质量之间的比率。",
          webExplanation: "比原始脑重量更准确的智能衡量标准。人类的 EQ 很高（~7.5），这意味着对于我们这种体型的哺乳动物来说，我们的大脑比预期的要大得多。",
          lectureExample: "人类 vs. 鲸鱼：鲸鱼的绝对脑容量更大，但 EQ 低于人类。额外的脑质量是管理巨大身体所需的，不一定是为了高级认知。"
        }
      ],
      quizQuestions: [
        {
          id: "q9-1",
          question: "根据社会脑假说，什么驱动了大脑袋的进化？",
          options: [
            "工具使用。",
            "复杂的社会互动。",
            "寻找水果。",
            "在广阔的领土上导航。"
          ],
          correctAnswer: 1,
          explanation: "该假说认为，社会生活的复杂性（维持凝聚力、管理冲突）对灵长类动物的大脑大小施加了最强的选择压力。"
        }
      ],
          sectionA: [
            {
              id: "sectionA-lecture-9-new-2023",
              year: "2023",
              question: "描述在照片所示的工厂环境中部署双足机器人时面临的至少2个关键挑战。推测亚马逊设计其腿部的理由。",
              modelAnswerPoints: [
                "挑战1: 非结构化环境中的平衡/稳定性（碎片、不平地面）。",
                "挑战2: 安全/人机交互（预测人类动作、避免碰撞）。",
                "理由: 仿生学（能效），棕地集成（适应为人类设计的楼梯/通道）。"
              ]
            },
            {
              id: "sa9-1",
          year: "示例",
          question: "解释'社会脑假说'及其支持证据。（约100-150词）",
          modelAnswerPoints: [
            "大脑袋进化是为了处理社会复杂性。",
            "证据：灵长类动物新皮层大小与群体大小之间的相关性。",
            "社会生活需要记忆、识别和预测他人的行为。",
            "它解释了为什么灵长类动物的大脑比同等大小的独居哺乳动物大。"
          ]
        },
        {
          id: "sa9-2",
          year: "示例",
          question: "为什么'脑形成商数' (EQ) 是比绝对脑容量更好的智能衡量标准？（约150-200词）",
          modelAnswerPoints: [
            "绝对脑容量随体型变化（更大的身体需要更大的大脑来维持）。",
            "EQ 控制了体型因素（实际大脑 / 预测大脑）。",
            "高 EQ 表明有'额外'的脑组织可用于认知任务。",
            "例子：人类 EQ 高；鲸鱼大脑大但 EQ 较低。"
          ]
        }
      ],
          sectionB: [
            {
              id: "sectionB-lecture-9-new-2024",
              year: "2024",
              question: "一家制造公司要求您设计一个棒球击球机器人。请重点关注运动控制，解释为什么这对机器人来说实际上是一个难题。",
              modelAnswerPoints: [
                "精确度与时机: 击打需要毫秒级时机和高精度。球速80-100+英里/小时。",
                "高速运动控制: 需要强大执行器实现快速加减速且不过冲。",
                "动态适应性: 需适应投球速度、旋转、位置变化。预设挥杆无法应对多样化投球。",
                "控制系统复杂性: 需要复杂的电机/执行器协调。"
              ]
            },
            {
              id: "sb9-1",
          year: "示例",
          question: "设计一项比较研究，在一组哺乳动物中测试'生态智能假说'与'社会脑假说'。（约300-350词）",
          modelAnswerPoints: [
            "对象：选择具有不同饮食（水果 vs. 树叶）和社会结构（独居 vs. 群居）的相关物种。",
            "测量：脑容量（或新皮层比率）。",
            "相关性 1（生态）：脑容量是否与饮食复杂性相关（水果需要空间记忆）？",
            "相关性 2（社会）：脑容量是否与群体大小相关？",
            "分析：使用统计回归查看哪个因素（饮食或社会性）能更好地预测脑容量。"
          ]
        }
      ]
    }
  }
];
