const rewind = (video: HTMLVideoElement, stopTime: number) => {
  let animationFrameId: number;
  let isRewinding = false;
  
  const rewindVideo = (rewindSpeed = 1) => {
    // Остановить предыдущую анимацию если она запущена
    if (isRewinding) {
      cancelAnimationFrame(animationFrameId);
    }
    
    isRewinding = true;
    const startSystemTime = performance.now();
    const startVideoTime = video.currentTime;
    
    const animate = () => {
      if (Math.abs(video.currentTime - stopTime) < 0.01) {
        isRewinding = false;
        video.pause();
        video.currentTime = stopTime;
        return;
      }
      
      const elapsed = (performance.now() - startSystemTime) / 1000;
      const newTime = startVideoTime - elapsed * rewindSpeed;
      
      if (newTime >= 0) {
        video.currentTime = newTime;
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isRewinding = false;
        video.currentTime = 0;
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  return rewindVideo;
};

export default rewind;