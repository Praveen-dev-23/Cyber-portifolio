// Web Audio API Synthesizer Sound Manager for CyberOS

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientLfo: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private initialized = false;

  public init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime); // Standard comfortable volume
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch (e) {
      console.error("Failed to initialize Web Audio API:", e);
    }
  }

  private resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public playHover() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1000, this.ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playBoot() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Sub-bass sweep
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(40, now);
    subOsc.frequency.exponentialRampToValueAtTime(90, now + 1.5);
    
    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.linearRampToValueAtTime(0.01, now + 1.8);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    
    subOsc.start(now);
    subOsc.stop(now + 1.8);

    // High filter resonant sweep
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.8);
    osc.frequency.exponentialRampToValueAtTime(800, now + 1.6);

    filter.type = 'bandpass';
    filter.Q.setValueAtTime(8, now);
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 1.6);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.8);

    // Success chime alert at the end of the boot
    setTimeout(() => {
      this.playChime();
    }, 1200);
  }

  private playChime() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.04, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  public playError() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(100, this.ctx.currentTime);
    
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(98, this.ctx.currentTime); // Dissonant beating

    gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.35);
    osc2.stop(this.ctx.currentTime + 0.35);
  }

  public playKeystroke() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    // Fast mechanical keyboard style sound using noise and synth pop
    const bufferSize = this.ctx.sampleRate * 0.02; // very short click
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000 + Math.random() * 800, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseNode.start();
    noiseNode.stop(this.ctx.currentTime + 0.02);
  }

  public startAmbient() {
    this.resume();
    if (!this.ctx || !this.masterGain || this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      
      // 1. Ambient low pad oscillator
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();
      
      this.ambientOsc.type = 'sawtooth';
      this.ambientOsc.frequency.setValueAtTime(55, now); // A1 low frequency drone

      // Filter to cut off highs and create a warm, deep dark space capsule hum
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(120, now);
      lowpass.Q.setValueAtTime(2, now);

      // LFO to slowly modulate filter frequency (creating movement in the soundscape)
      this.ambientLfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.ambientLfo.type = 'sine';
      this.ambientLfo.frequency.setValueAtTime(0.12, now); // 0.12 Hz - super slow
      lfoGain.gain.setValueAtTime(30, now); // modulate by +/- 30Hz

      this.ambientLfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency); // hook LFO up to lowpass cut-off

      // Set volume very low so it is comfortable as background music
      this.ambientGain.gain.setValueAtTime(0.03, now);

      this.ambientOsc.connect(lowpass);
      lowpass.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      this.ambientOsc.start(now);
      this.ambientLfo.start(now);
      this.isAmbientPlaying = true;
    } catch (e) {
      console.error("Ambient audio failed to launch:", e);
    }
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying) return;
    const now = this.ctx ? this.ctx.currentTime : 0;

    if (this.ambientGain && this.ctx) {
      // Fade out smoothly instead of cutting abruptly
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    }

    setTimeout(() => {
      try {
        if (this.ambientOsc) {
          this.ambientOsc.stop();
          this.ambientOsc.disconnect();
          this.ambientOsc = null;
        }
        if (this.ambientLfo) {
          this.ambientLfo.stop();
          this.ambientLfo.disconnect();
          this.ambientLfo = null;
        }
        this.isAmbientPlaying = false;
      } catch (e) {
        // Safe check
      }
    }, 600);
  }

  public toggleAmbient() {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundManager();
