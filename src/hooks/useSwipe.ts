import { type RefObject, useEffect, useRef } from 'react';

interface UseSwipeOptions {
  target: RefObject<HTMLElement | null>;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // 최소 이동 거리 비율 (기본 20%)
  duration?: number; // 애니메이션 지속 시간 (기본 300ms)
  disableSwipeRight?: boolean;
  disableSwipeLeft?: boolean;
}

export default function useSwipe({
  target,
  onSwipeLeft,
  onSwipeRight,
  threshold = 0.2,
  duration = 300,
  disableSwipeRight = false,
  disableSwipeLeft = false
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
  const transitionEndRef = useRef<((e: TransitionEvent) => void) | null>(null);
  const rafId1Ref = useRef(0);
  const rafId2Ref = useRef(0);

  useEffect(() => {
    const element = target.current;

    if (!element) return;

    const updateItemWidth = () => {
      itemWidthRef.current = element.clientWidth;
    };

    updateItemWidth();

    const handleTouchStart = (e: TouchEvent) => {
      if (isUpdatingRef.current) return;

      if (transitionEndRef.current) {
        element.removeEventListener('transitionend', transitionEndRef.current);
        transitionEndRef.current = null;
      }

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

      if (
        (disableSwipeRight && translateXRef.current > 0) ||
        (disableSwipeLeft && translateXRef.current < 0)
      ) {
        isDraggingRef.current = false;
        element.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
        element.style.transform = 'translate3d(0, 0, 0)';
        return;
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

        transitionEndRef.current = (e: TransitionEvent) => {
          if (e.propertyName === 'transform') {
            rafId1Ref.current = requestAnimationFrame(() => {
              onSwipeRight?.();
              rafId2Ref.current = requestAnimationFrame(() => {
                element.style.transition = 'none';
                element.style.transform = 'translate3d(0, 0, 0)';
                isUpdatingRef.current = false;
              });
            });
          }
        };

        element.addEventListener('transitionend', transitionEndRef.current);
      } else if (moved < -minDistance) {
        element.style.transform = `translate3d(-${width}px, 0, 0)`;

        transitionEndRef.current = (e: TransitionEvent) => {
          if (e.propertyName === 'transform') {
            rafId1Ref.current = requestAnimationFrame(() => {
              onSwipeLeft?.();
              rafId2Ref.current = requestAnimationFrame(() => {
                element.style.transition = 'none';
                element.style.transform = 'translate3d(0, 0, 0)';
                isUpdatingRef.current = false;
              });
            });
          }
        };

        element.addEventListener('transitionend', transitionEndRef.current);
      } else {
        isUpdatingRef.current = false;
        element.style.transform = 'translate3d(0, 0, 0)';
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

      if (transitionEndRef.current) {
        element.removeEventListener('transitionend', transitionEndRef.current);
      }
    };
  }, [target, onSwipeLeft, onSwipeRight, threshold, duration, disableSwipeRight, disableSwipeLeft]);

  useEffect(() => {
    return () => {
      if (rafId1Ref.current) {
        cancelAnimationFrame(rafId1Ref.current);
      }
      if (rafId2Ref.current) {
        cancelAnimationFrame(rafId2Ref.current);
      }
    };
  }, []);
}
