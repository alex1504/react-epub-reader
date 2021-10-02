import { useState } from 'react';

export default (isVisible: boolean = false) => {

  const [isBookmarkDrawer, setBookmarkDrawer] = useState(isVisible)
  const toggleBookmarkDrawer = () => {
    setBookmarkDrawer(!isBookmarkDrawer)
  }

  return {
    isBookmarkDrawer,
    setSearchDrawer: setBookmarkDrawer,
    toggleBookmarkDrawer
  }
};