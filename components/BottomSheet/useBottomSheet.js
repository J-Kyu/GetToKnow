import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BOTTOM_SHEET_HEIGHT, BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';


export function useBottomSheet() {

    const sheetRef = useRef();
  
    const [touchStart, setTouchStart] = useState({
        sheetY: 0,
        touchY: 0
    });


    const [touchMove, setTouchMove] = useState({
        prevTouchY: 0,
        movingDirection: "none"
    });

    const [isContentAreaTouched,setIsContentAreaTouched] = useState(false);


  const canUserMoveBottomSheet = () => {
    
    // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다. 
    if (!isContentAreaTouched) {
      return true;
    }
  
    // 바텀시트가 올라와있는 상태가 아닐 때는 컨텐츠 영역을 터치해도 바텀시트를 움직이는 것이 자연스럽습니다. 
    // if (sheetRef.current.getBoundingClientRect().y !== MIN_Y) {
    //   return true;
    // }
  
    // if (touchMove.movingDirection === 'down') {
  
    //   // 스크롤을 더 이상 올릴 것이 없다면, 바텀시트를 움직이는 것이 자연스럽습니다. 
    //   // Safari 에서는 bounding 효과 때문에 scrollTop 이 음수가 될 수 있습니다. 따라서 0보다 작거나 같음 (<=)으로 검사합니다. 
    //   return content.current.scrollTop <= 0;
    // }
    
    return false;
  }



  const handleTouchStart = useCallback((e) => {


    setTouchStart({
        sheetY: sheetRef.current.getBoundingClientRect().y,
        touchY: e.touches[0].clientY
    });

    console.log("Touch Start");
  },[touchStart,sheetRef]);

  const handleTouchMove = useCallback((e) => {
    console.log("Touch Move");
    const currentTouch = e.touches[0];

    if (touchMove.prevTouchY !== undefined ){
      setTouchMove(prevState => ({
            ...prevState, 
            prevTouchY: touchStart.touchY
        }));
    }


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

    if (canUserMoveBottomSheet()) {

      // content에서 scroll이 발생하는 것을 막습니다. 
      e.preventDefault();
  
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


      console.log("Bottom Sheet scrolling");
    } 
    else {
      
      // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
      document.body.style.overflowY = 'hidden';
    }


  },[touchMove,touchStart,sheetRef]);

  const handleTouchEnd = useCallback((e) => {
    console.log("Touch End");
    // Snap Animation
    const currentSheetY = sheetRef.current.getBoundingClientRect().y;
  

    // if (touchMove.movingDirection === 'down') {
    //   sheetRef.current.style.setProperty('transform', 'translateY(0%)');
    // }

    // if (touchMove.movingDirection === 'up') {
    //   const maxVH = BOTTOM_SHEET_HEIGHT-BOTTOM_SHEET_DBOTTOM_GAP;
    //   sheetRef.current.style.setProperty('transform', `translateY(-${maxVH}%)`);
    // }


    console.log(touchStart,touchMove);
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


  useEffect(() =>{
    const wow = (sheetRef.current.getBoundingClientRect().y);
    // console.log(wow);

  });

  // Touch Event 핸들러들을 등록한다. 
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



  return { sheetRef };
}