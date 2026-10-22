"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import styles from "./Movement.module.css";

const roles = [
  {
    id: "laptop",
    label: "Give a laptop",
    title: "A device you can spare. A beginning they can build on.",
    text: "New or used, a suitable Windows laptop can give a learner a place to start. Tell us what you have, where you are and where you would like to help. We request devices only when there is a verified student need to match them to.",
    action: "Tell us about your device",
  },
  {
    id: "volunteer",
    label: "Volunteer",
    title: "You do not have to do everything to make a difference.",
    text: "Give some time to the work around learning: workshops, coordination, device handovers or helping the movement reach the right people. Volunteers anywhere in the world can also support the Saturday SS1–SS3 classes: about three hours of building in the learner’s track, accessed through the portal. Tell us your skills, location and availability so we can discuss where they fit.",
    action: "Offer your time",
  },
  {
    id: "educator",
    label: "Teach a skill",
    title: "What you know could introduce someone to what they can do.",
    text: "Help a young person move from following instructions to understanding, trying and creating. If you can teach a practical skill or guide a project, tell us your area of experience and availability. We will discuss how you can support the learning.",
    action: "Offer your skills",
  },
  {
    id: "sponsor",
    label: "Sponsor learning",
    title: "Help the learning continue after the handover.",
    text: "A device matters. So does the support that helps a child keep using it to learn. Talk to us about supporting devices, training or other agreed learning needs. Sponsors who want to follow a supported student's progress can request updates through Forge.",
    action: "Discuss sponsorship",
  },
  {
    id: "patron",
    label: "Become a patron",
    title: "Stand behind a beginning that can outlive the moment.",
    text: "Help us build the relationships, resources and continuity this work needs. If you can open a door, offer sustained support or bring others into the movement, there is a conversation worth having. Let us start with what you can contribute.",
    action: "Talk about becoming a patron",
  },
  {
    id: "partnership",
    label: "Partner with us",
    title: "Bring the reach of your organisation to a child's next step.",
    text: "Government, companies, schools, community groups and international organisations can help more young people get a real opportunity to create. Bring devices, expertise, resources or access. We will work through the practical contribution and the student need together.",
    action: "Start a partnership conversation",
  },
];

export default function JoinMovement({
  focus = "movement",
}: {
  focus?: "movement" | "laptop";
}) {
  const [selected, setSelected] = useState(
    focus === "laptop" ? roles[0] : roles[1],
  );
  const choices =
    focus === "laptop"
      ? roles
      : [roles[1], roles[2], roles[3], roles[4], roles[5], roles[0]].map(
          (role) =>
            role.id === "sponsor"
              ? {
                  ...role,
                  title: "Back a beginning, not just a moment.",
                  text: "Support a promising student idea, practical learning, access to a device, a first work opportunity or a school conversation that opens a door. Choose the initiative you want to stand behind, and we will discuss the resources and follow-through it needs.",
                }
              : role,
        );
  return (
    <section
      id="join-movement"
      className={styles.join}
      aria-labelledby="join-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Find your place</p>
        <h2 id="join-title">
          What can you bring
          <br />
          to the beginning?
        </h2>
        <p>You do not need to have everything. Start with what you can give.</p>
      </div>
      <div
        className={styles.roleChoices}
        role="group"
        aria-label="Ways to support Endless Possibilities"
      >
        {choices.map((role) => (
          <button
            key={role.id}
            type="button"
            aria-pressed={selected.id === role.id}
            aria-controls="contribution-detail"
            onClick={() => setSelected(role)}
          >
            {role.label}
            <ArrowRight size={20} aria-hidden />
          </button>
        ))}
      </div>
      <div
        id="contribution-detail"
        className={styles.roleDetail}
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p className={styles.eyebrow}>{selected.label}</p>
          <h3>{selected.title}</h3>
        </div>
        <div>
          <p>{selected.text}</p>
          <Link
            href={
              focus === "movement" && selected.id === "laptop"
                ? "/endless-possibilities/give-a-child-a-laptop"
                : selected.id === "laptop"
                  ? "/endless-possibilities/give-a-child-a-laptop/donate"
                  : selected.id === "sponsor" || selected.id === "patron"
                    ? "/partner?interest=sponsorship"
                    : `/contact?interest=${selected.id}`
            }
            className={styles.button}
          >
            {focus === "movement" && selected.id === "laptop"
              ? "Explore Give a Child a Laptop"
              : selected.action}
            <ArrowRight size={22} aria-hidden />
          </Link>
          <p className={styles.smallNote}>
            {focus === "movement" && selected.id === "laptop"
              ? "Explore device requirements, student eligibility and the different ways to take part."
              : "This starts an enquiry with Forge. We will discuss the details with you before arranging a contribution."}
          </p>
        </div>
      </div>
    </section>
  );
}
