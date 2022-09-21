async function getExperience() {
  try {
    const response = await fetch(
      "https://zany-skitter-caper.glitch.me/experiences"
    );

    if (response.ok) {
      const experience = await response.json();

      experience
        .sort((a, b) => {
          return b.startYear - a.startYear;
        })
        .sort((a, b) => {
          return b.finishYear - a.finishYear;
        })
        .forEach((exp) => {
          createExperienceHTML(exp);
        });
    } else {
      console.log("Error occured.");
    }
  } catch (error) {
    console.log("Error message: " + error);
  }
}

async function getSkills() {
  try {
    const response = await fetch("https://zany-skitter-caper.glitch.me/skills");
    if (response.ok) {
      const skills = await response.json();
      skills.forEach((skill) => {
        createSkillsHTML(skill);
      });
    } else {
      console.log("Error occured.");
    }
  } catch (error) {
    console.log("Error message: " + error);
  }
}

function createSkillsHTML(skill) {
  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("labels-container");
  const skillTitle = document.createElement("label");
  skillTitle.innerText = skill.title;
  skillTitle.classList.add("skill-title");
  const skillValue = document.createElement("label");
  skillValue.innerText = `${skill.level}%`;
  skillValue.classList.add("skill-value");

  const diagramElement = document.createElement("input");
  diagramElement.type = "range";
  diagramElement.min = 0;
  diagramElement.max = 100;

  diagramElement.style.backgroundSize =
    ((skill.level - diagramElement.min) * 100) / (100 - 0) + "% 100%";

  const skillElement = document.createElement("div");
  skillElement.classList.add("skill-element");

  labelsContainer.append(skillTitle, skillValue);
  skillElement.append(labelsContainer, diagramElement);
  const skillsElement = document.getElementById("skills");
  skillsElement.append(skillElement);
}

function createExperienceHTML(experience) {
  const experienceContainer = document.createElement("div");
  experienceContainer.classList.add("grid-container");

  const yearElement = document.createElement("h3");
  let currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  if (experience.finishYear === currentYear) {
    currentYear = "Current";
  } else {
    currentYear = experience.finishYear;
  }
  yearElement.innerText = `${experience.startYear} - ${currentYear}`;

  const companyElement = document.createElement("p");
  companyElement.innerText = experience.companyName;

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("col-1");
  leftContainer.append(yearElement, companyElement);

  const positionElement = document.createElement("h3");
  positionElement.innerText = experience.position;

  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = experience.description;

  const rightContainer = document.createElement("div");
  rightContainer.classList.add("col-2");
  rightContainer.append(positionElement, descriptionElement);

  experienceContainer.append(leftContainer, rightContainer);

  const expContainer = document.getElementById("experience");
  expContainer.append(experienceContainer);
}

getExperience();
getSkills();
