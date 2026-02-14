// ─── FORGE Health System Data ───
// Extracted from the FORGE health optimization system

export interface WeekDay {
  day: string;
  dayFull: string;
  focus: string;
  duration: string;
  intensity: 'low' | 'med' | 'high' | 'game';
}

export interface Workout {
  title: string;
  mission: string;
  benefit: string;
  exercises: string[];
  note: string;
}

export interface ExerciseInfo {
  tip: string;
  form: string;
}

export interface Meal {
  time: string;
  name: string;
  items: string;
  supps: string;
}

export interface SuppBlock {
  title: string;
  items: string[];
}

export interface Tip {
  cat: string;
  text: string;
}

export interface ForgeLog {
  date: string;
  weight: number;
  bf: number;
  note?: string;
}

export interface ForgeProfile {
  name: string;
  startWeight: number;
  startBF: number;
  goalBF: number;
}

export interface ForgeData {
  profile: ForgeProfile;
  logs: ForgeLog[];
}

// ─── Motivational Quotes ───

export const quotes: string[] = [
  'The body achieves what the mind believes.',
  'Discipline is choosing between what you want now and what you want most.',
  "You don't have to be extreme, just consistent.",
  'The pain you feel today will be the strength you feel tomorrow.',
  'Success is the sum of small efforts repeated day in and day out.',
  'Your only limit is you.',
  'Fall in love with the process and the results will come.',
  "Hard work beats talent when talent doesn't work hard.",
  "The best project you'll ever work on is you.",
  'One day or day one. You decide.',
  'What you do every day matters more than what you do once in a while.',
  'Strength does not come from the body. It comes from the will.',
  'Be stronger than your excuses.',
  'It never gets easier. You just get stronger.',
];

// ─── Weekly Plan ───

export const weekPlan: WeekDay[] = [
  { day: 'Sun', dayFull: 'Sunday', focus: 'Active Recovery', duration: '15-20 min', intensity: 'low' },
  { day: 'Mon', dayFull: 'Monday', focus: 'Upper Push/Pull', duration: '30 min', intensity: 'med' },
  { day: 'Tue', dayFull: 'Tuesday', focus: 'Lower + Core', duration: '30 min', intensity: 'med' },
  { day: 'Wed', dayFull: 'Wednesday', focus: 'HIIT + Mobility', duration: '25 min', intensity: 'high' },
  { day: 'Thu', dayFull: 'Thursday', focus: 'Pre-Game', duration: '15 min + game', intensity: 'game' },
  { day: 'Fri', dayFull: 'Friday', focus: 'Recovery', duration: '25 min', intensity: 'low' },
  { day: 'Sat', dayFull: 'Saturday', focus: 'Full Body', duration: '40 min', intensity: 'high' },
];

// ─── Workouts ───

export const workouts: Record<number, Workout> = {
  0: {
    title: 'Sunday \u2014 Active Recovery',
    mission: 'Let your body rebuild so Monday hits harder.',
    benefit: 'Active recovery flushes metabolic waste, reduces soreness, and restores your nervous system \u2014 you come back Monday stronger than if you trained through.',
    exercises: ['Light walk: 20 min outdoors if possible', 'Or full rest \u2014 listen to your body'],
    note: '',
  },
  1: {
    title: 'Monday \u2014 Upper Push/Pull',
    mission: 'Build the upper body strength that wins 50/50 battles.',
    benefit: 'Push/pull balance builds shoulders, back, and chest evenly \u2014 giving you the physical presence to shield the ball, hold off defenders, and win aerial duels.',
    exercises: [
      'Pull-ups: 4 \u00d7 max reps (aim 8-12)',
      'DB Bench Press: 4 \u00d7 10',
      'DB Rows: 4 \u00d7 10 each arm',
      'DB Shoulder Press: 3 \u00d7 10',
      'Push-ups: 2 \u00d7 max',
      'DB Bicep Curls: 2 \u00d7 12',
    ],
    note: 'Focus on controlled reps. Increase weight every 2 weeks.',
  },
  2: {
    title: 'Tuesday \u2014 Lower Body + Core',
    mission: 'Build explosive legs and an unbreakable core.',
    benefit: 'Stronger legs mean faster sprints, sharper cuts, and harder shots. A solid core transfers all that power and keeps you injury-proof.',
    exercises: [
      'DB Goblet Squats: 4 \u00d7 12',
      'DB Romanian Deadlifts: 4 \u00d7 10',
      'DB Bulgarian Split Squats: 3 \u00d7 10 each leg',
      'DB Calf Raises: 3 \u00d7 15',
      'Plank: 3 \u00d7 45 sec',
      'Dead Bugs: 3 \u00d7 10 each side',
    ],
    note: 'Keep core braced throughout. Go deep on split squats.',
  },
  3: {
    title: 'Wednesday \u2014 Airbike HIIT + Mobility',
    mission: 'Train your engine to outlast everyone on the pitch.',
    benefit: 'High-intensity intervals build the same energy system soccer demands \u2014 repeated sprints with short recovery. Mobility work keeps your hips and spine moving freely so you stay agile.',
    exercises: [
      'Airbike: 10 rounds \u2014 20 sec all-out / 40 sec easy',
      'Hip flexor stretch: 2 \u00d7 30 sec each',
      "World's greatest stretch: 5 each side",
      'Pigeon pose: 1 min each side',
      'Thoracic spine rotations: 10 each side',
    ],
    note: 'This session mimics soccer game intensity. Push hard on the bike.',
  },
  4: {
    title: 'Thursday \u2014 Pre-Game Activation',
    mission: 'Prime your body and mind to enter flow state.',
    benefit: 'Light activation wakes up your muscles without fatiguing them. Box breathing and visualization shift your brain into calm focus \u2014 the entry point for flow, where your best soccer happens.',
    exercises: [
      'Light airbike: 3 min easy',
      'Leg swings: 10 each direction',
      'Bodyweight squats: 10',
      'High knees: 20',
      'Box breathing: 2 min (4-4-4-4)',
      'Visualization: 1 min \u2014 see yourself in flow',
    ],
    note: 'Do this 15 min before leaving. Take FLOW + L-theanine. Eat banana + honey.',
  },
  5: {
    title: 'Friday \u2014 Recovery',
    mission: "Accelerate recovery from game day and loosen up.",
    benefit: "Low-intensity movement increases blood flow to repair muscle damage from Thursday's game. Stretching restores range of motion so tightness doesn't accumulate into injury.",
    exercises: [
      'Airbike: 15 min easy/conversational pace',
      'Full body stretch: 10 min (hamstrings, quads, hips, shoulders, back)',
      'Foam roll if available',
    ],
    note: 'Nasal breathing only during the airbike. Stay relaxed.',
  },
  6: {
    title: 'Saturday \u2014 Full Body Circuit',
    mission: "Push your limits \u2014 this is your hardest session of the week.",
    benefit: 'Full-body circuits build functional strength and conditioning simultaneously. Minimal rest trains your body to perform under fatigue \u2014 exactly what the 80th minute of a game demands.',
    exercises: [
      '4 rounds (90 sec rest between rounds):',
      '  Pull-ups: 8 reps',
      '  DB Thrusters: 10 reps',
      '  DB Walking Lunges: 10 each leg',
      '  Push-ups: 15 reps',
      '  DB Renegade Rows: 8 each arm',
      '  Airbike: 1 min hard',
      'Core finisher \u2014 3 \u00d7 (10 V-ups + 20 bicycle crunches)',
    ],
    note: 'Minimal rest between exercises within each round. This is your hardest session.',
  },
};

// ─── Exercise Info Database ───

export const exerciseInfo: Record<string, ExerciseInfo> = {
  'Light walk': {
    tip: 'Keep a relaxed pace \u2014 this is about movement, not intensity. Walking outdoors gives you sunlight exposure which helps regulate circadian rhythm and boosts vitamin D.',
    form: 'Stand tall, swing arms naturally, breathe through your nose. Aim for a pace where you could easily hold a conversation.',
  },
  'full rest': {
    tip: 'Rest days are when your muscles actually grow and repair. Sleep quality matters most today \u2014 prioritize 8 hours and stay hydrated.',
    form: 'If you feel restless, light stretching or a 5-minute walk is fine. Avoid anything that elevates your heart rate significantly.',
  },
  'Pull-ups': {
    tip: "The king of upper body exercises. Builds lats, biceps, rear delts, and grip strength. If you can't hit 8 reps, use a resistance band for assistance.",
    form: 'Start from a dead hang, squeeze shoulder blades together, pull until chin clears the bar. Lower slowly (2-3 sec). Avoid kipping or swinging.',
  },
  'DB Bench Press': {
    tip: 'Dumbbells allow a greater range of motion than barbell bench and work each side independently, fixing strength imbalances.',
    form: 'Plant feet flat, arch your upper back slightly, lower dumbbells to chest level with elbows at ~45 degrees. Press up in a slight arc, not straight up.',
  },
  'DB Rows': {
    tip: "Single-arm rows build a thick back and correct left-right imbalances. This is your primary horizontal pull \u2014 don't rush it.",
    form: 'Place one knee and hand on a bench. Keep your back flat and core braced. Pull the dumbbell to your hip, squeezing your shoulder blade. Lower with control.',
  },
  'DB Shoulder Press': {
    tip: 'Builds strong, capped shoulders that protect the joint during contact. Seated is more strict; standing engages more core stabilization.',
    form: "Start with dumbbells at ear height, palms facing forward. Press straight up until arms are extended. Don't arch your lower back \u2014 brace your core.",
  },
  'Push-ups': {
    tip: 'A timeless bodyweight move that hits chest, triceps, and anterior delts. Going to max reps at the end ensures full fatigue for growth.',
    form: 'Hands slightly wider than shoulders, body in a straight line from head to heels. Lower until chest nearly touches the floor. Keep elbows at 45 degrees, not flared.',
  },
  'DB Bicep Curls': {
    tip: 'Isolation finisher for the biceps. Use a weight where the last 2-3 reps are genuinely hard. Alternating arms lets you focus on each side.',
    form: 'Stand tall, elbows pinned to your sides. Curl with a slight supination (rotate pinky up at top). Lower slowly \u2014 the eccentric is where growth happens.',
  },
  'DB Goblet Squats': {
    tip: 'The goblet position forces an upright torso, making this one of the safest and most effective squat variations. Great for building quads, glutes, and core.',
    form: 'Hold a dumbbell vertically at chest height, elbows pointing down. Sit between your legs, keeping chest tall. Go as deep as mobility allows. Drive through your heels.',
  },
  'DB Romanian Deadlifts': {
    tip: 'Targets the posterior chain \u2014 hamstrings, glutes, and lower back. Essential for sprint speed and injury prevention. You should feel a deep hamstring stretch.',
    form: 'Hold dumbbells in front of thighs. Hinge at the hips, pushing them back. Keep a slight knee bend and flat back. Lower until you feel a strong hamstring stretch, then squeeze glutes to stand.',
  },
  'DB Bulgarian Split Squats': {
    tip: 'One of the best single-leg exercises for building explosive leg power. Mimics the single-leg drive of sprinting and cutting in soccer.',
    form: 'Rear foot on a bench, front foot about 2 feet ahead. Lower until your back knee nearly touches the ground. Keep front knee tracking over toes. Drive up through the front heel.',
  },
  'DB Calf Raises': {
    tip: 'Strong calves are your shock absorbers for running, jumping, and quick direction changes. High reps (15+) work best since calves are endurance muscles.',
    form: 'Hold dumbbells at your sides, balls of feet on a step or plate. Rise as high as you can, pause for 1 second at the top, then lower slowly past parallel for a full stretch.',
  },
  Plank: {
    tip: "Trains anti-extension \u2014 your core's ability to resist your spine collapsing. Foundational for every athletic movement and protects your lower back.",
    form: "Forearms on the ground, body in a straight line. Squeeze glutes, brace abs as if someone's about to punch your stomach. Don't let your hips sag or pike up.",
  },
  'Dead Bugs': {
    tip: 'Teaches your core to stabilize while your limbs move independently \u2014 exactly what happens when you sprint or kick. Low back must stay glued to the floor.',
    form: 'Lie face-up, arms straight up, knees bent at 90 degrees. Extend opposite arm and leg slowly while pressing your lower back into the floor. Return and switch sides.',
  },
  Airbike: {
    tip: 'The airbike is unmatched for conditioning \u2014 it works arms and legs simultaneously with no impact. The harder you push, the harder it resists. Perfect for HIIT.',
    form: 'Sit upright, grip the handles, and push/pull with arms while driving with legs. For all-out intervals, stand slightly off the seat and give maximum effort.',
  },
  'Hip flexor stretch': {
    tip: 'Tight hip flexors are the #1 cause of lower back pain in athletes. This stretch counteracts hours of sitting and keeps your stride length long and powerful.',
    form: "Half-kneeling position, back knee on the ground. Tuck your pelvis under (posterior tilt) and shift forward. You should feel the stretch in the front of the back leg's hip.",
  },
  "World's greatest stretch": {
    tip: 'Lives up to its name \u2014 hits hip flexors, hamstrings, thoracic spine, and groin in one flowing movement. The best bang-for-your-buck mobility drill.',
    form: 'Lunge forward, place both hands inside the front foot. Rotate your chest toward the front knee, reaching one arm to the sky. Hold briefly, switch sides. Move fluidly.',
  },
  'Pigeon pose': {
    tip: 'Deep hip opener targeting the external rotators and glutes. Critical for soccer players who need full hip mobility for passing, shooting, and agility.',
    form: 'From a lunge, bring front shin across your body (angle depends on flexibility). Square your hips to the ground. Walk hands forward and hold. Breathe into the stretch.',
  },
  'Thoracic spine rotations': {
    tip: 'Opens up the mid-back which gets stiff from training and sitting. Better thoracic mobility means better posture, breathing, and overhead movement.',
    form: 'On all fours or side-lying, place one hand behind your head. Rotate your upper body, opening your chest to the ceiling. Follow your elbow with your eyes. Move slowly.',
  },
  'Light airbike': {
    tip: 'Easy spinning warms up the body without creating fatigue. The goal is to raise your core temperature and get blood flowing to your muscles before activation.',
    form: 'Keep the pace conversational \u2014 you should be able to talk easily. Use smooth, rhythmic pedaling. Focus on nasal breathing to keep your nervous system calm.',
  },
  'Leg swings': {
    tip: 'Dynamic stretching that warms up the hip joint through its full range. Prepares your legs for the multi-directional demands of soccer.',
    form: 'Hold onto something for balance. Swing one leg forward and back like a pendulum (10 reps), then side to side (10 reps). Keep your core stable and let the leg move freely.',
  },
  'Bodyweight squats': {
    tip: 'Activates the quads, glutes, and ankles before heavier movements or game play. A simple way to confirm your joints feel good and ready to load.',
    form: 'Feet shoulder-width, toes slightly out. Sit back and down, keeping chest tall. Go to at least parallel. Stand by driving through your heels. No added weight needed.',
  },
  'High knees': {
    tip: 'Elevates your heart rate and primes the hip flexors for sprinting. Also wakes up the nervous system for fast, reactive movements on the pitch.',
    form: 'Drive knees up to hip height with quick, light ground contacts. Pump your arms in sync. Stay on the balls of your feet. Focus on speed, not distance covered.',
  },
  'Box breathing': {
    tip: 'Navy SEALs use this to control stress and enter a focused state. Four equal counts of inhale-hold-exhale-hold activates your parasympathetic nervous system.',
    form: 'Inhale through nose for 4 seconds, hold for 4, exhale through nose for 4, hold empty for 4. Repeat for 2 minutes. Sit or stand comfortably with eyes closed.',
  },
  Visualization: {
    tip: 'Mental rehearsal activates the same motor cortex pathways as physical practice. Elite athletes use this to prime confidence and decision-making before competition.',
    form: 'Close your eyes. Picture yourself on the pitch \u2014 receiving the ball, turning, making passes, scoring. Make it vivid: sounds, movements, emotions. See success, feel flow.',
  },
  'Full body stretch': {
    tip: 'Post-game stretching restores muscle length and promotes blood flow for recovery. Focus on areas that feel tight \u2014 typically hamstrings, quads, hip flexors, and calves.',
    form: "Hold each stretch 30-60 seconds, breathing deeply. Don't bounce. Target: hamstrings, quads, hip flexors, calves, chest, shoulders, and lower back. Go in order head to toe.",
  },
  'Foam roll': {
    tip: 'Self-myofascial release breaks up adhesions and increases blood flow to sore tissues. Especially useful for quads, IT band, calves, and upper back after game day.',
    form: 'Roll slowly over each muscle group, pausing on tender spots for 20-30 seconds. Apply moderate pressure \u2014 uncomfortable but not painful. Breathe and relax into it.',
  },
  'DB Thrusters': {
    tip: 'A full-body power exercise combining a front squat with an overhead press. Extremely metabolically demanding \u2014 builds total-body strength and cardio simultaneously.',
    form: 'Hold dumbbells at shoulders, squat to parallel, then drive up explosively and press dumbbells overhead in one fluid motion. Use the leg drive to help the press.',
  },
  'DB Walking Lunges': {
    tip: 'Builds single-leg strength, balance, and hip stability. Walking lunges mimic the gait pattern of running and improve deceleration ability on the field.',
    form: 'Hold dumbbells at sides, step forward into a lunge until both knees are at 90 degrees. Push off the front foot and step into the next lunge. Keep torso upright throughout.',
  },
  'DB Renegade Rows': {
    tip: 'Combines a plank with a row \u2014 anti-rotation core training plus back strength in one exercise. Builds the stability needed for contact situations in soccer.',
    form: "In push-up position on dumbbells, row one dumbbell to your hip while keeping hips square to the ground. Don't rotate or shift. Alternate sides. Widen your feet for more stability.",
  },
  'V-ups': {
    tip: 'Advanced core exercise that works the upper and lower abs simultaneously. The V-shape motion demands coordination between your upper and lower body.',
    form: 'Lie flat, arms overhead. Simultaneously lift legs and torso, reaching hands toward toes to form a V. Lower back down with control. Keep legs as straight as possible.',
  },
  'bicycle crunches': {
    tip: 'Targets the obliques and hip flexors through a cross-body rotation. One of the most effective exercises for building rotational core strength used in kicking and turning.',
    form: "Lie face-up, hands behind head. Bring opposite elbow to knee while extending the other leg. Alternate in a pedaling motion. Don't pull on your neck \u2014 rotate from your torso.",
  },
};

// ─── Meals ───

export const meals: Meal[] = [
  {
    time: '7:00 AM',
    name: 'Breakfast',
    items: '3 eggs + 1 extra white scrambled in olive oil. Smoothie: blueberries, spinach, banana, OJ, creatine, greens, collagen. Egg yolk coffee.',
    supps: 'APEX, FLOW (creatine + greens in smoothie)',
  },
  {
    time: '12:30 PM',
    name: 'Lunch (Post-Workout)',
    items: 'Veggie-loaded ground beef rice bowl (8oz beef, 1.5 cups rice in broth, bell pepper, onion, peas, carrots). Side steamed broccoli.',
    supps: 'Whey isolate shake or collagen',
  },
  {
    time: '3:30 PM',
    name: 'Snack',
    items: 'Apple or banana, small handful almonds or walnuts (~1oz)',
    supps: '',
  },
  {
    time: '4:30 PM',
    name: 'Dinner (Family)',
    items: 'Pick a protein (6-8oz) + carb + veggies. Combos: stir fry, taco bowls, sheet pan chicken, salmon + rice.',
    supps: 'Zinc 15-30mg',
  },
  {
    time: '9:30 PM',
    name: 'Evening Supps',
    items: '',
    supps: 'Mag glycinate 400mg, glycine 3g, L-theanine 200mg, MOON',
  },
];

// ─── Supplement Schedule ───

export function getSuppSchedule(isThursday: boolean): SuppBlock[] {
  return [
    { title: 'Pre-Breakfast', items: ['NAC: 600mg (empty stomach)'] },
    {
      title: 'Morning',
      items: ['APEX (test/energy)', 'FLOW (cognitive)', 'Creatine 5g', 'Green powder', 'Collagen protein'],
    },
    isThursday
      ? {
          title: 'Pre-Game',
          items: ['FLOW (extra dose)', 'L-theanine: 200mg', 'Electrolyte mix', 'Banana + honey'],
        }
      : {
          title: 'Pre-Workout',
          items: ['L-citrulline: 6-8g', 'Electrolyte mix', 'BioSteel (optional)'],
        },
    { title: 'Post-Workout', items: ['Whey isolate shake', '(or collagen if whey issues)'] },
    { title: 'With Dinner', items: ['Zinc: 15-30mg'] },
    {
      title: 'Evening',
      items: ['Mag glycinate: 400mg', 'Glycine: 3g', 'L-theanine: 200mg', 'MOON (sleep support)'],
    },
  ];
}

// ─── Tips ───

export const tips: Tip[] = [
  { cat: 'Sleep', text: 'Mouth taping forces nasal breathing during sleep, which reduces snoring and improves oxygen saturation. Start with a small strip of surgical tape.' },
  { cat: 'Flow State', text: "Box breathing (4-4-4-4) before soccer activates the parasympathetic nervous system \u2014 you'll feel calm but alert. Perfect for finding flow." },
  { cat: 'Recovery', text: "One bad meal in a week of 21 meals is less than 5%. Don't spiral. Just make the next meal the default: eggs + smoothie or beef rice bowl." },
  { cat: 'Nutrition', text: 'Batch prep the beef rice mix in one big pot \u2014 brown beef, cook rice in broth, add veggies. Portion into containers for the week.' },
  { cat: 'Anti-Inflammation', text: 'Your sensitivity foods (gluten, dairy, corn, oats) cause chronic low-grade inflammation. Avoiding them is your biggest lever for recovery and performance.' },
  { cat: 'Training', text: 'Progressive overload doesn\'t mean huge jumps. Adding 1 rep or 2.5 lbs every 2 weeks compounds into massive gains over a year.' },
  { cat: 'Sleep', text: 'Magnesium glycinate + glycine + L-theanine is one of the most effective natural sleep stacks. Take 30-60 min before bed.' },
  { cat: 'Hydration', text: 'Drink at least half your bodyweight in ounces daily (~90 oz). Add electrolytes to your first glass of water each morning.' },
  { cat: 'Flow State', text: 'Visualization primes your motor cortex. Spend 1 minute before games seeing yourself receive, turn, and play \u2014 your brain rehearses the movements.' },
  { cat: 'Nutrition', text: 'Egg yolk coffee (Vietnamese-style): whip a yolk with sugar until frothy, pour over hot coffee. Rich, creamy, dairy-free, and adds healthy fats.' },
];

// ─── Sleep Protocol ───

export const sleepProtocol: string[] = [
  'Bed 10:30pm / Wake 6:30am',
  'Mag + glycine + L-theanine before bed',
  'MOON supplement',
  'Cool room: 65-68\u00b0F',
  'Mouth taping (nasal breathing)',
  'Sleep on side, not back',
  'No food 2-3 hrs before bed',
  'Buteyko breathing: 5 min daily',
];

// ─── Recovery Protocol ───

export const recoverySteps: string[] = [
  'Don\'t skip meals to "make up" for it',
  "Don't punish with extra cardio",
  'Next meal: eggs + smoothie (AM) or beef rice bowl (PM)',
  'Hydrate extra: 2-3 extra glasses of water',
  'Alcohol-heavy? Extra electrolytes next morning',
  'Inflammatory meal? Green powder + extra veggies next day',
];

// ─── Default Profile ───

export const defaultForgeData: ForgeData = {
  profile: {
    name: 'Alex',
    startWeight: 180,
    startBF: 16,
    goalBF: 12,
  },
  logs: [],
};

// ─── Exercise Info Lookup ───
// Two-pass matching: prefix match first, then contains match

export function getExerciseInfo(text: string): ExerciseInfo | null {
  const lower = text.toLowerCase();
  const keys = Object.keys(exerciseInfo);

  // First pass: prefix match
  for (const key of keys) {
    if (lower.indexOf(key.toLowerCase()) === 0) {
      return exerciseInfo[key];
    }
  }

  // Second pass: contains match
  for (const key of keys) {
    if (lower.indexOf(key.toLowerCase()) > -1) {
      return exerciseInfo[key];
    }
  }

  return null;
}

// ─── Intensity Colors ───

export const intensityColors: Record<string, string> = {
  low: 'var(--accent-green)',
  med: 'var(--accent-amber)',
  high: '#ef5350',
  game: 'var(--accent-purple)',
};
