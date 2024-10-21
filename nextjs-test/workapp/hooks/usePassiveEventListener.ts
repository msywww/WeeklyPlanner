import { useEffect, useRef } from 'react';

const usePassiveEventListener = (
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element = window,
  options = { passive: true }
) => {
  const savedHandler = useRef<EventListenerOrEventListenerObject>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        (savedHandler.current as EventListener)(event);
      }
    };
    
    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, options]);
};

export default usePassiveEventListener;