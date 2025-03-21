import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mousePos = { x: pos.x, y: pos.y };
  let speed = 0.2;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const updateCursor = () => {
      pos.x += (mousePos.x - pos.x) * speed;
      pos.y += (mousePos.y - pos.y) * speed;

      gsap.set(cursorRef.current, {
        x: pos.x - cursorRef.current.clientWidth / 2,
        y: pos.y - cursorRef.current.clientHeight / 2,
      });

      requestAnimationFrame(updateCursor);
    };
    
    updateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 2,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    const clickableElements = document.querySelectorAll(
      "a, button, .clickable"
    );

    clickableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      clickableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
