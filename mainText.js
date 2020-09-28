import React, { useEffect } from "react";
import gsap from 'gsap';

const MainText = (props) => {
  const data = [
    {
      sentence: "Hi",
      alternative: "Tchô!"
    },
    {
      sentence: "how was your day",
      alternative: "fabulous"
    }
  ];

  let refs = []
  let timelineArr = []

  const mouseIn = (e, i) => {
    if (timelineArr[i]) {
      timelineArr[i].play()
    }
  };

  const mouseOut = (e, i) => {
    if (timelineArr[i]) {
      timelineArr[i].reverse()
    }
  };

  useEffect(() => {
    refs.map((e, i) => {
      console.log(e);
      const tl = gsap.timeline({ paused: true })
      tl
        .to(e.children[0].children[0].children[1], {
          duration: 0.5,
          ease: "none",
          attr: { values: "1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 18 -8" }
        }, "blur")
        .to(e.children[0].children[0].children[0], {
          duration: 0.5,
          ease: "none",
          attr: { stdDeviation: 1.5 }
        }, "blur")
        .to(e.children[1].children[0], {
          duration: 0.5,
          ease: "none",
          opacity: 0
        }, 0.4)
        .to(e.children[1].children[1], {
          duration: 0.5,
          ease: "none",
          opacity: 1
        }, 0)
        .to(e.children[0].children[0].children[0], {
          duration: 0.5,
          ease: "none",
          attr: { stdDeviation: 0 }
        }, 0.5)
        .to(e.children[0].children[0].children[1], {
          duration: 0.5,
          ease: "none",
          attr: { values: "1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0" }
        }, 0.5)
      timelineArr.push(tl)
    })
  }, []);

  const addRef = e => {
    if (e && !refs.includes(e)) {
      refs.push(e)
    }
  }

  return (
    <div> {props.data.map((data, index) => {
      return (
          <svg viewBox="-0 -0 100 35" preserveAspectRatio="xMinYMid meet" ref={addRef}>
            <defs>
              <filter id={`goo-${index}`}>
                <feGaussianBlur className="feGau" in="SourceGraphic" stdDeviation={0} result="blur"></feGaussianBlur>
                <feColorMatrix className="feCol" in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0" result="goo"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
              </filter>
            </defs>
            <g onMouseEnter={e => mouseIn(e, index)} onMouseLeave={e => mouseOut(e, index)} style={{ filter: `url(#goo-${index})` }}>
              <text className="sentence" style={{ opacity: '1' }} x="0" y="15"> <tspan>{data.sentence} </tspan><tspan dy={"1em"}  x={0}>asdasd</tspan></text>
              <text className="alternative" style={{ opacity: '0' }} x="0" y="15"> <tspan>{data.alternative} </tspan> <tspan dy={"1em"}  x={0}>abcde</tspan></text>
            </g>
          </svg>
      )
    })} </div>
  );
};

export default MainText;
