import { useState, useEffect } from "react";

export const useDevice = () => {
  const [deviceSize, setDeviceSize] = useState({
    deviceWidth: window.innerWidth,
    deviceHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDeviceSize({
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceSize; 
};
