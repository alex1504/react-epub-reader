import { useEffect, useState } from 'react';

interface MouseWheelEvent extends MouseEvent {
  deltaY: number;
}

export default () => {
  const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0);
  useEffect(() => {
    const updateScroll = (e: MouseWheelEvent) => {
      console.log(e)
      setMouseWheelScrolled(e.deltaY + mouseWheelScrolled);
    };

    document.body.addEventListener("wheel", updateScroll, false)
    return () => {
      document.body.removeEventListener('wheel', updateScroll)
    };
  });
  return mouseWheelScrolled;
};