"use client";

import Snowfall from "react-snowfall";

export default function CustomSnowfall(props: React.ComponentProps<typeof Snowfall>) {
  return (
    <Snowfall
      snowflakeCount={50}
      opacity={[0.025, 0.05]}
      speed={[0.5, 2]}
      wind={[-0.25, 1]}
      radius={[1, 3]}
      {...props}
    />
  );
}
