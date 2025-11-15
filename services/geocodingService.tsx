type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GeocodeResult = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: any;
  place_id: string;
  postcode_localities: string[];
  types: string[];
};
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
