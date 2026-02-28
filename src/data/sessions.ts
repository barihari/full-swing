export interface DrillBlock {
  name: string;
  durationMin: number;
  quickDurationMin: number;
  description: string;
  ballCount?: number;
  reps?: number;
  cues: string[];
  resetRules?: string;
  referenceIds: string[];
}

export interface SessionTemplate {
  type: string;
  name: string;
  defaultDurationMin: number;
  quickDurationMin: number;
  blocks: DrillBlock[];
}

export const SESSION_TEMPLATES: Record<string, SessionTemplate> = {
  A: {
    type: 'A',
    name: 'Foundation & Feel',
    defaultDurationMin: 45,
    quickDurationMin: 30,
    blocks: [
      {
        name: 'Dynamic Warm-Up',
        durationMin: 5,
        quickDurationMin: 3,
        description: 'Hip circles, torso rotations, arm swings, wrist rolls. Light stretching for right Achilles.',
        cues: ['Smooth and controlled', 'Feel ground connection through feet'],
        referenceIds: ['warmup-dynamic'],
      },
      {
        name: 'Brush-the-Grass Drill',
        durationMin: 8,
        quickDurationMin: 5,
        description: 'No ball. Swing driver with sole brushing turf. Focus on low point consistency.',
        reps: 20,
        cues: [
          'Step-to-left rehearsal (pressure into left heel) before each swing',
          'Brush the same spot each time',
          'Finish on left side — full balanced finish',
          'Smooth tempo: 3-count back, 1-count through',
        ],
        referenceIds: ['drill-brush'],
      },
      {
        name: 'Step-Through Drill',
        durationMin: 8,
        quickDurationMin: 5,
        description: 'Tee ball at normal height. After impact, step forward with trail foot past lead foot.',
        ballCount: 10,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Feel weight shift fully to lead side',
          'Step through after impact — trail foot finishes ahead',
          'Finish on left side',
        ],
        referenceIds: ['drill-stepthrough'],
      },
      {
        name: 'Tempo Ladder',
        durationMin: 10,
        quickDurationMin: 7,
        description: '50% → 70% → 85% effort. 5 balls at each level. Reset if two consecutive misses.',
        ballCount: 15,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          '50%: Effortless feel, pure contact',
          '70%: Controlled aggression',
          '85%: Game speed with balance',
          'Finish on left side — hold finish 3 seconds',
        ],
        resetRules: 'If 2 consecutive mishits, drop back one rung and hit 3 good ones before progressing.',
        referenceIds: ['drill-tempoladder'],
      },
      {
        name: 'Block Practice — Stock Shot',
        durationMin: 10,
        quickDurationMin: 7,
        description: 'Hit 15 drivers with one target. Focus on repeating your stock shape.',
        ballCount: 15,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Pick a specific target each shot',
          'Full pre-shot routine: aim, align, waggle, go',
          'Finish on left side',
        ],
        resetRules: 'After 3 consecutive misses of your target shape, pause. 3 half-speed swings, then resume.',
        referenceIds: ['drill-blockpractice'],
      },
      {
        name: 'Cool-Down Swings',
        durationMin: 4,
        quickDurationMin: 3,
        description: '5 easy 50% swings. Gentle stretch.',
        ballCount: 5,
        cues: ['Easy tempo', 'Feel the rhythm', 'Celebrate the work'],
        referenceIds: ['cooldown'],
      },
    ],
  },
  B: {
    type: 'B',
    name: 'Accuracy & Shape',
    defaultDurationMin: 45,
    quickDurationMin: 30,
    blocks: [
      {
        name: 'Dynamic Warm-Up',
        durationMin: 5,
        quickDurationMin: 3,
        description: 'Hip circles, torso rotations, arm swings. Focus on opening up rotation.',
        cues: ['Smooth and controlled', 'Feel ground connection'],
        referenceIds: ['warmup-dynamic'],
      },
      {
        name: 'Alignment Gate Drill',
        durationMin: 10,
        quickDurationMin: 7,
        description: 'Place two tees 6 inches apart as a gate 10 yards out. Start ball through the gate.',
        ballCount: 15,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Clubface aims at the gate',
          'Body alignment parallel left',
          'Finish on left side',
        ],
        referenceIds: ['drill-alignmentgate'],
      },
      {
        name: 'Shot Shape Practice',
        durationMin: 12,
        quickDurationMin: 8,
        description: 'Alternate: 5 draws, 5 fades, 5 stock. Feel the difference in path and face.',
        ballCount: 15,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Draw: Feel club coming from inside, face slightly closed to path',
          'Fade: Feel slightly outside path, face slightly open to path',
          'Finish on left side',
        ],
        referenceIds: ['drill-shotshape'],
      },
      {
        name: 'Fairway Corridor Challenge',
        durationMin: 10,
        quickDurationMin: 7,
        description: 'Pick a 30-yard wide corridor. Hit 15 balls. Track how many land in-corridor.',
        ballCount: 15,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Commit to a target on every swing',
          'Full pre-shot routine',
          'Finish on left side',
        ],
        referenceIds: ['drill-corridor'],
      },
      {
        name: 'Cool-Down',
        durationMin: 4,
        quickDurationMin: 3,
        description: '5 easy swings. Stretch hamstrings and shoulders.',
        ballCount: 5,
        cues: ['Easy tempo', 'Enjoy the motion'],
        referenceIds: ['cooldown'],
      },
    ],
  },
  C: {
    type: 'C',
    name: 'Pressure & Scoring',
    defaultDurationMin: 45,
    quickDurationMin: 30,
    blocks: [
      {
        name: 'Dynamic Warm-Up',
        durationMin: 5,
        quickDurationMin: 3,
        description: 'Hip circles, torso rotations. Add 5 practice swings at increasing speed.',
        cues: ['Build gradually', 'Feel the ground'],
        referenceIds: ['warmup-dynamic'],
      },
      {
        name: 'Simulated Holes',
        durationMin: 15,
        quickDurationMin: 10,
        description: 'Play 7 imaginary holes. Each shot has a specific target and shape. Track fairways hit (out of 7 "holes").',
        ballCount: 7,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Full pre-shot routine for EVERY shot',
          'Visualize the hole layout before each swing',
          'Commit 100% — no steering',
          'Finish on left side',
        ],
        referenceIds: ['drill-simholes'],
      },
      {
        name: 'Pressure Series',
        durationMin: 10,
        quickDurationMin: 7,
        description: '7 balls. Must hit 5 of 7 in a fairway-width target to "pass." If fail, repeat.',
        ballCount: 7,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Treat each ball like it matters',
          'Deep breath before each shot',
          'Trust your routine',
          'Finish on left side',
        ],
        resetRules: 'If you fail the 5/7 challenge, take 3 deep breaths, hit 3 easy tempo swings, then repeat.',
        referenceIds: ['drill-pressure'],
      },
      {
        name: 'Confidence Finisher',
        durationMin: 8,
        quickDurationMin: 5,
        description: 'Hit 5 balls with your most comfortable shot shape. End on a positive note.',
        ballCount: 5,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Your best shape, your best target',
          'Smile after good ones',
          'Finish on left side',
        ],
        referenceIds: ['drill-confidence'],
      },
      {
        name: 'Cool-Down',
        durationMin: 4,
        quickDurationMin: 3,
        description: 'Light stretching. Reflect on what went well.',
        cues: ['Acknowledge progress', 'Note one positive takeaway'],
        referenceIds: ['cooldown'],
      },
    ],
  },
  D: {
    type: 'D',
    name: 'Course Simulation',
    defaultDurationMin: 45,
    quickDurationMin: 30,
    blocks: [
      {
        name: 'Dynamic Warm-Up',
        durationMin: 5,
        quickDurationMin: 3,
        description: 'Full warm-up routine. Include practice swings that mimic your course pre-shot.',
        cues: ['Get into game mode', 'Visualize first tee'],
        referenceIds: ['warmup-dynamic'],
      },
      {
        name: 'Front 9 Simulation',
        durationMin: 12,
        quickDurationMin: 8,
        description: 'Play holes 1-9 of your tournament course. Pick targets for each hole. Track fairways hit (out of 7, skipping par 3s).',
        ballCount: 7,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Full pre-shot routine — just like on course',
          'Walk behind ball, pick target, commit',
          'Finish on left side — hold for 3 seconds',
        ],
        referenceIds: ['drill-simholes'],
      },
      {
        name: 'Back 9 Simulation',
        durationMin: 12,
        quickDurationMin: 8,
        description: 'Play holes 10-18. Adjust targets for wind/slope. Track fairways (out of 7).',
        ballCount: 7,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Factor in conditions — play smart shapes',
          'Commit fully, no half-hearted swings',
          'Finish on left side',
        ],
        referenceIds: ['drill-simholes'],
      },
      {
        name: 'Clutch Shots',
        durationMin: 8,
        quickDurationMin: 5,
        description: '5 balls. Imagine you need fairway to win. Full routine, full commitment.',
        ballCount: 5,
        cues: [
          'Step-to-left rehearsal (pressure into left heel)',
          'Deep breath — lower heart rate',
          'Trust the process',
          'Commit and execute',
          'Finish on left side',
        ],
        referenceIds: ['drill-pressure'],
      },
      {
        name: 'Cool-Down & Review',
        durationMin: 5,
        quickDurationMin: 3,
        description: 'Easy swings. Review your sim scorecard mentally. Note patterns.',
        ballCount: 3,
        cues: ['What worked today?', 'What\'s the one thing to focus on next?'],
        referenceIds: ['cooldown'],
      },
    ],
  },
};

export const SESSION_TYPE_COLORS: Record<string, string> = {
  A: '#60a5fa',
  B: '#a78bfa',
  C: '#fbbf24',
  D: '#f87171',
};

export const SESSION_TYPE_BG: Record<string, string> = {
  A: 'bg-blue-600 text-white',
  B: 'bg-purple-600 text-white',
  C: 'bg-amber-500 text-gray-900',
  D: 'bg-red-600 text-white',
};

export const MISS_TYPES = [
  'Slice',
  'Hook',
  'Push',
  'Pull',
  'Top',
  'Fat',
  'Sky',
  'Low',
  'None/Varied',
] as const;

export type MissType = typeof MISS_TYPES[number];
