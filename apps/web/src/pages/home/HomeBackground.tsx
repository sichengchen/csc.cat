import { GrainGradient, MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export type ThemeOverride = "light" | "dark";

const shaderSizeProps = {
  className: "size-full",
  fit: "cover",
  height: "100%",
  width: "100%",
} as const;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

type HomeBackgroundProps = {
  themeOverride?: ThemeOverride;
};

export function HomeBackground({ themeOverride }: HomeBackgroundProps) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const useDarkShader = themeOverride ? themeOverride === "dark" : prefersDark;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {useDarkShader ? (
        <GrainGradient
          {...shaderSizeProps}
          colorBack="#040611"
          colors={["#8cf7c7", "#6ea8ff", "#c996ff", "#ff7f6e", "#ffe08a"]}
          intensity={0.42}
          noise={0.28}
          scale={1.08}
          shape="corners"
          softness={0.72}
          speed={prefersReducedMotion ? 0 : 0.18}
        />
      ) : (
        <div className="size-full" style={{ opacity: 0.68 }}>
          <MeshGradient
            {...shaderSizeProps}
            colors={["#c8eaff", "#f6cadf", "#d4f4e4", "#d9d0ff", "#ffd8ca", "#dbeafe"]}
            distortion={0.9}
            grainMixer={0.02}
            grainOverlay={0.006}
            rotation={16}
            scale={1.12}
            speed={prefersReducedMotion ? 0 : 0.14}
            swirl={0.56}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-white/12 dark:bg-background/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_88%)] opacity-0 dark:opacity-45" />
    </div>
  );
}
