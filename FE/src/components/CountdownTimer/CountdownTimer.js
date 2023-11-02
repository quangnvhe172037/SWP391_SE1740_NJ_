import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  console.log(targetDate);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, targetDate]);

  return (
    <div>
      {timeLeft.days !== undefined &&
      timeLeft.hours !== undefined &&
      timeLeft.minutes !== undefined &&
      timeLeft.seconds !== undefined ? (
        <div>
          <span>{timeLeft.days} Days </span>
          <span>{timeLeft.hours} Hours </span>
          <span>{timeLeft.minutes} Minutes </span>
          <span>{timeLeft.seconds} Seconds </span>
        </div>
      ) : (
        <span>Countdown Complete!</span>
      )}
    </div>
  );
};
export default CountdownTimer;
