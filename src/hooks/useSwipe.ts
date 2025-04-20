import { type RefObject, useEffect, useRef } from 'react';

interface UseSwipeOptions {
  target: RefObject<HTMLElement | null>;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // 최소 이동 거리 비율 (기본 20%)
  duration?: number; // 애니메이션 지속 시간 (기본 300ms)
}

export default function useSwipe({
  target,
  onSwipeLeft,
  onSwipeRight,
  threshold = 0.2,
  duration = 300
}: UseSwipeOptions) {
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isUpdatingRef = useRef(false);
  const translateXRef = useRef(0);
  const itemWidthRef = useRef(0);
  const deltaXRef = useRef(0);
  const deltaYRef = useRef(0);
  const hasMovedRef = useRef(false);
  const timerRef = useRef<Set<NodeJS.Timeout>>(new Set());

  useEffect(() => {
    const element = target.current;

    if (!element) return;

    const timer = timerRef.current;

    const updateItemWidth = () => {
      itemWidthRef.current = element.clientWidth;
    };

    const updateContainerHeight = () => {
      const current = element.querySelectorAll('.calendar')[1] as HTMLElement;
      const container = element;

      if (!current || !container) return;

      const newHeight = current.offsetHeight;
      container.style.height = `${newHeight}px`;
    };

    updateItemWidth();
    updateContainerHeight();

    const handleTouchStart = (e: TouchEvent) => {
      if (isUpdatingRef.current) return;

      timer.forEach((timeoutId) => clearTimeout(timeoutId));
      timer.clear();

      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;
      hasMovedRef.current = false;
      isDraggingRef.current = true;
      translateXRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;

      const touch = e.touches[0];
      const dx = touch.clientX - startXRef.current;
      const dy = touch.clientY - startYRef.current;

      translateXRef.current = dx;

      // 최초 한 번만 방향 판단
      if (!hasMovedRef.current) {
        deltaXRef.current = Math.abs(dx);
        deltaYRef.current = Math.abs(dy);
        hasMovedRef.current = true;

        if (deltaYRef.current > deltaXRef.current) {
          // 세로 스크롤이 더 크면 → 좌우 스와이프 무시
          isDraggingRef.current = false;
          return;
        }
      }

      element.style.transition = 'none';
      element.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      isUpdatingRef.current = true;

      const moved = translateXRef.current;
      const width = itemWidthRef.current;
      const minDistance = width * threshold;

      element.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;

      if (moved > minDistance) {
        element.style.transform = `translate3d(${width}px, 0, 0)`;
        timer.add(
          setTimeout(() => {
            onSwipeRight?.();
            timer.add(
              setTimeout(() => {
                element.style.transition = 'none';
                element.style.transform = 'translate3d(0, 0, 0)';
                isUpdatingRef.current = false;
              })
            );
          }, duration)
        );
      } else if (moved < -minDistance) {
        element.style.transform = `translate3d(-${width}px, 0, 0)`;
        timer.add(
          setTimeout(() => {
            onSwipeLeft?.();
            timer.add(
              setTimeout(() => {
                element.style.transition = 'none';
                element.style.transform = 'translate3d(0, 0, 0)';
                isUpdatingRef.current = false;
              })
            );
          }, duration)
        );
      } else {
        element.style.transform = 'translate3d(0, 0, 0)';
        timer.add(
          setTimeout(() => {
            isUpdatingRef.current = false;
          })
        );
      }
    };

    window.addEventListener('resize', updateItemWidth);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', updateItemWidth);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [target, onSwipeLeft, onSwipeRight, threshold, duration]);

  useEffect(() => {
    const updateContainerHeight = () => {
      const element = target.current;

      if (!element) return;

      const current = element.querySelectorAll('.calendar')[1] as HTMLElement;
      const container = element;

      if (!current || !container) return;

      const newHeight = current.offsetHeight;
      container.style.height = `${newHeight}px`;
    };

    updateContainerHeight();
  }, [target]);

  useEffect(() => {
    const timer = timerRef.current;

    return () => {
      timer.forEach((timeoutId) => clearTimeout(timeoutId));
      timer.clear();
    };
  }, []);
}
