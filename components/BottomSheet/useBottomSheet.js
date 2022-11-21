import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BOTTOM_SHEET_HEIGHT, BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';


export function useBottomSheet(dirButtonRef, bottomSheetOpen,setBottomSheetOpen) {

    const sheetRef = useRef();
    const contentRef = useRef();
  
    const [touchStart, setTouchStart] = useState({
        sheetY: 0,
        touchY: 0
    });


    const [touchMove, setTouchMove] = useState({
        prevTouchY: 0,
        movingDirection: "none"
    });

    const [isContentAreaTouched,setIsContentAreaTouched] = useState(false);

  // sheet ref
  const handleTouchStart = useCallback((e) => {


    setTouchStart({
        sheetY: sheetRef.current.getBoundingClientRect().y,
        touchY: e.touches[0].clientY
    });

    setTouchMove(prevState => ({
      ...prevState, 
      prevTouchY: e.touches[0].clientY
    }));

  },[touchStart,sheetRef]);

  const handleTouchMove = useCallback((e) => {
    const currentTouch = e.touches[0];

    if (touchMove.prevTouchY < currentTouch.clientY) {
  
      setTouchMove(prevState=> ({
        ...prevState,
         movingDirection: 'down'
        }));
    }

    if (touchMove.prevTouchY > currentTouch.clientY) {
      setTouchMove(prevState => ({
        ...prevState, 
        movingDirection: 'up'
      }));
    }

    if (isContentAreaTouched == false) {

      // // content에서 scroll이 발생하는 것을 막습니다. 
      // e.preventDefault();
  
      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = (currentTouch.clientY - touchStart.touchY);

      let nextSheetY= touchStart.sheetY+touchOffset;
      let nextTranslateY = nextSheetY-window.innerHeight+window.innerHeight*(BOTTOM_SHEET_DBOTTOM_GAP/100);

      const maxTransY = 0
      const minTransY = -window.innerHeight*(BOTTOM_SHEET_HEIGHT-BOTTOM_SHEET_DBOTTOM_GAP)/100;

      //Shortest
      if (nextTranslateY > maxTransY) {
        nextTranslateY = maxTransY;
      }
      //longest
      if (nextTranslateY < minTransY) {
        nextTranslateY = minTransY ;
      }

   

      // sheet 위치 갱신. 
      sheetRef.current.style.setProperty('transform', `translateY(${nextTranslateY}px)`);
      // sheetRef.current.style.setProperty('transform', `translateY(10px)`);

    } 
    else {
      
      // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
      document.body.style.overflowY = 'hidden';
    }

    //update old value
    setTouchMove(prevState => ({
          ...prevState, 
          prevTouchY: currentTouch.clientY
      }));
    



  },[touchMove,touchStart,isContentAreaTouched]);

  const handleTouchEnd = useCallback((e) => {
    
    // Snap Animation 
    const maxTransY = 0
    const minTransY = -window.innerHeight*(BOTTOM_SHEET_HEIGHT-BOTTOM_SHEET_DBOTTOM_GAP)/100;


    if (isContentAreaTouched == false){

      if (touchMove.movingDirection === 'down') {
        sheetRef.current.style.setProperty('transform', `translateY(${maxTransY}px)`);

        dirButtonRef.current.style.setProperty('transform', `rotate(0turn)`);
        setBottomSheetOpen(false);
      }

      if (touchMove.movingDirection === 'up') {
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);
        dirButtonRef.current.style.setProperty('transform', `rotate(0.5turn)`);
        setBottomSheetOpen(true);
      }
    }
    

    //초기화

    setTouchStart(prevState => ({
        ...prevState,
        // sheetY: sheetRef.current.getBoundingClientRect().y,
        // touchY: e.touches[0].clientY
        sheetY: 0,
        touchY: 0
    }));

    setTouchMove(prevState => ({
        ...prevState,
      prevTouchY: 0,
      movingDirection: "none"
    }));

    setIsContentAreaTouched(false);


  },[touchMove,touchStart,sheetRef]);

  //content ref
  const handleContentTouchStart = useCallback((e) =>{
    setIsContentAreaTouched(true);
    contentRef.current.style.overflow = "scroll";
    contentRef.current.focus();


  },[isContentAreaTouched]);

  const handleContentTouchMove = useCallback((e) =>{

    // console.log(touchMove,  contentRef.current.scrollTop);
    // release content scroll when it reaches top in the middle of movement
    if (touchMove.movingDirection === "down" && contentRef.current.scrollTop <= 0){
      contentRef.current.style.overflow = "hidden";
      setIsContentAreaTouched(false);
    }

  },[isContentAreaTouched,touchMove]);

  const handleContentTouchEnd = useCallback((e) =>{
    setIsContentAreaTouched(false);

  },[isContentAreaTouched]);

  
  /*
  // Register ContentRef Handler
  useEffect(() =>{
    if(contentRef && contentRef.current){
      contentRef.current.addEventListener('touchstart', handleContentTouchStart);
      contentRef.current.addEventListener('touchmove', handleContentTouchMove);

      contentRef.current.addEventListener('touchend', handleContentTouchEnd);
  }
  
  return () => {
    contentRef.current.removeEventListener('touchstart', handleContentTouchStart);
    contentRef.current.removeEventListener('touchmove', handleContentTouchMove);
    contentRef.current.removeEventListener('touchend', handleContentTouchEnd);
  }


  });



  // Register Sheet Ref Handler 
  useEffect(() => {

    if(sheetRef && sheetRef.current){
        sheetRef.current.addEventListener('touchstart', handleTouchStart);
        sheetRef.current.addEventListener('touchmove', handleTouchMove);
        sheetRef.current.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      sheetRef.current.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current.removeEventListener('touchend', handleTouchEnd);

    }
  })
  */
  return { sheetRef, contentRef };
}