import React, {HTMLAttributes, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from 'react';
import './scroll.scss';
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;

  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const setBarTop = (number: number) => {
    if (number < 0) return;
    const {current} = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.clientHeight;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
    if (number > maxBarTop) return;
    _setBarTop(number);
  };
  const onScroll: UIEventHandler = (e) => {
    const {current} = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.clientHeight;
    const scrollTop = current!.scrollTop;
    setBarTop(scrollTop * viewHeight / scrollHeight);
  };
  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopTop = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    console.log('onMouseDownBar', onMouseDownBar);
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopTop.current = barTop;
  };

  const onMouseUpBar = () => {
    console.log('onMouseUpBar', onMouseUpBar);
    draggingRef.current = false;
    console.log('barTop',barTop);

  };
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopTop.current + delta;
      setBarTop(newBarTop);
      const scrollHeight = containerRef.current!.scrollHeight;
      const viewHeight = containerRef.current!.clientHeight;
      containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight;
    }
  };
  useEffect(() => {
    // e.currentTarget.scrollHeight;//滚动全高
    // e.currentTarget.clientHeight;//可视区高度，或者用e.currentTarget.getBoundingClientRect().height
    //!ts中表示不用管是null

    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.clientHeight;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);
  const onSelect = (e: Event) => {
    if (draggingRef.current) {e.preventDefault();}
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectStart', onSelect);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectStart', onSelect);
    };
  }, []);
  return (
    <div className='fui-scroll' {...rest}>
      <div className='fui-scroll-inner' style={{right: -scrollbarWidth()}}
           onScroll={onScroll}
           ref={containerRef}
      >
        {children}
      </div>
      <div className='fui-scroll-track'>
        <div className='fui-scroll-bar'
             style={{height: barHeight, transform: `translateY(${barTop}px)`}}
             onMouseDown={onMouseDownBar}

        />
      </div>


    </div>
  );
};
export default Scroll;

