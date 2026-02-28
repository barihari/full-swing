let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Single bell ding that rings and fades over ~3 seconds. */
export function playBellSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Layered harmonics to sound like a metallic bell strike
  const harmonics = [
    { freq: 880, gain: 0.35 },   // fundamental (A5)
    { freq: 1760, gain: 0.15 },  // 2nd harmonic
    { freq: 2640, gain: 0.08 },  // 3rd harmonic
    { freq: 4400, gain: 0.04 },  // 5th harmonic — shimmer
  ];

  harmonics.forEach(({ freq, gain: vol }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    // Sharp attack, long natural decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 3);
  });
}

/** Haptic feedback: uses iOS Taptic Engine via ios-haptics, falls back to Vibration API on Android. */
export async function triggerVibration() {
  try {
    const { haptic } = await import('ios-haptics');
    haptic.error();
  } catch {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }
}
