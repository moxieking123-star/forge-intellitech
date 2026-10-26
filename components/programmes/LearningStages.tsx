"use client";
import { useState } from "react";
import styles from "./Programmes.module.css";
const stages = [
  {
    label: "Discover",
    heading: "Start with a question.",
    copy: "An instructor introduces an idea and demonstrates an approach. Learners connect it to something familiar, ask questions and begin to see what a digital tool can help them do.",
    prompt: "What happens if I try this?",
  },
  {
    label: "Make",
    heading: "Give the idea a first version.",
    copy: "Learners practise, break a task into smaller steps and make something of their own. Guidance helps them move through difficulties while leaving room for their own choices.",
    prompt: "How could I make this work?",
  },
  {
    label: "Improve",
    heading: "Look again. Make it better.",
    copy: "Learners test their work, discuss feedback and explain their decisions. Projects and records help them recognise progress and collect work they can carry forward.",
    prompt: "What would I change next?",
  },
];
export default function LearningStages() {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.stageExplorer}>
      <div
        className={styles.stageButtons}
        aria-label="Explore the learning stages"
      >
        {stages.map((stage, index) => (
          <button
            key={stage.label}
            type="button"
            aria-pressed={active === index}
            aria-controls="learning-stage-detail"
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {stage.label}
            <span aria-hidden>↗</span>
          </button>
        ))}
      </div>
      <div
        id="learning-stage-detail"
        className={styles.stageDetail}
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p className={styles.eyebrow}>{stages[active].label}</p>
          <h3>{stages[active].heading}</h3>
          <p>{stages[active].copy}</p>
        </div>
        <p className={styles.stagePrompt}>“{stages[active].prompt}”</p>
      </div>
    </div>
  );
}
