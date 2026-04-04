const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const HOUR2RAD = 15 * DEG2RAD;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap24 = (hours) => ((hours % 24) + 24) % 24;
const wrap2pi = (angle) => ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

export const getJulianDate = (date = new Date()) => {
  return date.getTime() / 86400000 + 2440587.5;
};

export const getVancouverLST = (date = new Date()) => {
  const jd = getJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;

  let gmstDeg =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;

  gmstDeg = ((gmstDeg % 360) + 360) % 360;

  const vancouverLongitudeDeg = -123.1207;
  const lstDeg = gmstDeg + vancouverLongitudeDeg;

  return wrap24(lstDeg / 15);
};

export const getHorizontalCoords = (raHours, decDeg, latDeg, lstHours) => {
  const ra = raHours * HOUR2RAD;
  const dec = decDeg * DEG2RAD;
  const lat = latDeg * DEG2RAD;
  const lst = lstHours * HOUR2RAD;

  let ha = lst - ra;
  ha = ((ha + Math.PI) % (2 * Math.PI)) - Math.PI;

  const sinAlt =
    Math.sin(dec) * Math.sin(lat) +
    Math.cos(dec) * Math.cos(lat) * Math.cos(ha);

  const alt = Math.asin(clamp(sinAlt, -1, 1));

  const az = Math.atan2(
    Math.sin(ha),
    Math.cos(ha) * Math.sin(lat) - Math.tan(dec) * Math.cos(lat)
  ); // Fixed azimuth formula for N=0 East

  const azNorthEast = wrap2pi(az);
  const r = 90; // Slightly smaller dome for edge clipping

  return {
    x: r * Math.cos(alt) * Math.sin(azNorthEast),
    y: r * Math.sin(alt),
    z: r * Math.cos(alt) * Math.cos(azNorthEast),
    altDeg: alt * RAD2DEG,
    azDeg: azNorthEast * RAD2DEG,
  };
};