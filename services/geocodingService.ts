const GeocodingService = (() => {
  const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

  const getCityByPostcode = async (postCode: string): Promise<string | null> => {
    const PARAMS = `components=postal_code:${postCode}|country:NO`
    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    if (!key) {
      console.error("Could not load api key.")
      return null;
    }

    const query = `${BASE_URL}?${PARAMS}&key=${key}`;
    const response = await fetch(query).then(r => {
      return r.json()
    });
    return response.results[0].address_components[1].short_name ?? null;
  };

  return {
    getCityByPostcode,
  }
})()

export default GeocodingService;
