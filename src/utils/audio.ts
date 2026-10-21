// Lightweight sound interface for Valliance Studio portfolio — zero audio latency

class SoundSystem {
  public toggle(): boolean {
    return false;
  }

  public isEnabled(): boolean {
    return false;
  }

  public setEnabled(_val: boolean): void {}

  public playClick(_freq = 800, _duration = 0.04): void {}

  public playHover(): void {}

  public playChime(): void {}

  public playSwoosh(): void {}

  public playWhoosh(): void {}
}

export const sound = new SoundSystem();
