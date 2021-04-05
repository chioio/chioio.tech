import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/Home.module.css';

const DynamicAnimation = dynamic(() =>
  import('@usertive/react-fluid-animation')
);

const defaultConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005,
  colorsPool: [
    '#FF1100',
    '#FF0046',
    '#5D00FF',
    '#0043FF',
    '#0088FF',
    '#00DCFF',
    '#00FFF7',
    '#00FFD4',
    '#00FFA2',
    '#DADADA',
    '#FFFFFF',
  ],
};

export default function FluidAnimation() {
  const [config, setConfig] = useState({ ...defaultConfig });
  const animationRef = useRef(null);
  const [isAfterHydration, setIsAfterHydration] = useState(false);
  const makeRandomSplats = useCallback(() => {
    animationRef.current?.addRandomSplats((5 + Math.random() * 20) | 0);
  }, [animationRef]);

  useEffect(() => {
    if (!isAfterHydration) setIsAfterHydration(true);
  }, [isAfterHydration, setIsAfterHydration]);

  return isAfterHydration ? (
    <DynamicAnimation
      config={config}
      animationRef={(animation) => (animationRef.current = animation)}
      className={styles.fluid}
    />
  ) : null;
}
