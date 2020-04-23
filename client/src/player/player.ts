export const bandwidths = {
  "360p": 400_000,
  "480p": 800_000,
  "720p": 1_400_000,
  "1080p": 2_800_000,
};
const tableCapacity = 25;

export const optimisticPrediction = (arr: number[]): number => {
  const maxBandwidth = Math.max(...arr);
  let resolutionLevel = 0;

  if (maxBandwidth > bandwidths["480p"]) resolutionLevel = 1;
  if (maxBandwidth > bandwidths["720p"]) resolutionLevel = 2;
  if (maxBandwidth > bandwidths["1080p"]) resolutionLevel = 3;

  return resolutionLevel;
};

export const pesimisticPrediction = (arr: number[]): number => {
  const maxBandwidth = Math.min(...arr);
  let resolutionLevel = 0;

  if (maxBandwidth > bandwidths["480p"]) resolutionLevel = 1;
  if (maxBandwidth > bandwidths["720p"]) resolutionLevel = 2;
  if (maxBandwidth > bandwidths["1080p"]) resolutionLevel = 3;

  return resolutionLevel;
};

export const storeBandwidths = (array: number[], hls: Hls): NodeJS.Timeout => {
  return setInterval(
    (hls: any) => {
      if (array.length >= tableCapacity) {
        array.shift();
      }
      const currBandwidth = hls.bandwidthEstimate as number;
      array.push(currBandwidth);
    },
    4000,
    hls
  );
};
