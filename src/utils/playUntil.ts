const playUntil = async (
  videoElement: HTMLVideoElement, 
  stopTime: number, 
  startFrom?: number
): Promise<void> => {
  // Очищаем предыдущие обработчики и состояния
  const cleanup = () => {
    videoElement.ontimeupdate = null;
    videoElement.removeEventListener('ended', cleanup);
    videoElement.removeEventListener('error', cleanup);
  };

  try {
    // Очищаем предыдущие обработчики
    cleanup();
    
    // Сбрасываем скорость воспроизведения
    videoElement.playbackRate = 1;
    
    // Устанавливаем начальное время, если оно указано
    if (typeof startFrom === 'number' && startFrom >= 0) {
      videoElement.currentTime = startFrom;
    }

    // Создаем промис для отслеживания достижения целевого времени
    const timeReachedPromise = new Promise<void>((resolve) => {
      const checkTime = () => {
        if (videoElement.currentTime >= stopTime) {
          cleanup();
          videoElement.pause();
          resolve();
        }
      };

      videoElement.ontimeupdate = checkTime;
      videoElement.addEventListener('ended', cleanup);
      videoElement.addEventListener('error', cleanup);
    });

    // Запускаем воспроизведение
    await videoElement.play();
    
    // Ждем достижения целевого времени
    await timeReachedPromise;
    
  } catch (error) {
    // Очищаем обработчики в случае ошибки
    cleanup();
    throw error;
  }
};

export default playUntil;