import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";
import { config } from "../../constants/config";

const getCompanyInitials = (companyName: string) => {
  return companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getCompanyColor = (companyName: string) => {
  const colors: { [key: string]: string } = {
    InnovTech: "#915EFF",
    "Art-Creativity": "#00D4FF",
    Sicogès: "#FF6B6B",
    INSIT: "#4ECDC4",
  };
  return colors[companyName] || "#915EFF";
};

const ExperienceCard: React.FC<TExperience> = (experience) => {
  const initials = getCompanyInitials(experience.companyName);
  const bgColor = getCompanyColor(experience.companyName);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: bgColor }}
      icon={
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[rgba(145,94,255,0.2)] to-[rgba(0,212,255,0.2)] rounded-full">
          <div className="flex items-center justify-center w-full h-full">
            {experience.icon ? (
              <img
                src={experience.icon}
                alt={experience.companyName}
                className="h-[60%] w-[60%] object-contain"
              />
            ) : (
              <span className="text-white font-bold text-xl">{initials}</span>
            )}
          </div>
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] font-bold text-white">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 pl-1 text-[14px] tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
