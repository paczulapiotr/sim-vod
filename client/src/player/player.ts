export const bandwidths = {
  "360p": 800_000,
  "480p": 1_400_000,
  "720p": 2_800_000,
  "1080p": 5_000_000,
};
const tableCapacity = 25;

const qualityPicker = (bandwidth: number): number => {
  let resolutionLevel = 0;

  if (bandwidth > bandwidths["480p"]) resolutionLevel = 1;
  if (bandwidth > bandwidths["720p"]) resolutionLevel = 2;
  if (bandwidth > bandwidths["1080p"]) resolutionLevel = 3;

  return resolutionLevel;
};

export const defaultPrediction = (arr: number[]): number => {
  const bandwidth = arr.length > 0 ? arr[arr.length - 1] : 0;

  return qualityPicker(bandwidth);
};

export const optimisticPrediction = (arr: number[]): number => {
  const maxBandwidth = Math.max(...arr);

  return qualityPicker(maxBandwidth);
};

export const pesimisticPrediction = (arr: number[]): number => {
  const minBandwidth = Math.min(...arr);

  return qualityPicker(minBandwidth);
};

export const storeBandwidths = (array: number[], hls: Hls): NodeJS.Timeout => {
  return setInterval(
    (hls: any) => {
      if (array.length >= tableCapacity) {
        array.shift();
      }
      const currBandwidth = hls.bandwidthEstimate as number;
      console.log("Current bandwidth:", currBandwidth);
      array.push(currBandwidth);
    },
    4000,
    hls
  );
};
