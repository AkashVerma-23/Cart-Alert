// Check if user is close to a specified location
export const checkProximity = (
  userLat,
  userLng,
  storeLat,
  storeLng,
  radiusInMeters = 100
) => {
  // Calculate distance between two points using Haversine formula
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(storeLat - userLat);
  const dLng = toRadians(storeLng - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(userLat)) *
      Math.cos(toRadians(storeLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371000 * c; // Earth radius in meters

  return distance <= radiusInMeters;
};
