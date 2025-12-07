// Mental Health Assessment Questions
// Based on standard clinical assessment tools

const assessmentQuestions = {
  // Mood Assessment (Depression) - Based on Beck Depression Inventory
  mood: {
    name: "Mood Assessment (Depression Screening)",
    description: "Evaluate your mood levels and identify potential depressive symptoms",
    duration: "5-10 minutes",
    questions: [
      {
        id: 1,
        text: "Sadness",
        options: [
          { value: 0, label: "I do not feel sad" },
          { value: 1, label: "I feel sad much of the time" },
          { value: 2, label: "I am sad all the time" },
          { value: 3, label: "I am so sad or unhappy that I can't stand it" },
        ],
      },
      {
        id: 2,
        text: "Pessimism",
        options: [
          { value: 0, label: "I am not discouraged about my future" },
          { value: 1, label: "I feel more discouraged about my future than I used to be" },
          { value: 2, label: "I do not expect things to work out for me" },
          { value: 3, label: "I feel my future is hopeless and will only get worse" },
        ],
      },
      {
        id: 3,
        text: "Past Failure",
        options: [
          { value: 0, label: "I do not feel like a failure" },
          { value: 1, label: "I have failed more than I should have" },
          { value: 2, label: "As I look back, I see a lot of failures" },
          { value: 3, label: "I feel I am a total failure as a person" },
        ],
      },
      {
        id: 4,
        text: "Loss of Pleasure",
        options: [
          { value: 0, label: "I get as much pleasure as I ever did from the things I enjoy" },
          { value: 1, label: "I don't enjoy things as much as I used to" },
          { value: 2, label: "I get very little pleasure from the things I used to enjoy" },
          { value: 3, label: "I can't get any pleasure from the things I used to enjoy" },
        ],
      },
      {
        id: 5,
        text: "Guilty Feelings",
        options: [
          { value: 0, label: "I don't feel particularly guilty" },
          { value: 1, label: "I feel guilty over many things I have done or should have done" },
          { value: 2, label: "I feel quite guilty most of the time" },
          { value: 3, label: "I feel guilty all of the time" },
        ],
      },
      {
        id: 6,
        text: "Punishment Feelings",
        options: [
          { value: 0, label: "I don't feel I am being punished" },
          { value: 1, label: "I feel I may be punished" },
          { value: 2, label: "I expect to be punished" },
          { value: 3, label: "I feel I am being punished" },
        ],
      },
      {
        id: 7,
        text: "Self-Dislike",
        options: [
          { value: 0, label: "I feel the same about myself as ever" },
          { value: 1, label: "I have lost confidence in myself" },
          { value: 2, label: "I am disappointed in myself" },
          { value: 3, label: "I dislike myself" },
        ],
      },
      {
        id: 8,
        text: "Self-Criticalness",
        options: [
          { value: 0, label: "I don't criticize or blame myself more than usual" },
          { value: 1, label: "I am more critical of myself than I used to be" },
          { value: 2, label: "I criticize myself for all of my faults" },
          { value: 3, label: "I blame myself for everything bad that happens" },
        ],
      },
      {
        id: 9,
        text: "Crying",
        options: [
          { value: 0, label: "I don't cry anymore than I used to" },
          { value: 1, label: "I cry more than I used to" },
          { value: 2, label: "I cry over every little thing" },
          { value: 3, label: "I feel like crying, but I can't" },
        ],
      },
      {
        id: 10,
        text: "Loss of Interest",
        options: [
          { value: 0, label: "I have not lost interest in other people or activities" },
          { value: 1, label: "I am less interested in other people or things than before" },
          { value: 2, label: "I have lost most of my interest in other people or things" },
          { value: 3, label: "It's hard to get interested in anything" },
        ],
      },
    ],
  },

  // Drug Abuse Screening Test (DAST-10)
  dast10: {
    name: "Drug Abuse Screening Test (DAST-10)",
    description: "Assess the degree of problems related to drug abuse",
    duration: "3-5 minutes",
    questions: [
      {
        id: 1,
        text: "Have you used drugs other than those required for medical reasons?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 2,
        text: "Do you abuse more than one drug at a time?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 3,
        text: "Are you always able to stop using drugs when you want to?",
        type: "yesno",
        yesScore: 0, // No = 1 point (reversed)
        reversed: true,
      },
      {
        id: 4,
        text: "Have you had 'blackouts' or 'flashbacks' as a result of drug use?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 5,
        text: "Do you ever feel bad or guilty about your drug use?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 6,
        text: "Does your spouse (or parents) ever complain about your involvement with drugs?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 7,
        text: "Have you neglected your family because of your use of drugs?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 8,
        text: "Have you engaged in illegal activities in order to obtain drugs?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 9,
        text: "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
        type: "yesno",
        yesScore: 1,
      },
      {
        id: 10,
        text: "Have you had medical problems as a result of your drug use (e.g., memory loss, hepatitis, convulsions, bleeding)?",
        type: "yesno",
        yesScore: 1,
      },
    ],
  },

  // Anxiety Assessment - Based on Beck Anxiety Inventory
  anxiety: {
    name: "Anxiety Assessment",
    description: "Evaluate your anxiety levels and identify anxiety symptoms",
    duration: "5-10 minutes",
    questions: [
      {
        id: 1,
        text: "Numbness or tingling",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 2,
        text: "Feeling hot",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 3,
        text: "Wobbliness in legs",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 4,
        text: "Unable to relax",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 5,
        text: "Fear of worst happening",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 6,
        text: "Dizzy or lightheaded",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 7,
        text: "Heart pounding/racing",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 8,
        text: "Unsteady",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 9,
        text: "Terrified or afraid",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 10,
        text: "Nervous",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 11,
        text: "Feeling of choking",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
      {
        id: 12,
        text: "Hands trembling",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Mildly" },
          { value: 2, label: "Moderately" },
          { value: 3, label: "Severely" },
        ],
      },
    ],
  },

  // Psychological Well-Being (Ryff Scales) - Shortened version
  wellbeing: {
    name: "Psychological Well-Being Assessment",
    description: "Evaluate your overall psychological well-being across multiple dimensions",
    duration: "10-15 minutes",
    questions: [
      {
        id: 1,
        text: "I like most parts of my personality",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 2,
        text: "When I look at the story of my life, I am pleased with how things have turned out",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 3,
        text: "I have confidence in my opinions, even if they are contrary to the general consensus",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 4,
        text: "I enjoy making plans for the future and working to make them a reality",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 5,
        text: "Maintaining close relationships has been difficult and frustrating for me",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
      {
        id: 6,
        text: "I live life one day at a time and don't really think about the future",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
      {
        id: 7,
        text: "In general, I feel I am in charge of the situation in which I live",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 8,
        text: "I am good at managing the responsibilities of my daily life",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 9,
        text: "I have a sense of direction and purpose in life",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 10,
        text: "My daily activities often seem trivial and unimportant to me",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
      {
        id: 11,
        text: "I like most aspects of my personality",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 12,
        text: "I tend to be influenced by people with strong opinions",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
      {
        id: 13,
        text: "I enjoy personal and mutual conversations with family members or friends",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 14,
        text: "I don't want to try new ways of doing things—my life is fine the way it is",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
      {
        id: 15,
        text: "For me, life has been a continuous process of learning, changing, and growth",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 16,
        text: "I think it is important to have new experiences that challenge how you think about yourself and the world",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 17,
        text: "People would describe me as a giving person, willing to share my time with others",
        options: [
          { value: 1, label: "Strongly disagree" },
          { value: 2, label: "Disagree" },
          { value: 3, label: "Slightly disagree" },
          { value: 4, label: "Slightly agree" },
          { value: 5, label: "Agree" },
          { value: 6, label: "Strongly agree" },
        ],
      },
      {
        id: 18,
        text: "I gave up trying to make big improvements or changes in my life a long time ago",
        options: [
          { value: 6, label: "Strongly disagree" },
          { value: 5, label: "Disagree" },
          { value: 4, label: "Slightly disagree" },
          { value: 3, label: "Slightly agree" },
          { value: 2, label: "Agree" },
          { value: 1, label: "Strongly agree" },
        ],
        reversed: true,
      },
    ],
  },

  // Y-BOCS (Yale-Brown Obsessive Compulsive Scale) - Simplified version
  ybocs: {
    name: "Obsessive-Compulsive Symptoms Assessment (Y-BOCS)",
    description: "Evaluate obsessive-compulsive symptoms",
    duration: "10-15 minutes",
    questions: [
      {
        id: 1,
        text: "Time occupied by obsessive thoughts: How much of your time is occupied by obsessive thoughts?",
        options: [
          { value: 0, label: "None" },
          { value: 1, label: "Less than 1 hour per day" },
          { value: 2, label: "1 to 3 hours per day" },
          { value: 3, label: "3 to 8 hours per day" },
          { value: 4, label: "More than 8 hours per day" },
        ],
      },
      {
        id: 2,
        text: "Interference from obsessive thoughts: How much do your obsessive thoughts interfere with your work, school, social, or other important activities?",
        options: [
          { value: 0, label: "None" },
          { value: 1, label: "Mild, slight interference" },
          { value: 2, label: "Moderate, definite interference" },
          { value: 3, label: "Severe interference" },
          { value: 4, label: "Extreme, incapacitating" },
        ],
      },
      {
        id: 3,
        text: "Distress associated with obsessive thoughts: How much distress do your obsessive thoughts cause you?",
        options: [
          { value: 0, label: "None" },
          { value: 1, label: "Mild, not too disturbing" },
          { value: 2, label: "Moderate, disturbing but manageable" },
          { value: 3, label: "Severe, very disturbing" },
          { value: 4, label: "Extreme, near constant and disabling distress" },
        ],
      },
      {
        id: 4,
        text: "Resistance against obsessions: How much of an effort do you make to resist the obsessive thoughts?",
        options: [
          { value: 0, label: "Always resist" },
          { value: 1, label: "Try to resist most of the time" },
          { value: 2, label: "Make some effort to resist" },
          { value: 3, label: "Yield to all obsessions without attempting to control them" },
          { value: 4, label: "Completely and willingly yield to all obsessions" },
        ],
      },
      {
        id: 5,
        text: "Control over obsessive thoughts: How much control do you have over your obsessive thoughts?",
        options: [
          { value: 0, label: "Complete control" },
          { value: 1, label: "Much control" },
          { value: 2, label: "Moderate control" },
          { value: 3, label: "Little control" },
          { value: 4, label: "No control" },
        ],
      },
      {
        id: 6,
        text: "Time spent performing compulsive behaviors: How much time do you spend performing compulsive behaviors?",
        options: [
          { value: 0, label: "None" },
          { value: 1, label: "Less than 1 hour per day" },
          { value: 2, label: "1 to 3 hours per day" },
          { value: 3, label: "3 to 8 hours per day" },
          { value: 4, label: "More than 8 hours per day" },
        ],
      },
      {
        id: 7,
        text: "Interference from compulsive behaviors: How much do your compulsive behaviors interfere with your work, school, social, or other important activities?",
        options: [
          { value: 0, label: "None" },
          { value: 1, label: "Mild, slight interference" },
          { value: 2, label: "Moderate, definite interference" },
          { value: 3, label: "Severe interference" },
          { value: 4, label: "Extreme, incapacitating" },
        ],
      },
      {
        id: 8,
        text: "Distress associated with compulsive behavior: How would you feel if prevented from performing your compulsions?",
        options: [
          { value: 0, label: "Not at all anxious" },
          { value: 1, label: "Only slightly anxious" },
          { value: 2, label: "Anxiety would mount but remain manageable" },
          { value: 3, label: "Prominent and very disturbing increase in anxiety" },
          { value: 4, label: "Extreme, incapacitating anxiety" },
        ],
      },
      {
        id: 9,
        text: "Resistance against compulsions: How much of an effort do you make to resist the compulsions?",
        options: [
          { value: 0, label: "Always resist" },
          { value: 1, label: "Try to resist most of the time" },
          { value: 2, label: "Make some effort to resist" },
          { value: 3, label: "Yield to almost all compulsions without attempting to control them" },
          { value: 4, label: "Completely and willingly yield to all compulsions" },
        ],
      },
      {
        id: 10,
        text: "Control over compulsive behavior: How strong is the drive to perform the compulsive behavior?",
        options: [
          { value: 0, label: "Complete control" },
          { value: 1, label: "Much control, pressure to perform but usually able to exercise control" },
          { value: 2, label: "Moderate control, strong pressure but can control with difficulty" },
          { value: 3, label: "Little control, very strong drive, must perform" },
          { value: 4, label: "No control, drive experienced as completely involuntary" },
        ],
      },
    ],
  },

  // Suicide Behaviors Questionnaire-Revised (SBQ-R)
  sbqr: {
    name: "Suicide Behaviors Questionnaire-Revised (SBQ-R)",
    description: "Assess suicide risk and suicidal behaviors",
    duration: "2-3 minutes",
    questions: [
      {
        id: 1,
        text: "Have you ever thought about or attempted to kill yourself?",
        options: [
          { value: 1, label: "Never" },
          { value: 2, label: "It was just a brief passing thought" },
          { value: 3, label: "I have had a plan at least once to kill myself but did not try to do it" },
          { value: 3, label: "I have had a plan at least once to kill myself and really wanted to die" },
          { value: 4, label: "I have attempted to kill myself, but did not want to die" },
          { value: 4, label: "I have attempted to kill myself, and really hoped to die" },
        ],
      },
      {
        id: 2,
        text: "How often have you thought about killing yourself in the past year?",
        options: [
          { value: 1, label: "Never" },
          { value: 2, label: "Rarely (1 time)" },
          { value: 3, label: "Sometimes (2 times)" },
          { value: 4, label: "Often (3-4 times)" },
          { value: 5, label: "Very Often (5 or more times)" },
        ],
      },
      {
        id: 3,
        text: "Have you ever told someone that you were going to commit suicide, or that you might do it?",
        options: [
          { value: 1, label: "No" },
          { value: 2, label: "Yes, at one time, but did not really want to die" },
          { value: 2, label: "Yes, at one time, and really wanted to die" },
          { value: 3, label: "Yes, more than once, but did not want to do it" },
          { value: 3, label: "Yes, more than once, and really wanted to do it" },
        ],
      },
      {
        id: 4,
        text: "How likely is it that you will attempt suicide someday?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "No chance at all" },
          { value: 2, label: "Rather unlikely" },
          { value: 3, label: "Unlikely" },
          { value: 4, label: "Likely" },
          { value: 5, label: "Rather likely" },
          { value: 6, label: "Very likely" },
        ],
      },
    ],
  },

  // Sleep Quality Scale (SQS) - Simplified version
  sleepQuality: {
    name: "Sleep Quality Scale (SQS)",
    description: "Evaluate sleep quality and sleep-related problems",
    duration: "5-10 minutes",
    questions: [
      {
        id: 1,
        text: "I have difficulty falling asleep",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 2,
        text: "I wake up during the night",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 3,
        text: "I wake up too early in the morning",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 4,
        text: "I feel tired when I wake up",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 5,
        text: "I feel refreshed after sleep",
        options: [
          { value: 3, label: "Few" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Often" },
          { value: 0, label: "Almost always" },
        ],
        reversed: true,
      },
      {
        id: 6,
        text: "I have difficulty concentrating during the day due to poor sleep",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 7,
        text: "I feel sleepy during the day",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 8,
        text: "I am satisfied with my sleep",
        options: [
          { value: 3, label: "Few" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Often" },
          { value: 0, label: "Almost always" },
        ],
        reversed: true,
      },
      {
        id: 9,
        text: "My sleep is restless",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
      {
        id: 10,
        text: "I have nightmares",
        options: [
          { value: 0, label: "Few" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" },
        ],
      },
    ],
  },

  // Phobia Questionnaire (PHQ)
  phq: {
    name: "Phobia Questionnaire (PHQ)",
    description: "Assess avoidance behaviors related to various phobias",
    duration: "5-7 minutes",
    questions: [
      {
        id: 1,
        text: "Injections or minor surgery",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 2,
        text: "Eating or drinking with other people",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 3,
        text: "Hospitals",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 4,
        text: "Traveling alone on public transportation (e.g. bus or train)",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 5,
        text: "Walking alone in busy streets",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 6,
        text: "Being watched or stared at",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 7,
        text: "Going into crowded shops",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 8,
        text: "Talking to people in authority",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 9,
        text: "Sight of blood",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 10,
        text: "Being criticized",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 11,
        text: "Going alone far from home",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 12,
        text: "Thought of injury or illness",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 13,
        text: "Speaking or acting to an audience",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 14,
        text: "Large open spaces",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
      {
        id: 15,
        text: "Going to the dentist",
        options: [
          { value: 0, label: "Would not avoid it" },
          { value: 1, label: "Slightly avoid it" },
          { value: 2, label: "Definitely avoid it" },
          { value: 3, label: "Markedly avoid it" },
          { value: 4, label: "Always avoid it" },
        ],
      },
    ],
  },

  // Full Ryff Scales of Psychological Well-Being (54 items)
  ryffFull: {
    name: "Ryff Scales of Psychological Well-Being (Full Version)",
    description: "Comprehensive assessment of psychological well-being across six dimensions",
    duration: "15-20 minutes",
    questions: [
      // Autonomy items
      { id: 1, text: "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 2, text: "My decisions are not usually influenced by what everyone else is doing.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 3, text: "I tend to worry about what other people think of me.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 4, text: "Being happy with myself is more important to me than having others approve of me.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 5, text: "I tend to be influenced by people with strong opinions.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 6, text: "I have confidence in my opinions, even if they are contrary to the general consensus.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 7, text: "It's difficult for me to voice my own opinions on controversial matters.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 8, text: "I often change my mind about decisions if my friends or family disagree.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 9, text: "I judge myself by what I think is important, not by the values of what others think is important.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      
      // Environmental Mastery items
      { id: 10, text: "In general, I feel I am in charge of the situation in which I live.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 11, text: "The demands of everyday life often get me down.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 12, text: "I do not fit very well with the people in the community around me.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 13, text: "I am quite good at managing the many responsibilities of my daily life.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 14, text: "I often feel overwhelmed by my responsibilities.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 15, text: "I generally do a good job of taking care of my personal finances and affairs.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 16, text: "I am good at juggling my time so that I can fit everything in that needs to be done.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 17, text: "I have difficulty arranging my life in a way that is satisfying to me.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 18, text: "I have been able to build a home and a lifestyle for myself that is much to my liking.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      
      // Personal Growth items
      { id: 19, text: "I am not interested in activities that will expand my horizons.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 20, text: "I don't want to try new ways of doing things—my life is fine the way it is.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 21, text: "I think it is important to have new experiences that challenge how you think about yourself and the world.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 22, text: "When I think about it, I haven't really improved much as a person over the years.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 23, text: "I have a sense that I have developed a lot as a person over time.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 24, text: "I do not enjoy being in new situations that require me to change my old familiar ways of doing things.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 25, text: "For me, life has been a continuous process of learning, changing, and growth.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 26, text: "I gave up trying to make big improvements or changes in my life a long time ago.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 27, text: "There is truth to the saying that you can't teach an old dog new tricks.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      
      // Positive Relations with Others items
      { id: 28, text: "Most people see me as loving and affectionate.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 29, text: "Maintaining close relationships has been difficult and frustrating for me.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 30, text: "I often feel lonely because I have few close friends with whom to share my concerns.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 31, text: "I enjoy personal and mutual conversations with family members or friends.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 32, text: "I don't have many people who want to listen when I need to talk.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 33, text: "It seems to me that most other people have more friends than I do.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 34, text: "People would describe me as a giving person, willing to share my time with others.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 35, text: "I have not experienced many warm and trusting relationships with others.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 36, text: "I know that I can trust my friends, and they know that they can trust me.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      
      // Purpose in Life items
      { id: 37, text: "I live one day at a time and don't really think about the future.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 38, text: "I tend to focus on the present, because the future always brings me problems.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 39, text: "My daily activities often seem trivial and unimportant to me.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 40, text: "I don't have a good sense of what it is that I am trying to accomplish in my life.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 41, text: "I used to set goals for myself, but that now seems a waste of time.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 42, text: "I enjoy making plans for the future and working to make them a reality.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 43, text: "I am an active person in carrying out the plans I set for myself.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 44, text: "Some people wander aimlessly through life, but I am not one of them.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 45, text: "I sometimes feel as if I've done all there is to do in life.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      
      // Self-Acceptance items
      { id: 46, text: "When I look at the story of my life, I am pleased with how things have turned out.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 47, text: "In general, I feel confident and positive about myself.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 48, text: "I feel like many of the people I know have gotten more out of life than I have.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 49, text: "I like most aspects of my personality.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 50, text: "I made some mistakes in the past, but I feel that all in all everything has worked out for the best.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 51, text: "In many ways, I feel disappointed about my achievements in my life.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 52, text: "My attitude about myself is probably not as positive as most people feel about themselves.", options: [{ value: 6, label: "Strongly disagree" }, { value: 5, label: "Disagree" }, { value: 4, label: "Disagree slightly" }, { value: 3, label: "Agree slightly" }, { value: 2, label: "Agree" }, { value: 1, label: "Strongly agree" }], reversed: true },
      { id: 53, text: "The past had its ups and downs, but in general, I wouldn't want to change it.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
      { id: 54, text: "When I compare myself to friends and acquaintances, it makes me feel good about who I am.", options: [{ value: 1, label: "Strongly disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Disagree slightly" }, { value: 4, label: "Agree slightly" }, { value: 5, label: "Agree" }, { value: 6, label: "Strongly agree" }] },
    ],
  },
};

export default assessmentQuestions;
