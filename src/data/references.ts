export interface Reference {
  id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
  tips: string[];
}

export const REFERENCES: Reference[] = [
  {
    id: 'warmup-dynamic',
    title: 'Dynamic Warm-Up Routine',
    description: 'A 5-minute warm-up to prepare your body for the range session.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KBRojeYuILQ',
    tips: [
      'Start with hip circles — 10 each direction',
      'Torso rotations with a club across your shoulders — 10 each way',
      'Arm swings across your body — 10 reps',
      'Wrist rolls and forearm stretches',
      'Light Achilles / calf stretch (right side focus)',
    ],
  },
  {
    id: 'drill-brush',
    title: 'Brush-the-Grass Drill',
    description: 'No ball. Develop consistent low point and ground contact with the driver.',
    youtubeUrl: 'https://www.youtube.com/watch?v=_qbKDl5HF_w',
    tips: [
      'Hold driver at normal length',
      'Make smooth swings letting the sole brush the turf',
      'Listen for consistent contact sound',
      'The brush spot should be in front of where the ball would be',
      'This trains weight shift and low point control',
    ],
  },
  {
    id: 'drill-stepthrough',
    title: 'Step-Through Drill',
    description: 'Hit a teed ball then step forward with your trail foot. Builds weight transfer.',
    youtubeUrl: 'https://www.youtube.com/watch?v=yK4vjCU_FF4',
    tips: [
      'Tee ball at normal height',
      'Make your swing and after impact, let momentum carry you',
      'Trail foot steps past lead foot',
      'If you can\'t step through, weight stayed back',
      'Great for Achilles-friendly weight transfer pattern',
    ],
  },
  {
    id: 'drill-tempoladder',
    title: 'Tempo Ladder',
    description: 'Gradually increase effort from 50% to 85%. Builds speed with control.',
    youtubeUrl: 'https://www.youtube.com/watch?v=CJGY95UJmtE',
    tips: [
      'Start at 50% effort — should feel effortless',
      'Hit 5 balls, then move to 70%',
      '70% should feel like you\'re swinging with purpose but not hard',
      '85% is game speed — aggressive but balanced',
      'If you lose contact quality, drop back down',
    ],
  },
  {
    id: 'drill-blockpractice',
    title: 'Block Practice — Stock Shot',
    description: 'Repetitive practice of your stock driver shot for consistency.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZRaNcbpOR2Y',
    tips: [
      'Pick ONE target and stick with it',
      'Full pre-shot routine every time',
      'Focus on repeating your stock shape',
      'This is about building trust, not experimenting',
    ],
  },
  {
    id: 'drill-alignmentgate',
    title: 'Alignment Gate Drill',
    description: 'Use two tees as a gate to train starting direction.',
    youtubeUrl: 'https://www.youtube.com/watch?v=VsDKiLtLOXE',
    tips: [
      'Place two tees 6 inches apart, about 10 yards out',
      'Your goal: start the ball through the gate',
      'This separates start line from curve',
      'Adjust gate position for draw or fade start lines',
    ],
  },
  {
    id: 'drill-shotshape',
    title: 'Shot Shape Practice',
    description: 'Alternate between draws, fades, and stock shots.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Dw6u96PKda0',
    tips: [
      'Draw: Aim clubface at target, align body right of target',
      'Fade: Aim clubface at target, align body left of target',
      'Feel the path difference — don\'t manipulate the face',
      'The ability to shape shots builds course management confidence',
    ],
  },
  {
    id: 'drill-corridor',
    title: 'Fairway Corridor Challenge',
    description: 'Define a 30-yard wide fairway corridor and track accuracy.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rURWSuB5Y-Q',
    tips: [
      'Pick two landmarks about 30 yards apart',
      'Every ball that lands between them counts as "in play"',
      'This simulates real fairway width',
      'Track your percentage — aim for 10/15 (67%)',
    ],
  },
  {
    id: 'drill-simholes',
    title: 'Simulated Holes',
    description: 'Play imaginary holes with specific targets and shapes for each.',
    youtubeUrl: 'https://www.youtube.com/watch?v=s_OD1WIpQr8',
    tips: [
      'Visualize a real hole you know before each shot',
      'Change your target and shape for each "hole"',
      'Use full pre-shot routine — treat it like the course',
      'This bridges the gap between range and course',
    ],
  },
  {
    id: 'drill-pressure',
    title: 'Pressure Series',
    description: 'Must hit 5 of 7 balls in a target zone to "pass." Builds clutch performance.',
    youtubeUrl: 'https://www.youtube.com/watch?v=TpdvzMxlmgU',
    tips: [
      'Set a clear pass/fail threshold before starting',
      'This creates real pressure — embrace the nerves',
      'Use your breathing routine between shots',
      'If you fail, that\'s data — not defeat',
    ],
  },
  {
    id: 'drill-confidence',
    title: 'Confidence Finisher',
    description: 'End every session hitting your best shot shape. Leave on a high note.',
    youtubeUrl: 'https://www.youtube.com/watch?v=h7RlveHAuC0',
    tips: [
      'Pick your most reliable shot shape',
      'Hit 5 balls with full commitment',
      'Savor the good ones — that\'s your swing',
      'Always end practice feeling positive',
    ],
  },
  {
    id: 'cooldown',
    title: 'Cool-Down & Stretch',
    description: 'Easy swings and gentle stretching to end the session.',
    youtubeUrl: 'https://www.youtube.com/watch?v=xeR7y1pEEyI',
    tips: [
      '5 easy half-speed swings',
      'Hamstring stretch — hold 30 seconds each side',
      'Shoulder / chest stretch with a club',
      'Right calf / Achilles gentle stretch',
      'Take a moment to appreciate the work you put in',
    ],
  },
];
