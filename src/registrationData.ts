export interface ScheduleEntry {
  date: string;
  hours: string;
}

export interface RegistrationLocation {
  id: string;
  county: string;
  constituency: string;
  ward: string;
  locationName: string;
  locationType: "Mobile_Kit" | "Permanent_Office";
  operatingHours: string;
  address?: string;
  landmark?: string;
  schedule?: ScheduleEntry[];
  lat?: number;
  lng?: number;
}

// Approximate coordinates for Kenyan counties (center points)
const countyCoordinates: Record<string, { lat: number; lng: number }> = {
  "Baringo": { lat: 0.6450, lng: 35.9882 },
  "Bomet": { lat: -0.7833, lng: 34.6667 },
  "Bungoma": { lat: 0.5667, lng: 34.5667 },
  "Busia": { lat: 0.4606, lng: 34.1117 },
  "Elgeyo Marakwet": { lat: 0.9667, lng: 35.3000 },
  "Embu": { lat: -0.4667, lng: 37.4667 },
  "Garissa": { lat: -0.4596, lng: 39.6804 },
  "Homabay": { lat: -0.5164, lng: 34.4517 },
  "Isiolo": { lat: 0.3516, lng: 37.5833 },
  "Kajiado": { lat: -2.1033, lng: 36.8000 },
  "Kakamega": { lat: 0.2833, lng: 34.7500 },
  "Kericho": { lat: -0.3667, lng: 34.9333 },
  "Kilifi": { lat: -3.6297, lng: 39.3434 },
  "Kiambu": { lat: -1.1667, lng: 36.8167 },
  "Kirinyaga": { lat: -0.5236, lng: 37.1909 },
  "Kisii": { lat: -0.6820, lng: 34.7795 },
  "Kisumu": { lat: -0.1022, lng: 34.7617 },
  "Kitui": { lat: -1.3000, lng: 37.9667 },
  "Kwale": { lat: -4.2542, lng: 39.4669 },
  "Laikipia": { lat: -0.2833, lng: 36.6333 },
  "Lamu": { lat: -2.2833, lng: 40.9000 },
  "Machakos": { lat: -2.2167, lng: 37.2667 },
  "Makueni": { lat: -2.7367, lng: 37.7573 },
  "Mandera": { lat: 3.6333, lng: 41.8667 },
  "Marsabit": { lat: 2.7269, lng: 37.6661 },
  "Meru": { lat: -0.0478, lng: 37.6629 },
  "Migori": { lat: -1.0486, lng: 34.4855 },
  "Mombasa": { lat: -4.0435, lng: 39.6682 },
  "Murang'a": { lat: -0.6667, lng: 36.9000 },
  "Nairobi": { lat: -1.2833, lng: 36.8167 },
  "Nakuru": { lat: -0.3031, lng: 36.0800 },
  "Nandi": { lat: 0.3500, lng: 34.9500 },
  "Narok": { lat: -1.4094, lng: 35.8714 },
  "Nyandarua": { lat: -0.6167, lng: 36.4500 },
  "Nyamira": { lat: -0.5964, lng: 34.9308 },
  "Nyeri": { lat: -0.4167, lng: 36.9500 },
  "Samburu": { lat: 0.5928, lng: 37.1506 },
  "Siaya": { lat: 0.0406, lng: 34.2806 },
  "Taita Taveta": { lat: -3.4031, lng: 37.7369 },
  "Tana River": { lat: -2.3432, lng: 40.1844 },
  "Tharaka-Nithi": { lat: -0.2833, lng: 37.5500 },
  "Trans Nzoia": { lat: 0.8333, lng: 34.7500 },
  "Turkana": { lat: 1.5733, lng: 35.8667 },
  "Uasin Gishu": { lat: 0.5236, lng: 34.7597 },
  "Vihiga": { lat: 0.0667, lng: 34.7333 },
  "Wajir": { lat: 1.7500, lng: 40.0560 },
  "West Pokot": { lat: 1.3000, lng: 35.2667 }
};

// Helper function to generate slightly varied coordinates within county bounds
function getLocationCoordinates(county: string, offset: number = 0): { lat: number; lng: number } {
  const base = countyCoordinates[county] || { lat: -0.5, lng: 36.5 };
  // Add small variance for multiple locations in same county
  const latVariance = (Math.random() - 0.5) * 0.3 + (offset * 0.05);
  const lngVariance = (Math.random() - 0.5) * 0.3 + (offset * 0.05);
  return {
    lat: parseFloat((base.lat + latVariance).toFixed(4)),
    lng: parseFloat((base.lng + lngVariance).toFixed(4))
  };
}

export const registrationLocations: RegistrationLocation[] = [
  // BARINGO COUNTY
  { id: "PERM-BARINGO-TIATY", county: "Baringo County", constituency: "Tiaty", ward: "All Wards", locationName: "Next To Ministry Of Education Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Next To Ministry Of Education Offices- Chemolingot", landmark: "Chemolingot", ...getLocationCoordinates("Baringo", 0) },
  { id: "PERM-BARINGO-BARINGONORTH", county: "Baringo County", constituency: "Baringo North", ward: "All Wards", locationName: "Behind Posta Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind Posta Building", landmark: "Posta Building –Baringo North", ...getLocationCoordinates("Baringo", 1) },
  { id: "PERM-BARINGO-BARINGOCENTRAL", county: "Baringo County", constituency: "Baringo Central", ward: "All Wards", locationName: "County Commissioners Premises", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "County Commissioners Premises, Opposite Posta Building _ Kabarnet", landmark: "County Commissioners Premises- Kabarnet", ...getLocationCoordinates("Baringo", 2) },
  { id: "PERM-BARINGO-BARINGOSOUTH", county: "Baringo County", constituency: "Baringo South", ward: "All Wards", locationName: "Deputy County Commissioner's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Deputy County Commissioner's Compound", landmark: "District Hq Marigat - Kabarnet", ...getLocationCoordinates("Baringo", 3) },
  { id: "PERM-BARINGO-MOGOTIO", county: "Baringo County", constituency: "Mogotio", ward: "All Wards", locationName: "Behind Boresha Sacco", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind Boresha Sacco", landmark: "Boresha Sacco- Mogotio Township", ...getLocationCoordinates("Baringo", 4) },
  { id: "PERM-BARINGO-ELDARAVINE", county: "Baringo County", constituency: "Eldama Ravine", ward: "All Wards", locationName: "Sub County Commissioner's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Sub County Commissioner's Compound – Eldamaravine", landmark: "Law Courts – Eldama Ravine", ...getLocationCoordinates("Baringo", 5) },

  // BOMET COUNTY
  { id: "PERM-BOMET-CHEPALUNGU", county: "Bomet County", constituency: "Chepalungu", ward: "All Wards", locationName: "Sigor AGC Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Sigor AGC Church", landmark: "Junction to Sigor Township", ...getLocationCoordinates("Bomet", 0) },
  { id: "PERM-BOMET-BOMETCS", county: "Bomet County", constituency: "Bomet Central", ward: "All Wards", locationName: "Bomet Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bomet Town", landmark: "NCPB", ...getLocationCoordinates("Bomet", 1) },
  { id: "PERM-BOMET-KONOIN", county: "Bomet County", constituency: "Konoin", ward: "All Wards", locationName: "Mogogsiek", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mogogsiek", landmark: "DCC Office Konoin Subcounty", ...getLocationCoordinates("Bomet", 2) },
  { id: "PERM-BOMET-BOMETES", county: "Bomet County", constituency: "Bomet East", ward: "All Wards", locationName: "AFC Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "AFC Building, Bomet Town", landmark: "Shell Petrol Station", ...getLocationCoordinates("Bomet", 3) },
  { id: "PERM-BOMET-SOTIK", county: "Bomet County", constituency: "Sotik", ward: "All Wards", locationName: "Ministry of Agriculture", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ministry of Agriculture", landmark: "Opposite CDF Office", ...getLocationCoordinates("Bomet", 4) },

  // BUNGOMA COUNTY
  { id: "PERM-BUNGOMA-MTELGON", county: "Bungoma County", constituency: "Mt. Elgon", ward: "All Wards", locationName: "Kapsokwony", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kapsokwony", landmark: "Koony House", ...getLocationCoordinates("Bungoma", 0) },
  { id: "PERM-BUNGOMA-SISIRIA", county: "Bungoma County", constituency: "Sisiria", ward: "All Wards", locationName: "DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound", landmark: "Sirisia DCC Office", ...getLocationCoordinates("Bungoma", 1) },
  { id: "PERM-BUNGOMA-KABUCHAI", county: "Bungoma County", constituency: "Kabuchai", ward: "All Wards", locationName: "Behind Kabuchai Cdf Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind Kabuchai Cdf Compound", landmark: "Along Kanduyi Chwele Road Approx. 2km From Chwele Market", ...getLocationCoordinates("Bungoma", 2) },
  { id: "PERM-BUNGOMA-BUMULA", county: "Bungoma County", constituency: "Bumula", ward: "All Wards", locationName: "Bumula DCC Ofiice", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bumula DCC Ofiice", landmark: "DCC Compound", ...getLocationCoordinates("Bungoma", 3) },
  { id: "PERM-BUNGOMA-KANDUYI", county: "Bungoma County", constituency: "Kanduyi", ward: "All Wards", locationName: "Bungoma Cereals Board", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bungoma Cereals Board", landmark: "Silos", ...getLocationCoordinates("Bungoma", 4) },
  { id: "PERM-BUNGOMA-WEBYEEAST", county: "Bungoma County", constituency: "Webuye East", ward: "All Wards", locationName: "1st Office at DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "1st Office at DCC Compound 2nd Office Along Webuye Kitale Road", landmark: "DCC Compound / Mp Office T-Junction", ...getLocationCoordinates("Bungoma", 5) },
  { id: "PERM-BUNGOMA-WEBYEWEST", county: "Bungoma County", constituency: "Webuye West", ward: "All Wards", locationName: "Matisi Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Matisi Market", landmark: "Along Bungoma Webuye High Way - Infront of Webuye West CDF Offices", ...getLocationCoordinates("Bungoma", 6) },
  { id: "PERM-BUNGOMA-KIMILILI", county: "Bungoma County", constituency: "Kimilili", ward: "All Wards", locationName: "Great Lounch Hotel Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Great Lounch Hotel Building", landmark: "Opposite Kimilili Deb Primary", ...getLocationCoordinates("Bungoma", 7) },
  { id: "PERM-BUNGOMA-TONGAREN", county: "Bungoma County", constituency: "Tongaren", ward: "All Wards", locationName: "Within Bungoma North Sub-County Headquaters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within Bungoma North Sub-County Headquaters", landmark: "National Government CDF Offices", ...getLocationCoordinates("Bungoma", 8) },

  // BUSIA COUNTY
  { id: "PERM-BUSIA-TESONORTH", county: "Busia County", constituency: "Teso North", ward: "All Wards", locationName: "DCC's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound", landmark: "Law Courts", ...getLocationCoordinates("Busia", 0) },
  { id: "PERM-BUSIA-TESOSOUTH", county: "Busia County", constituency: "Teso South", ward: "All Wards", locationName: "DCC's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound", landmark: "DCC's building", ...getLocationCoordinates("Busia", 1) },
  { id: "PERM-BUSIA-NAMBALE", county: "Busia County", constituency: "Nambale", ward: "All Wards", locationName: "DCC's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound", landmark: "DCC's building", ...getLocationCoordinates("Busia", 2) },
  { id: "PERM-BUSIA-MATAYOS", county: "Busia County", constituency: "Matayos", ward: "All Wards", locationName: "Assistant County Commissioner's compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Assistant County Commissioner's compound", landmark: "Assistant County Commissioner's office", ...getLocationCoordinates("Busia", 3) },
  { id: "PERM-BUSIA-BUTULA", county: "Busia County", constituency: "Butula", ward: "All Wards", locationName: "DCC's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound", landmark: "Butula Police Station", ...getLocationCoordinates("Busia", 4) },
  { id: "PERM-BUSIA-FUNYULA", county: "Busia County", constituency: "Funyula", ward: "All Wards", locationName: "Funyula market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Funyula market", landmark: "Moody Awori Primary school", ...getLocationCoordinates("Busia", 5) },
  { id: "PERM-BUSIA-BUDALANGI", county: "Busia County", constituency: "Budalangi", ward: "All Wards", locationName: "Budalangi Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Budalangi Market", landmark: "Budalangi Primary School", ...getLocationCoordinates("Busia", 6) },

  // ELGEYO MARAKWET COUNTY
  { id: "PERM-ELGEYOMARAKWET-MARAKWETEAST", county: "Elgeyo Marakwet County", constituency: "Marakwet East", ward: "All Wards", locationName: "Chesoi DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Chesoi DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Elgeyo Marakwet", 0) },
  { id: "PERM-ELGEYOMARAKWET-MARAKWETWEST", county: "Elgeyo Marakwet County", constituency: "Marakwet West", ward: "All Wards", locationName: "Kapsowar IEBC Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kapsowar IEBC Office", landmark: "IEBC", ...getLocationCoordinates("Elgeyo Marakwet", 1) },
  { id: "PERM-ELGEYOMARAKWET-KEIYONORTH", county: "Elgeyo Marakwet County", constituency: "Keiyo North", ward: "All Wards", locationName: "IEBC", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "IEBC", landmark: "County Governor Office", ...getLocationCoordinates("Elgeyo Marakwet", 2) },
  { id: "PERM-ELGEYOMARAKWET-KEIYOSOUTH", county: "Elgeyo Marakwet County", constituency: "Keiyo South", ward: "All Wards", locationName: "Chepkorio Prime Tower Sacco", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Chepkorio Prime Tower Sacco", landmark: "Prime Tower Sacco Society", ...getLocationCoordinates("Elgeyo Marakwet", 3) },

  // EMBU COUNTY
  { id: "PERM-EMBU-MANYATTA", county: "Embu County", constituency: "Manyatta", ward: "All Wards", locationName: "Embu Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Embu Town-Along Embu-Meru Highway", landmark: "Ack Embu Cathedral Church", ...getLocationCoordinates("Embu", 0) },
  { id: "PERM-EMBU-RUNYENJES", county: "Embu County", constituency: "Runyenjes", ward: "All Wards", locationName: "Embu East DCC Bulding", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Embu East DCC Bulding, 1st Floor", landmark: "DCC Offices, Embu East", ...getLocationCoordinates("Embu", 1) },
  { id: "PERM-EMBU-MBEERESOUTH", county: "Embu County", constituency: "Mbeere South", ward: "All Wards", locationName: "Kiritiri Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kiritiri Town", landmark: "DCC Offices - Mbeere East Subcounty", ...getLocationCoordinates("Embu", 2) },
  { id: "PERM-EMBU-MBEERENORTH", county: "Embu County", constituency: "Mbeere North", ward: "All Wards", locationName: "DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound Mbeere North Subcounty", landmark: "DCC Offices", ...getLocationCoordinates("Embu", 3) },

  // GARISSA COUNTY
  { id: "PERM-GARISSA-TOWNSHIP", county: "Garissa County", constituency: "Garissa Township", ward: "All Wards", locationName: "Off Lamu Road", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Off Lamu Road, Behind Ministry Of Water Garage", landmark: "Ministry Of Water Garage", ...getLocationCoordinates("Garissa", 0) },
  { id: "PERM-GARISSA-BALAMBALA", county: "Garissa County", constituency: "Balambala", ward: "All Wards", locationName: "Balambala Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Balambala Town Next To Dc's Office", landmark: "Dc's Office", ...getLocationCoordinates("Garissa", 1) },
  { id: "PERM-GARISSA-LAGDERA", county: "Garissa County", constituency: "Lagdera", ward: "All Wards", locationName: "Modogashe Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Modogashe Town, Opposite Police Station", landmark: "Police Station", ...getLocationCoordinates("Garissa", 2) },
  { id: "PERM-GARISSA-DADAAB", county: "Garissa County", constituency: "Dadaab", ward: "All Wards", locationName: "Dadaab Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Dadaab Town, Opposite Un Compound", landmark: "Un Compound", ...getLocationCoordinates("Garissa", 3) },
  { id: "PERM-GARISSA-FAFI", county: "Garissa County", constituency: "Fafi", ward: "All Wards", locationName: "Next To Dc's Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Next To Dc's Office", landmark: "Dc's Office", ...getLocationCoordinates("Garissa", 4) },
  { id: "PERM-GARISSA-IJARA", county: "Garissa County", constituency: "Ijara", ward: "All Wards", locationName: "Masalani Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Masalani Town, Next To Dc's Office", landmark: "Dc's Office", ...getLocationCoordinates("Garissa", 5) },

  // HOMABAY COUNTY
  { id: "PERM-HOMABAY-KASIPUL", county: "Homabay County", constituency: "Kasipul", ward: "All Wards", locationName: "Within Karachuonyo South DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within Karachuonyo South DCC Compound at Kosele Along Oyugis - Kendu Bay Road", landmark: "DCC Compound", ...getLocationCoordinates("Homabay", 0) },
  { id: "PERM-HOMABAY-KABONDOKASIPUL", county: "Homabay County", constituency: "Kabondo Kasipul", ward: "All Wards", locationName: "At Kadongo Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "At Kadongo Centre Along Kisii - Kisumu Road", landmark: "Kadongo Centre", ...getLocationCoordinates("Homabay", 1) },
  { id: "PERM-HOMABAY-KARACHUONYO", county: "Homabay County", constituency: "Karachuonyo", ward: "All Wards", locationName: "Within Rachuonyo North DCC Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within Rachuonyo North DCC Complex at Kamodi along Kendubay Oyugi Road", landmark: "DCC Complex", ...getLocationCoordinates("Homabay", 2) },
  { id: "PERM-HOMABAY-RANGWE", county: "Homabay County", constituency: "Rangwe", ward: "All Wards", locationName: "Within New Rangwe DCC's Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within New Rangwe DCC's Complex aLong Oyugis - Rangwe - Homabay Road", landmark: "DCC's Complex", ...getLocationCoordinates("Homabay", 3) },
  { id: "PERM-HOMABAY-HOMABAYTOWN", county: "Homabay County", constituency: "Homa Bay Town", ward: "All Wards", locationName: "Behind CC's Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind CC's Complex in Homabay Town", landmark: "CC's Complex", ...getLocationCoordinates("Homabay", 4) },
  { id: "PERM-HOMABAY-NDHIWA", county: "Homabay County", constituency: "Ndhiwa", ward: "All Wards", locationName: "Within Ndhiwa Sub County DCC Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within Ndhiwa Sub County DCC Complex Along Ndhiwa Sori Road", landmark: "DCC Complex", ...getLocationCoordinates("Homabay", 5) },
  { id: "PERM-HOMABAY-SUBANORTH", county: "Homabay County", constituency: "Suba North", ward: "All Wards", locationName: "Inside Suba North Sub County Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Inside Suba North Sub County Compound along Mbita - Rusinga Road", landmark: "Sub County Compound", ...getLocationCoordinates("Homabay", 6) },
  { id: "PERM-HOMABAY-SUBASOUTH", county: "Homabay County", constituency: "Suba South", ward: "All Wards", locationName: "At Magunga Trading Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "At Magunga Trading Centre along Kiabuya - Magunga - Sindo Road", landmark: "Magunga Trading Centre", ...getLocationCoordinates("Homabay", 7) },

  // ISIOLO COUNTY
  { id: "PERM-ISIOLO-ISIOLOnorth", county: "Isiolo County", constituency: "Isiolo North", ward: "All Wards", locationName: "Isiolo Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Isiolo Town", landmark: "Opposite Isiolo County Assembly", ...getLocationCoordinates("Isiolo", 0) },
  { id: "PERM-ISIOLO-ISIOLOSOUTH", county: "Isiolo County", constituency: "Isiolo South", ward: "All Wards", locationName: "Garbatulla Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Garbatulla Town", landmark: "Garbatulla Catholic Mission", ...getLocationCoordinates("Isiolo", 1) },

  // KAJIADO COUNTY
  { id: "PERM-KAJIADO-KAJIADONS", county: "Kajiado County", constituency: "Kajiado North", ward: "All Wards", locationName: "Ngong DCC Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ngong DCC Office", landmark: "Ngong DCC Office", ...getLocationCoordinates("Kajiado", 0) },
  { id: "PERM-KAJIADO-KAJIADOCS", county: "Kajiado County", constituency: "Kajiado Central", ward: "All Wards", locationName: "Ack Tenebo House", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ack Tenebo House", landmark: "Kajiado Total Petrol Station", ...getLocationCoordinates("Kajiado", 1) },
  { id: "PERM-KAJIADO-KAJIADES", county: "Kajiado County", constituency: "Kajiado East", ward: "All Wards", locationName: "Isinya Multi-Purpose", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Isinya Multi-Purpose", landmark: "Moi Girls High School Isinya", ...getLocationCoordinates("Kajiado", 2) },
  { id: "PERM-KAJIADO-KAJIADOWS", county: "Kajiado County", constituency: "Kajiado West", ward: "All Wards", locationName: "St Mary's Catholic Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "St Mary's Catholic Church-Kiserian", landmark: "St Mary's Catholic Church-Kiserian", ...getLocationCoordinates("Kajiado", 3) },
  { id: "PERM-KAJIADO-KAJIADOSS", county: "Kajiado County", constituency: "Kajiado South", ward: "All Wards", locationName: "Kajiado County Government Revenue Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kajiado County Government Revenue Office", landmark: "Loitoktok DCC Office", ...getLocationCoordinates("Kajiado", 4) },

  // KAKAMEGA COUNTY
  { id: "PERM-KAKAMEGA-LUGARI", county: "Kakamega County", constituency: "Lugari", ward: "All Wards", locationName: "Lumakanda Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Lumakanda Centre", landmark: "Lumakanda P.A.G. Church", ...getLocationCoordinates("Kakamega", 0) },
  { id: "PERM-KAKAMEGA-LIKUYANI", county: "Kakamega County", constituency: "Likuyani", ward: "All Wards", locationName: "At PAG Kongoni Church Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "At PAG Kongoni Church Compound", landmark: "Next to Likuyani Sub-County Offices", ...getLocationCoordinates("Kakamega", 1) },
  { id: "PERM-KAKAMEGA-MALAVA", county: "Kakamega County", constituency: "Malava", ward: "All Wards", locationName: "Malava Friends Church Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Malava Friends Church Compound.", landmark: "Malava Boys High School", ...getLocationCoordinates("Kakamega", 2) },
  { id: "PERM-KAKAMEGA-LURAMBI", county: "Kakamega County", constituency: "Lurambi", ward: "All Wards", locationName: "Post Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Post Office", landmark: "Huduma Center", ...getLocationCoordinates("Kakamega", 3) },
  { id: "PERM-KAKAMEGA-NAVAKHOLO", county: "Kakamega County", constituency: "Navakholo", ward: "All Wards", locationName: "Opposite Dowa Filling Station", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Opposite Dowa Filling Station along Navakholo - Chebuyusi High School Road", landmark: "Dowa Filling Station", ...getLocationCoordinates("Kakamega", 4) },
  { id: "PERM-KAKAMEGA-MUMIASWEST", county: "Kakamega County", constituency: "Mumias West", ward: "All Wards", locationName: "ACK Guest House", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "ACK Guest House", landmark: "ACK Church Complex", ...getLocationCoordinates("Kakamega", 5) },
  { id: "PERM-KAKAMEGA-MUMIASEAST", county: "Kakamega County", constituency: "Mumias East", ward: "All Wards", locationName: "Moco Buildings", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Moco Buildings-Shianda", landmark: "Shianda Catholic Church", ...getLocationCoordinates("Kakamega", 6) },
  { id: "PERM-KAKAMEGA-MATUNGU", county: "Kakamega County", constituency: "Matungu", ward: "All Wards", locationName: "Matungu Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Matungu Market, along Matungu - Kholera Road", landmark: "Matungu Deputy County Commissioner's", ...getLocationCoordinates("Kakamega", 7) },
  { id: "PERM-KAKAMEGA-BUTERE", county: "Kakamega County", constituency: "Butere", ward: "All Wards", locationName: "Butere DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Butere DCC Compound Next to Kenya Forest Service Office, along Sabatia Shiatsala Road", landmark: "Deputy County Commissioner's Office", ...getLocationCoordinates("Kakamega", 8) },
  { id: "PERM-KAKAMEGA-KHWISERO", county: "Kakamega County", constituency: "Khwisero", ward: "All Wards", locationName: "Within DCC's Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within DCC's Offices", landmark: "DCC's Office", ...getLocationCoordinates("Kakamega", 9) },
  { id: "PERM-KAKAMEGA-SHINYALU", county: "Kakamega County", constituency: "Shinyalu", ward: "All Wards", locationName: "Shinyalu Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Shinyalu Market", landmark: "St.Acquinas Teachers College", ...getLocationCoordinates("Kakamega", 10) },
  { id: "PERM-KAKAMEGA-IKOLOMANI", county: "Kakamega County", constituency: "Ikolomani", ward: "All Wards", locationName: "Sub-County Registrar of Persons Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Sub-County Registrar of Persons Office", landmark: "Malinya Primary School", ...getLocationCoordinates("Kakamega", 11) },

  // KERICHO COUNTY
  { id: "PERM-KERICHO-AINAMOI", county: "Kericho County", constituency: "Ainamoi", ward: "All Wards", locationName: "County Commissioner's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "County Commissioner's Compound", landmark: "Behind Administration Police and Children's Dept. Office", ...getLocationCoordinates("Kericho", 0) },
  { id: "PERM-KERICHO-BURETI", county: "Kericho County", constituency: "Bureti", ward: "All Wards", locationName: "Litein Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Litein Town, Patnas Plaza", landmark: "Patnas Plaza", ...getLocationCoordinates("Kericho", 1) },
  { id: "PERM-KERICHO-BELGUT", county: "Kericho County", constituency: "Belgut", ward: "All Wards", locationName: "Rev. Temuga Plaza", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Rev. Temuga Plaza", landmark: "Opposite DCC Office", ...getLocationCoordinates("Kericho", 2) },
  { id: "PERM-KERICHO-SIGOWETSOIN", county: "Kericho County", constituency: "Sigowet Soin", ward: "All Wards", locationName: "Soko Huru Center", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Soko Huru Center", landmark: "Inside Police Post Compound", ...getLocationCoordinates("Kericho", 3) },
  { id: "PERM-KERICHO-KIPKELIONEAST", county: "Kericho County", constituency: "Kipkelion East", ward: "All Wards", locationName: "Within Londian Post Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within Londian Post Office Compount", landmark: "Londian Post Office", ...getLocationCoordinates("Kericho", 4) },
  { id: "PERM-KERICHO-KIPKELIONWEST", county: "Kericho County", constituency: "Kipkelion West", ward: "All Wards", locationName: "Posta Kenya Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Posta Kenya Building Kipkelion Town", landmark: "Kipkellion Post Office", ...getLocationCoordinates("Kericho", 5) },

  // KIAMBU COUNTY
  { id: "PERM-KIAMBU-GATUNDUSOUTH", county: "Kiambu County", constituency: "Gatundu South", ward: "All Wards", locationName: "DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound", landmark: "Gatundu Level 5 Hospital", ...getLocationCoordinates("Kiambu", 0) },
  { id: "PERM-KIAMBU-GATUNDUNORTH", county: "Kiambu County", constituency: "Gatundu North", ward: "All Wards", locationName: "Kamwangi", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kamwangi", landmark: "DCC Office Kamwangi", ...getLocationCoordinates("Kiambu", 1) },
  { id: "PERM-KIAMBU-JUJA", county: "Kiambu County", constituency: "Juja", ward: "All Wards", locationName: "Menja Vision Plaza", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Menja Vision Plaza", landmark: "Behind Agakhan Hospital", ...getLocationCoordinates("Kiambu", 2) },
  { id: "PERM-KIAMBU-THIKATN", county: "Kiambu County", constituency: "Thika Town", ward: "All Wards", locationName: "Afc Building Thika", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Afc Building Thika", landmark: "Buffalo Grill & Butchery", ...getLocationCoordinates("Kiambu", 3) },
  { id: "PERM-KIAMBU-RUIRU", county: "Kiambu County", constituency: "Ruiru", ward: "All Wards", locationName: "Ruiru Law Courts", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ruiru Law Courts", landmark: "Ruiru Law Courts", ...getLocationCoordinates("Kiambu", 4) },
  { id: "PERM-KIAMBU-GITHUNGURI", county: "Kiambu County", constituency: "Githunguri", ward: "All Wards", locationName: "DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound", landmark: "DCC Offices", ...getLocationCoordinates("Kiambu", 5) },
  { id: "PERM-KIAMBU-KIAMBUTOWN", county: "Kiambu County", constituency: "Kiambu", ward: "All Wards", locationName: "Kiambu Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kiambu Town-Mapa House 4th Floor", landmark: "National Bank", ...getLocationCoordinates("Kiambu", 6) },
  { id: "PERM-KIAMBU-KIAMBAA", county: "Kiambu County", constituency: "Kiambaa", ward: "All Wards", locationName: "Kiambaa Subcounty DCC Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kiambaa Subcounty DCC Office Compoud", landmark: "Kiambaa Subcounty DCC Building (Orange)", ...getLocationCoordinates("Kiambu", 7) },
  { id: "PERM-KIAMBU-KABETE", county: "Kiambu County", constituency: "Kabete", ward: "All Wards", locationName: "Kabete Sub County Government Premises", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kabete Sub County Government Premises. Next To Wangige Chief's Office", landmark: "Wangige Sub County Hospital", ...getLocationCoordinates("Kiambu", 8) },
  { id: "PERM-KIAMBU-KIKUYU", county: "Kiambu County", constituency: "Kikuyu", ward: "All Wards", locationName: "Kikuyu Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kikuyu Town", landmark: "K-Unity Bank", ...getLocationCoordinates("Kiambu", 9) },
  { id: "PERM-KIAMBU-LIMURU", county: "Kiambu County", constituency: "Limuru", ward: "All Wards", locationName: "Directorate Of Public Works", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Directorate Of Public Works-Limuru", landmark: "Limuru Law Courts", ...getLocationCoordinates("Kiambu", 10) },
  { id: "PERM-KIAMBU-LARI", county: "Kiambu County", constituency: "Lari", ward: "All Wards", locationName: "Kimende Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Along Nairobi - Nakuru Highway, Within Kimende Town At K-Unity Sacco Bulding On The First Floor Using Safaricom Shop Entrance.", landmark: "Kimende Town", ...getLocationCoordinates("Kiambu", 11) },

  // KILIFI COUNTY
  { id: "PERM-KILIFI-KILIFNORTH", county: "Kilifi County", constituency: "Kilifi North", ward: "All Wards", locationName: "Next To Huduma Centre Kilifi", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Next To Huduma Centre Kilifi", landmark: "Kilifi Bridge", ...getLocationCoordinates("Kilifi", 0) },
  { id: "PERM-KILIFI-KILIFSOUTH", county: "Kilifi County", constituency: "Kilifi South", ward: "All Wards", locationName: "Majengo Kanamai", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Majengo Kanamai", landmark: "Matatu Terminus - Majengo Kanamai", ...getLocationCoordinates("Kilifi", 1) },
  { id: "PERM-KILIFI-KALOLENI", county: "Kilifi County", constituency: "Kaloleni", ward: "All Wards", locationName: "Adjacent To St.Johns Girls Sec. School", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Adjacent To St.Johns Girls Sec. School", landmark: "Ack Church Kaloleni", ...getLocationCoordinates("Kilifi", 2) },
  { id: "PERM-KILIFI-RABAI", county: "Kilifi County", constituency: "Rabai", ward: "All Wards", locationName: "Shikaadabu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Shikaadabu", landmark: "Cdf Office/Shikaadabu Dispensary", ...getLocationCoordinates("Kilifi", 3) },
  { id: "PERM-KILIFI-GANZE", county: "Kilifi County", constituency: "Ganze", ward: "All Wards", locationName: "Ganze Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ganze Town", landmark: "Ganze Sub-County Police Hq.", ...getLocationCoordinates("Kilifi", 4) },
  { id: "PERM-KILIFI-MALINDI", county: "Kilifi County", constituency: "Malindi", ward: "All Wards", locationName: "Maweni Area - Near Judo", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maweni Area - Near Judo", landmark: "Malindi Sub-County Hospital", ...getLocationCoordinates("Kilifi", 5) },
  { id: "PERM-KILIFI-MAGARINI", county: "Kilifi County", constituency: "Magarini", ward: "All Wards", locationName: "Near Mwembe Resort", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Near Mwembe Resort", landmark: "Mwembe Resort", ...getLocationCoordinates("Kilifi", 6) },

  // KIRINYAGA COUNTY
  { id: "PERM-KIRINYAGA-MWEA", county: "Kirinyaga County", constituency: "Mwea", ward: "All Wards", locationName: "County Council Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "County Council Offices Wanguru", landmark: "Wanguru Police Station", ...getLocationCoordinates("Kirinyaga", 0) },
  { id: "PERM-KIRINYAGA-GICHUGU", county: "Kirinyaga County", constituency: "Gichugu", ward: "All Wards", locationName: "All Saints Kianyaga ACK", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "All Saints Kianyaga ACK", landmark: "Raimu Primary School", ...getLocationCoordinates("Kirinyaga", 1) },
  { id: "PERM-KIRINYAGA-NDIA", county: "Kirinyaga County", constituency: "Ndia", ward: "All Wards", locationName: "Baricho Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Baricho Town", landmark: "A.C.K St Philips - Baricho", ...getLocationCoordinates("Kirinyaga", 2) },
  { id: "PERM-KIRINYAGA-KIRINYAGACENTRAL", county: "Kirinyaga County", constituency: "Kirinyaga Central", ward: "All Wards", locationName: "Kerugoya Municipal Council", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kerugoya Municipal Council Offices", landmark: "Kerugoya Police Station/Kerugoya State Lodge", ...getLocationCoordinates("Kirinyaga", 3) },
  { id: "PERM-KIRINYAGA-COUNTYOFFICE", county: "Kirinyaga County", constituency: "County Office", ward: "All Wards", locationName: "Professional Plaza", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Professional Plaza 3rd Floor", landmark: "Judiciary Kerugoya High Court", ...getLocationCoordinates("Kirinyaga", 4) },

  // KISII COUNTY
  { id: "PERM-KISII-BONCHARI", county: "Kisii County", constituency: "Bonchari", ward: "All Wards", locationName: "Suneka Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Suneka Market", landmark: "Itierio Boys High School", ...getLocationCoordinates("Kisii", 0) },
  { id: "PERM-KISII-SOUTHMUGIRANGO", county: "Kisii County", constituency: "South Mugirango", ward: "All Wards", locationName: "Nyamarambe", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nyamarambe", landmark: "DCC's Office", ...getLocationCoordinates("Kisii", 1) },
  { id: "PERM-KISII-BOMABOGARABU", county: "Kisii County", constituency: "Bomachoge Borabu", ward: "All Wards", locationName: "Kenyanya Market Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kenyanya Market Centre", landmark: "DCC's Office", ...getLocationCoordinates("Kisii", 2) },
  { id: "PERM-KISII-BOBASI", county: "Kisii County", constituency: "Bobasi", ward: "All Wards", locationName: "Itumbe", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Itumbe", landmark: "DCC's Office", ...getLocationCoordinates("Kisii", 3) },
  { id: "PERM-KISII-BOMAACHACHE", county: "Kisii County", constituency: "Bomachoge Chache", ward: "All Wards", locationName: "Ogembo", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ogembo", landmark: "DCC's Office", ...getLocationCoordinates("Kisii", 4) },
  { id: "PERM-KISII-NYARIBARIMAS", county: "Kisii County", constituency: "Nyaribari Masaba", ward: "All Wards", locationName: "Masimba", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Masimba", landmark: "DCC's Office", ...getLocationCoordinates("Kisii", 5) },
  { id: "PERM-KISII-NYARIBARICHES", county: "Kisii County", constituency: "Nyaribari Chache", ward: "All Wards", locationName: "Kisii town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kisii town", landmark: "County Commissioner's Office", ...getLocationCoordinates("Kisii", 6) },
  { id: "PERM-KISII-KITUTUCHES", county: "Kisii County", constituency: "Kitutu Chache North", ward: "All Wards", locationName: "Marani Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Marani Centre", landmark: "Marani Sub-County Office", ...getLocationCoordinates("Kisii", 7) },
  { id: "PERM-KISII-KITUUCHESS", county: "Kisii County", constituency: "Kitutu Chache South", ward: "All Wards", locationName: "Kisii town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kisii town", landmark: "County Commissioner's Office", ...getLocationCoordinates("Kisii", 8) },

  // KISUMU COUNTY
  { id: "PERM-KISUMU-NYANDO", county: "Kisumu County", constituency: "Nyando", ward: "All Wards", locationName: "Awasi DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Awasi DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Kisumu", 0) },
  { id: "PERM-KISUMU-MUHORONI", county: "Kisumu County", constituency: "Muhoroni", ward: "All Wards", locationName: "Awasi Opposite Pawtenge Primary", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Awasi Opposite Pawtenge Primary", landmark: "Pawtenge Primary", ...getLocationCoordinates("Kisumu", 1) },
  { id: "PERM-KISUMU-NYAKACH", county: "Kisumu County", constituency: "Nyakach", ward: "All Wards", locationName: "Pap Onditi DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Pap Onditi DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Kisumu", 2) },
  { id: "PERM-KISUMU-SEME", county: "Kisumu County", constituency: "Seme", ward: "All Wards", locationName: "Kombewa DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kombewa DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Kisumu", 3) },
  { id: "PERM-KISUMU-KISUMUWEST", county: "Kisumu County", constituency: "Kisumu West", ward: "All Wards", locationName: "DCCs office block", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCCs office block opposite the new DCCs/Huduma centre and CDF office blocks at Ojola", landmark: "Huduma centre", ...getLocationCoordinates("Kisumu", 4) },
  { id: "PERM-KISUMU-KISUMUEAST", county: "Kisumu County", constituency: "Kisumu East", ward: "All Wards", locationName: "Mamboleo Show Ground", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mamboleo Show Ground", landmark: "Show Ground", ...getLocationCoordinates("Kisumu", 5) },
  { id: "PERM-KISUMU-KISUMUCENTRAL", county: "Kisumu County", constituency: "Kisumu Central", ward: "All Wards", locationName: "Huduma Centre Wing C Ground Floor", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Huduma Centre Wing C Ground Floor", landmark: "Huduma Centre", ...getLocationCoordinates("Kisumu", 6) },

  // KITUI COUNTY
  { id: "PERM-KITUI-MWINGINORTH", county: "Kitui County", constituency: "Mwingi North", ward: "All Wards", locationName: "Kyuso Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kyuso Town", landmark: "Behind Equity Bank", ...getLocationCoordinates("Kitui", 0) },
  { id: "PERM-KITUI-MWINGIWEST", county: "Kitui County", constituency: "Mwingi West", ward: "All Wards", locationName: "Migwani market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Migwani market - inside DCC Office Complex", landmark: "Baraza Park", ...getLocationCoordinates("Kitui", 1) },
  { id: "PERM-KITUI-MWINGICENTRAL", county: "Kitui County", constituency: "Mwingi Central", ward: "All Wards", locationName: "Mwingi Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mwingi Town Opposite NCPB Mwingi Depot", landmark: "National Cereals and Produce Board (NCPB) Mwingi Depot", ...getLocationCoordinates("Kitui", 2) },
  { id: "PERM-KITUI-KITUIWEST", county: "Kitui County", constituency: "Kitui West", ward: "All Wards", locationName: "Matinyani", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Matinyani", landmark: "Matinyani DCC Offices", ...getLocationCoordinates("Kitui", 3) },
  { id: "PERM-KITUI-KITUIRURAL", county: "Kitui County", constituency: "Kitui Rural", ward: "All Wards", locationName: "Kwa Vonza Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kwa Vonza Town", landmark: "Kitui Rural CDF Building", ...getLocationCoordinates("Kitui", 4) },
  { id: "PERM-KITUI-KITUICENTRAL", county: "Kitui County", constituency: "Kitui Central", ward: "All Wards", locationName: "Along DCC - Kitui Hospital Road", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Along DCC - Kitui Hospital Road, opposite Kafoca Hotel", landmark: "Kafoca Hotel", ...getLocationCoordinates("Kitui", 5) },
  { id: "PERM-KITUI-KITUIEAST", county: "Kitui County", constituency: "Kitui East", ward: "All Wards", locationName: "Zombe Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Zombe Town", landmark: "Zombe Police Station", ...getLocationCoordinates("Kitui", 6) },
  { id: "PERM-KITUI-KITUISOUTH", county: "Kitui County", constituency: "Kitui South", ward: "All Wards", locationName: "Ikutha Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ikutha Town", landmark: "Opposite Registry Office", ...getLocationCoordinates("Kitui", 7) },

  // KWALE COUNTY
  { id: "PERM-KWALE-MSAMBWENI", county: "Kwale County", constituency: "Msambweni", ward: "All Wards", locationName: "Msambweni Dcc's Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Msambweni Dcc's Office Compound", landmark: "Subcounty Headquarters of Msambweni", ...getLocationCoordinates("Kwale", 0) },
  { id: "PERM-KWALE-LUNGALUNGA", county: "Kwale County", constituency: "Lungalunga", ward: "All Wards", locationName: "Mbuyuni Area", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mbuyuni Area Next to Rafiki Yetu Building", landmark: "Mnarani (Communication Mast)", ...getLocationCoordinates("Kwale", 1) },
  { id: "PERM-KWALE-MATUGA", county: "Kwale County", constituency: "Matuga", ward: "All Wards", locationName: "IEBC Offices, Kwale Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "IEBC Offices, Kwale Town, Opposite Ministry of Information Offices", landmark: "Baraza Park, Kwale Town", ...getLocationCoordinates("Kwale", 2) },
  { id: "PERM-KWALE-KINANGO", county: "Kwale County", constituency: "Kinango", ward: "All Wards", locationName: "Bebora Plaza, 3rd Floor", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bebora Plaza, 3rd Floor, Kinango Town", landmark: "Chief's Office Kinango Town", ...getLocationCoordinates("Kwale", 3) },

  // LAIKIPIA COUNTY
  { id: "PERM-LAIKIPIA-LAIKIPIAW", county: "Laikipia County", constituency: "Laikipia West", ward: "All Wards", locationName: "Telkom Building Nyahururu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Telkom Building Nyahururu Town", landmark: "Nyahururu Law Courts", ...getLocationCoordinates("Laikipia", 0) },
  { id: "PERM-LAIKIPIA-LAIKIPIASE", county: "Laikipia County", constituency: "Laikipia East", ward: "All Wards", locationName: "Laikipia County Commissioners Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Laikipia County Commissioners Compound Nanyuki", landmark: "County Commissioners Office", ...getLocationCoordinates("Laikipia", 1) },
  { id: "PERM-LAIKIPIA-LAIKIPIASN", county: "Laikipia County", constituency: "Laikipia North", ward: "All Wards", locationName: "Doldol Catholic Parish Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Doldol Catholic Parish Compound", landmark: "Doldol Catholic Church", ...getLocationCoordinates("Laikipia", 2) },

  // LAMU COUNTY
  { id: "PERM-LAMU-LAMUEAST", county: "Lamu County", constituency: "Lamu East", ward: "All Wards", locationName: "Batuli Mudh-hir Haji Building - Faza", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Batuli Mudh-hir Haji Building - Faza", landmark: "Post Office - Faza", ...getLocationCoordinates("Lamu", 0) },
  { id: "PERM-LAMU-LAMUWEST", county: "Lamu County", constituency: "Lamu West", ward: "All Wards", locationName: "Ministry of Housing Office Building - Mokowe", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ministry of Housing Office Building - Mokowe", landmark: "Public Work Office - Mokowe", ...getLocationCoordinates("Lamu", 1) },

  // MACHAKOS COUNTY
  { id: "PERM-MACHAKOS-MASINGA", county: "Machakos County", constituency: "Masinga", ward: "All Wards", locationName: "Masinga Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Masinga Town Opposite MULKAS petrol station", landmark: "MULKAS petrol station", ...getLocationCoordinates("Machakos", 0) },
  { id: "PERM-MACHAKOS-YATTA", county: "Machakos County", constituency: "Yatta", ward: "All Wards", locationName: "Kithimani", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "National Cereals and Produce Board Compound - Kithimani,Yatta", landmark: "NCPB Compound", ...getLocationCoordinates("Machakos", 1) },
  { id: "PERM-MACHAKOS-KANGUNDO", county: "Machakos County", constituency: "Kangundo", ward: "All Wards", locationName: "Ministry Of Works Bulding", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ministry Of Works Bulding,Opposite Kangundo General Hospital", landmark: "Kangundo General Hospital", ...getLocationCoordinates("Machakos", 2) },
  { id: "PERM-MACHAKOS-MATUNGULU", county: "Machakos County", constituency: "Matungulu", ward: "All Wards", locationName: "Kangundo Junior School", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kangundo Junior School Within Tala Town", landmark: "Tala Town", ...getLocationCoordinates("Machakos", 3) },
  { id: "PERM-MACHAKOS-KATHIANI", county: "Machakos County", constituency: "Kathiani", ward: "All Wards", locationName: "DCCs Office block", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCCs Office block", landmark: "DCC Office", ...getLocationCoordinates("Machakos", 4) },
  { id: "PERM-MACHAKOS-MAVOKO", county: "Machakos County", constituency: "Mavoko", ward: "All Wards", locationName: "DCC Office Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Office Compound in Athi River", landmark: "Athi River", ...getLocationCoordinates("Machakos", 5) },
  { id: "PERM-MACHAKOS-MACHAKOSTN", county: "Machakos County", constituency: "Machakos Town", ward: "All Wards", locationName: "IEBC County Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "IEBC County Offices compound,behind Department of Education, Skills &Trainning office, Mwatu wa Ngoma Street", landmark: "Department of Education", ...getLocationCoordinates("Machakos", 6) },
  { id: "PERM-MACHAKOS-MWALA", county: "Machakos County", constituency: "Mwala", ward: "All Wards", locationName: "Makutano ya Mwala", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Makutano ya Mwala Shopping centre Adjascent to Makutano Police Patrol Base", landmark: "Makutano Police Patrol Base", ...getLocationCoordinates("Machakos", 7) },

  // MAKUENI COUNTY
  { id: "PERM-MAKUENI-MBOONI", county: "Makueni County", constituency: "Mbooni", ward: "All Wards", locationName: "Tawa Social Hall", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Tawa Social Hall", landmark: "Tawa Law Courts", ...getLocationCoordinates("Makueni", 0) },
  { id: "PERM-MAKUENI-KILOME", county: "Makueni County", constituency: "Kilome", ward: "All Wards", locationName: "Kwa DC (Malili)", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kwa DC (Malili)", landmark: "Konza City (Malili)", ...getLocationCoordinates("Makueni", 1) },
  { id: "PERM-MAKUENI-KAITI", county: "Makueni County", constituency: "Kaiti", ward: "All Wards", locationName: "Mukuyuni Shopping Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mukuyuni Shopping Centre (CDF Compound)", landmark: "Mukuyuni Police Station", ...getLocationCoordinates("Makueni", 2) },
  { id: "PERM-MAKUENI-MAKUENI", county: "Makueni County", constituency: "Makueni", ward: "All Wards", locationName: "Wote (Chief's Camp)", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Wote (Chief's Camp)", landmark: "Makueni Subcounty Hospital", ...getLocationCoordinates("Makueni", 3) },
  { id: "PERM-MAKUENI-KIBWEZIWEST", county: "Makueni County", constituency: "Kibwezi West", ward: "All Wards", locationName: "Makindu Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Makindu Town", landmark: "DCCs Office", ...getLocationCoordinates("Makueni", 4) },
  { id: "PERM-MAKUENI-KIBWEZIEAST", county: "Makueni County", constituency: "Kibwezi East", ward: "All Wards", locationName: "Kambu Lutheran Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kambu Lutheran Church", landmark: "Kambu Sub County (Ministry of Interior Office)", ...getLocationCoordinates("Makueni", 5) },

  // MANDERA COUNTY
  { id: "PERM-MANDERA-BANISSA", county: "Mandera County", constituency: "Banissa", ward: "All Wards", locationName: "Banissa Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Banissa Town, Along Banissa-Rhamu Road", landmark: "Next to Malkamari Hotel", ...getLocationCoordinates("Mandera", 0) },
  { id: "PERM-MANDERA-MANWEST", county: "Mandera County", constituency: "Mandera West", ward: "All Wards", locationName: "Opposite Takaba Primary Main Gate", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Opposite Takaba Primary Main Gate", landmark: "Takaba Primary School", ...getLocationCoordinates("Mandera", 1) },
  { id: "PERM-MANDERA-MANNORTH", county: "Mandera County", constituency: "Mandera North", ward: "All Wards", locationName: "Inside Mandera North DCC's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Inside Mandera North DCC's Compound", landmark: "DCC Compound-Mandera North", ...getLocationCoordinates("Mandera", 2) },
  { id: "PERM-MANDERA-MANSOUTH", county: "Mandera County", constituency: "Mandera South", ward: "All Wards", locationName: "Elwak CBD", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Elwak CBD Along Elwak-Wajir Road", landmark: "Dido Petrol Station", ...getLocationCoordinates("Mandera", 3) },
  { id: "PERM-MANDERA-MANEAST", county: "Mandera County", constituency: "Mandera East", ward: "All Wards", locationName: "Off Suftu Road", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Off Suftu Road Behind Blue Light Petrol Station", landmark: "Blue Light Petrol Station", ...getLocationCoordinates("Mandera", 4) },
  { id: "PERM-MANDERA-LAFEY", county: "Mandera County", constituency: "Lafey", ward: "All Wards", locationName: "Lafey Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Lafey Town", landmark: "Next To Lafey Primary School", ...getLocationCoordinates("Mandera", 5) },

  // MARSABIT COUNTY
  { id: "PERM-MARSABIT-MOYALE", county: "Marsabit County", constituency: "Moyale", ward: "All Wards", locationName: "ACK Moyale", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "ACK Moyale", landmark: "St. Paul Training Center", ...getLocationCoordinates("Marsabit", 0) },
  { id: "PERM-MARSABIT-NORTHHORR", county: "Marsabit County", constituency: "North Horr", ward: "All Wards", locationName: "Nyota Self Help Group North Horr", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nyota Self Help Group North Horr", landmark: "Adjacent to AP Camp", ...getLocationCoordinates("Marsabit", 1) },
  { id: "PERM-MARSABIT-SAKU", county: "Marsabit County", constituency: "Saku", ward: "All Wards", locationName: "ACK Saku Offices Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "ACK Saku Offices Building", landmark: "St. Peter Cathedral", ...getLocationCoordinates("Marsabit", 2) },
  { id: "PERM-MARSABIT-LAISAMIS", county: "Marsabit County", constituency: "Laisamis", ward: "All Wards", locationName: "DCC Office Laisamis", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Office Laisamis", landmark: "DCC Office", ...getLocationCoordinates("Marsabit", 3) },

  // MERU COUNTY
  { id: "PERM-MERU-BUURI", county: "Meru County", constituency: "Buuri", ward: "All Wards", locationName: "Timau", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Timau", landmark: "DCC Buuri West Office", ...getLocationCoordinates("Meru", 0) },
  { id: "PERM-MERU-IGEMBECENTRAL", county: "Meru County", constituency: "Igembe Central", ward: "All Wards", locationName: "Kangeta", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kangeta", landmark: "DCC Office", ...getLocationCoordinates("Meru", 1) },
  { id: "PERM-MERU-IGEMBENORTH", county: "Meru County", constituency: "Igembe North", ward: "All Wards", locationName: "Laare", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Laare", landmark: "Shell Petrol Station (Kajuko Centre)", ...getLocationCoordinates("Meru", 2) },
  { id: "PERM-MERU-TIGANIAWEST", county: "Meru County", constituency: "Tigania West", ward: "All Wards", locationName: "Kianjai Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kianjai Town", landmark: "Kianjai National Bank", ...getLocationCoordinates("Meru", 3) },
  { id: "PERM-MERU-TIGANIAEAST", county: "Meru County", constituency: "Tigania East", ward: "All Wards", locationName: "Muriri DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Muriri DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Meru", 4) },
  { id: "PERM-MERU-NORTHIMENTI", county: "Meru County", constituency: "North Imenti", ward: "All Wards", locationName: "Meru Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Meru Town", landmark: "Meru Huduma Center", ...getLocationCoordinates("Meru", 5) },
  { id: "PERM-MERU-IGEMIBESOUTH", county: "Meru County", constituency: "Igembe South", ward: "All Wards", locationName: "Maua Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maua Town", landmark: "Maua Police Station", ...getLocationCoordinates("Meru", 6) },
  { id: "PERM-MERU-CENTRALIMENTI", county: "Meru County", constituency: "Central Imenti", ward: "All Wards", locationName: "Gatimbi Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Gatimbi Market", landmark: "Equator Signpost", ...getLocationCoordinates("Meru", 7) },
  { id: "PERM-MERU-SOUTHIMENTI", county: "Meru County", constituency: "South Imenti", ward: "All Wards", locationName: "Nkubu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nkubu", landmark: "Consolata Hospital Nkubu", ...getLocationCoordinates("Meru", 8) },

  // MIGORI COUNTY
  { id: "PERM-MIGORI-RONGO", county: "Migori County", constituency: "Rongo", ward: "All Wards", locationName: "Rongo Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Rongo Town", landmark: "DCC Office Rongo sub County", ...getLocationCoordinates("Migori", 0) },
  { id: "PERM-MIGORI-AWENDO", county: "Migori County", constituency: "Awendo", ward: "All Wards", locationName: "Awendo Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Awendo Town", landmark: "NCPB Awendo", ...getLocationCoordinates("Migori", 1) },
  { id: "PERM-MIGORI-SUNAEAST", county: "Migori County", constituency: "Suna East", ward: "All Wards", locationName: "Migori Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Migori Town", landmark: "Migori County IEBC Office", ...getLocationCoordinates("Migori", 2) },
  { id: "PERM-MIGORI-SUNAWEST", county: "Migori County", constituency: "Suna West", ward: "All Wards", locationName: "Migori Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Migori Town", landmark: "NCPB / Namba Junction", ...getLocationCoordinates("Migori", 3) },
  { id: "PERM-MIGORI-URIRI", county: "Migori County", constituency: "Uriri", ward: "All Wards", locationName: "Uriri Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Uriri Town", landmark: "DCC officeUriri Sub County", ...getLocationCoordinates("Migori", 4) },
  { id: "PERM-MIGORI-NYATIKE", county: "Migori County", constituency: "Nyatike", ward: "All Wards", locationName: "Macalda Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Macalda Town", landmark: "County Government Office Macalda", ...getLocationCoordinates("Migori", 5) },
  { id: "PERM-MIGORI-KURIAWEST", county: "Migori County", constituency: "Kuria West", ward: "All Wards", locationName: "Kehancha Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kehancha Town", landmark: "Kehancha Law Courts", ...getLocationCoordinates("Migori", 6) },
  { id: "PERM-MIGORI-KURIAEAST", county: "Migori County", constituency: "Kuria East", ward: "All Wards", locationName: "Kegonga Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kegonga Town", landmark: "DCC Office Kuria East Sub County", ...getLocationCoordinates("Migori", 7) },

  // MOMBASA COUNTY
  { id: "PERM-MOMBASA-CHANGAMWE", county: "Mombasa County", constituency: "Changamwe", ward: "All Wards", locationName: "Changamwe firestation", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Changamwe firestation", landmark: "Changamwe firestation", ...getLocationCoordinates("Mombasa", 0) },
  { id: "PERM-MOMBASA-JOMVU", county: "Mombasa County", constituency: "Jomvu", ward: "All Wards", locationName: "Mikindani Police Station", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mikindani Police Station", landmark: "Mikindani Police Station", ...getLocationCoordinates("Mombasa", 1) },
  { id: "PERM-MOMBASA-KISAUNI", county: "Mombasa County", constituency: "Kisauni", ward: "All Wards", locationName: "Bamburi Fisheries", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bamburi Fisheries, Shangaza Estate House 9", landmark: "Supa Loaf Bakery", ...getLocationCoordinates("Mombasa", 2) },
  { id: "PERM-MOMBASA-NYALI", county: "Mombasa County", constituency: "Nyali", ward: "All Wards", locationName: "Chiefs office Kongowea", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Chiefs office Kongowea", landmark: "DCC Nyali's office", ...getLocationCoordinates("Mombasa", 3) },
  { id: "PERM-MOMBASA-LIKONI", county: "Mombasa County", constituency: "Likoni", ward: "All Wards", locationName: "Shika Adabu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Shika Adabu", landmark: "Shika Adabu Chiefs office", ...getLocationCoordinates("Mombasa", 4) },
  { id: "PERM-MOMBASA-MVITA", county: "Mombasa County", constituency: "Mvita", ward: "All Wards", locationName: "Kizingo, Rashid Sajad road", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kizingo, Rashid Sajad road", landmark: "Chef Royale Restaurant", ...getLocationCoordinates("Mombasa", 5) },

  // MURANG'A COUNTY
  { id: "PERM-MURANGA-KANGEMA", county: "Murang'a County", constituency: "Kangema", ward: "All Wards", locationName: "Kangema Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kangema Town", landmark: "DCC's offices", ...getLocationCoordinates("Murang'a", 0) },
  { id: "PERM-MURANGA-MATHIOYA", county: "Murang'a County", constituency: "Mathioya", ward: "All Wards", locationName: "Kiria-Ini Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kiria-Ini Town", landmark: "DCC's offices", ...getLocationCoordinates("Murang'a", 1) },
  { id: "PERM-MURANGA-KIHARU", county: "Murang'a County", constituency: "Kiharu", ward: "All Wards", locationName: "Murang'a - Mukuyu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Murang'a - Mukuyu", landmark: "Along Kenol Murang'a Road, Next To Rubis Petrol Station at Mukuyu", ...getLocationCoordinates("Murang'a", 2) },
  { id: "PERM-MURANGA-KIGUMO", county: "Murang'a County", constituency: "Kigumo", ward: "All Wards", locationName: "Kangari Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kangari Town", landmark: "East End Mall, Building, 3rd Floor. Kangari Town. Muungano Microfinance", ...getLocationCoordinates("Murang'a", 3) },
  { id: "PERM-MURANGA-MARAGWA", county: "Murang'a County", constituency: "Maragwa", ward: "All Wards", locationName: "Makuyu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Makuyu", landmark: "World Vision Block adjudcent to ACC's Office, Makuyu", ...getLocationCoordinates("Murang'a", 4) },
  { id: "PERM-MURANGA-KANDARA", county: "Murang'a County", constituency: "Kandara", ward: "All Wards", locationName: "Kandara Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kandara Town", landmark: "Hurukai House, 2nd Floor Above Amica Sacco, 500 meters from the DCC's office", ...getLocationCoordinates("Murang'a", 5) },
  { id: "PERM-MURANGA-GATANGA", county: "Murang'a County", constituency: "Gatanga", ward: "All Wards", locationName: "Kirwara Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kirwara Town", landmark: "Next to Amica Sacco Building, Ground Floor. Kirwara Town. (Opposite Kirwara Police Station)", ...getLocationCoordinates("Murang'a", 6) },

  // NAIROBI COUNTY
  { id: "PERM-NAIROBI-WESTLANDS", county: "Nairobi County", constituency: "Westlands", ward: "All Wards", locationName: "DC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DC Compound", landmark: "Safaricom Centre", ...getLocationCoordinates("Nairobi", 0) },
  { id: "PERM-NAIROBI-DAGORETTINORTH", county: "Nairobi County", constituency: "Dagoretti North", ward: "All Wards", locationName: "Maliposa Appartments", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maliposa Appartments - Ngong Road", landmark: "Nakumatt Junction", ...getLocationCoordinates("Nairobi", 1) },
  { id: "PERM-NAIROBI-DAGORETTISOUTH", county: "Nairobi County", constituency: "Dagoretti South", ward: "All Wards", locationName: "Maisha Poa Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maisha Poa Centre", landmark: "DCC Office Dagoretti South", ...getLocationCoordinates("Nairobi", 2) },
  { id: "PERM-NAIROBI-LANGATA", county: "Nairobi County", constituency: "Langata", ward: "All Wards", locationName: "Langata Subcounty Headquarters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Langata Subcounty Headquarters Five Star Road,Or Kwa Chief Wilson", landmark: "Five Star Road", ...getLocationCoordinates("Nairobi", 3) },
  { id: "PERM-NAIROBI-KIBRA", county: "Nairobi County", constituency: "Kibra", ward: "All Wards", locationName: "Kibra DC", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kibra DC", landmark: "Adjacent To Huduma Centre", ...getLocationCoordinates("Nairobi", 4) },
  { id: "PERM-NAIROBI-ROYSAMBU", county: "Nairobi County", constituency: "Roysambu", ward: "All Wards", locationName: "Kahawa West Acc's Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kahawa West Acc's Office/Police Station", landmark: "Acc Office/Police Station", ...getLocationCoordinates("Nairobi", 5) },
  { id: "PERM-NAIROBI-KASARANI", county: "Nairobi County", constituency: "Kasarani", ward: "All Wards", locationName: "Former DCC Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Former DCC Offices", landmark: "Chiefs Office Nearby", ...getLocationCoordinates("Nairobi", 6) },
  { id: "PERM-NAIROBI-RUARAKA", county: "Nairobi County", constituency: "Ruaraka", ward: "All Wards", locationName: "Matigari General Merchants", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Matigari General Merchants", landmark: "Lexx Place Hotel", ...getLocationCoordinates("Nairobi", 7) },
  { id: "PERM-NAIROBI-EMBAKASISOUTH", county: "Nairobi County", constituency: "Embakasi South", ward: "All Wards", locationName: "Villa Franca", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Villa Franca", landmark: "Equity Afya Hospital Banner", ...getLocationCoordinates("Nairobi", 8) },
  { id: "PERM-NAIROBI-EMBAKASI-NORTH", county: "Nairobi County", constituency: "Embakasi North", ward: "All Wards", locationName: "Near DCC Office", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Near DCC Office", landmark: "DCC Office", ...getLocationCoordinates("Nairobi", 9) },
  { id: "PERM-NAIROBI-EMBAKASI-CENTRAL", county: "Nairobi County", constituency: "Embakasi Central", ward: "All Wards", locationName: "DO's Office Kayole", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DO's Office Kayole", landmark: "DO's Office Kayole", ...getLocationCoordinates("Nairobi", 10) },
  { id: "PERM-NAIROBI-EMBAKASI-EAST", county: "Nairobi County", constituency: "Embakasi East", ward: "All Wards", locationName: "East Africa School of Aviation", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "East Africa School of Aviation", landmark: "East Africa School of Aviation (EASA)", ...getLocationCoordinates("Nairobi", 11) },
  { id: "PERM-NAIROBI-EMBAKASI-WEST", county: "Nairobi County", constituency: "Embakasi West", ward: "All Wards", locationName: "Tena White House", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Tena White House", landmark: "Foot Bridge Next to Shell Petrol Station Manyanja Road", ...getLocationCoordinates("Nairobi", 12) },
  { id: "PERM-NAIROBI-MAKADARA", county: "Nairobi County", constituency: "Makadara", ward: "All Wards", locationName: "Makadara DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Makadara DCC Compound", landmark: "CIPU Office Makadara", ...getLocationCoordinates("Nairobi", 13) },
  { id: "PERM-NAIROBI-KAMUKUNJI", county: "Nairobi County", constituency: "Kamukunji", ward: "All Wards", locationName: "At DCC Hq Kamukunji", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "At DCC Hq Kamukunji", landmark: "DCC Office", ...getLocationCoordinates("Nairobi", 14) },
  { id: "PERM-NAIROBI-STAREHE", county: "Nairobi County", constituency: "Starehe", ward: "All Wards", locationName: "Kenya Railways Block D", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kenya Railways Block D", landmark: "Opposite Technical University of Kenya", ...getLocationCoordinates("Nairobi", 15) },
  { id: "PERM-NAIROBI-MATHARE", county: "Nairobi County", constituency: "Mathare", ward: "All Wards", locationName: "Mathare DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mathare DCC Compound", landmark: "DCC Office", ...getLocationCoordinates("Nairobi", 16) },
  {
    id: "KIT-NBO-EMB-CENT-KAY-NORTH-01",
    county: "Nairobi County",
    constituency: "Embakasi Central",
    ward: "Kayole North",
    locationName: "Kayole 1 Primary School",
    locationType: "Mobile_Kit",
    operatingHours: "8:00 AM - 5:00 PM",
    landmark: "Primary School Compound",
    schedule: [
      { date: "2026-03-30", hours: "8:00 AM - 5:00 PM" },
      { date: "2026-04-01", hours: "8:00 AM - 5:00 PM" }
    ],
    lat: -1.2950,
    lng: 36.9250
  },
  {
    id: "KIT-NBO-EMB-CENT-KAY-NORTH-02",
    county: "Nairobi County",
    constituency: "Embakasi Central",
    ward: "Kayole North",
    locationName: "Jowematt",
    locationType: "Mobile_Kit",
    operatingHours: "8:00 AM - 5:00 PM",
    landmark: "Jowematt Area",
    schedule: [
      { date: "2026-04-02", hours: "8:00 AM - 5:00 PM" },
      { date: "2026-04-03", hours: "8:00 AM - 5:00 PM" }
    ],
    lat: -1.3050,
    lng: 36.9150
  },
  {
    id: "KIT-NBO-EMB-CENT-KAY-NORTH-03",
    county: "Nairobi County",
    constituency: "Embakasi Central",
    ward: "Kayole North",
    locationName: "Kona Market",
    locationType: "Mobile_Kit",
    operatingHours: "8:00 AM - 5:00 PM",
    landmark: "Kona Market Center",
    schedule: [
      { date: "2026-04-04", hours: "8:00 AM - 5:00 PM" },
      { date: "2026-04-05", hours: "8:00 AM - 5:00 PM" }
    ],
    lat: -1.3100,
    lng: 36.9350
  },
  {
    id: "KIT-NBO-EMB-CENT-KAY-NORTH-04",
    county: "Nairobi County",
    constituency: "Embakasi Central",
    ward: "Kayole North",
    locationName: "Tushauriane Roundabout",
    locationType: "Mobile_Kit",
    operatingHours: "8:00 AM - 5:00 PM",
    landmark: "Tushauriane Roundabout Area",
    schedule: [
      { date: "2026-04-06", hours: "8:00 AM - 5:00 PM" }
    ],
    lat: -1.3080,
    lng: 36.9200
  },

  // NAKURU COUNTY
  { id: "PERM-NAKURU-MOLO", county: "Nakuru County", constituency: "Molo", ward: "All Wards", locationName: "Dcc's Compound - Molo Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Dcc's Compound - Molo Town", landmark: "Dc's Office - Molo Town", ...getLocationCoordinates("Nakuru", 0) },
  { id: "PERM-NAKURU-NJORO", county: "Nakuru County", constituency: "Njoro", ward: "All Wards", locationName: "Aic Church - Compound -Njoro", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Aic Church - Compound -Njoro", landmark: "Aic Church - Njoro", ...getLocationCoordinates("Nakuru", 1) },
  { id: "PERM-NAKURU-NAIVASHA", county: "Nakuru County", constituency: "Naivasha", ward: "All Wards", locationName: "Dcc's Compound - Near Naivasha Police Station", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Dcc's Compound - Near Naivasha Police Station", landmark: "Naivasha Police Station", ...getLocationCoordinates("Nakuru", 2) },
  { id: "PERM-NAKURU-GILGIL", county: "Nakuru County", constituency: "Gilgil", ward: "All Wards", locationName: "Hennsolex Building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Hennsolex Building- Ground Floor- Gilgil Town", landmark: "KPLC - Gilgil", ...getLocationCoordinates("Nakuru", 3) },
  { id: "PERM-NAKURU-KURESOISOUTH", county: "Nakuru County", constituency: "Kuresoi South", ward: "All Wards", locationName: "Keringet centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Keringet centre- Keringet Mall", landmark: "Keringet Center 100m ahead from the Dcc's Junction", ...getLocationCoordinates("Nakuru", 4) },
  { id: "PERM-NAKURU-KURESOINS", county: "Nakuru County", constituency: "Kuresoi North", ward: "All Wards", locationName: "Kuresoi North Sub County Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kuresoi North Sub County Offices, Kamara Division , sachoran Center", landmark: "Kuresoi North Sub County Offices", ...getLocationCoordinates("Nakuru", 5) },
  { id: "PERM-NAKURU-SUBUKIA", county: "Nakuru County", constituency: "Subukia", ward: "All Wards", locationName: "Behind top care hospital", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind top care hospital", landmark: "100metres from subukia-Nakuru highway", ...getLocationCoordinates("Nakuru", 6) },
  { id: "PERM-NAKURU-RONGAI", county: "Nakuru County", constituency: "Rongai", ward: "All Wards", locationName: "IEBC Kampi ya moto", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "IEBC Kampi ya moto behind DC office.", landmark: "Kampi Ya Moto Trading Center", ...getLocationCoordinates("Nakuru", 7) },
  { id: "PERM-NAKURU-BAHATI", county: "Nakuru County", constituency: "Bahati", ward: "All Wards", locationName: "Do's Compound - Kiamaina", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Do's Compound - Kiamaina / Maili Sita - Bahati", landmark: "Do's Office Kiamaina / Maili Sita - Bahati", ...getLocationCoordinates("Nakuru", 8) },
  { id: "PERM-NAKURU-NAKIRUTNW", county: "Nakuru County", constituency: "Nakuru Town West", ward: "All Wards", locationName: "County council offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "County council offices, opposite Kenya Farmers Association(KFA)", landmark: "Kfa Roundabout - Nakuru Town", ...getLocationCoordinates("Nakuru", 9) },
  { id: "PERM-NAKURU-NAKIRUTNE", county: "Nakuru County", constituency: "Nakuru Town East", ward: "All Wards", locationName: "Catholic Diocese Nakuru", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Catholic Diocese Nakuru (Cdn) Compound - Nakuru", landmark: "Mercy Mission Hospital, Assumption Center Near Catholic Bookshop", ...getLocationCoordinates("Nakuru", 10) },

  // NANDI COUNTY
  { id: "PERM-NANDI-MOSOP", county: "Nandi County", constituency: "Mosop", ward: "All Wards", locationName: "Kabiyet", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kabiyet-Nandi North District Headquarters", landmark: "Kabiyet-Nandi North District Headquarters", ...getLocationCoordinates("Nandi", 0) },
  { id: "PERM-NANDI-NANDIHILLS", county: "Nandi County", constituency: "Nandi Hills", ward: "All Wards", locationName: "Nandi Hills Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nandi Hills Town, Ministry of Public Works", landmark: "Nandi Water Suplly", ...getLocationCoordinates("Nandi", 1) },
  { id: "PERM-NANDI-EMGWEN", county: "Nandi County", constituency: "Emgwen", ward: "All Wards", locationName: "Mininstry of Lands Kapsabet", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mininstry of Lands Kapsabet", landmark: "Ministry of Lands/ Acc Office", ...getLocationCoordinates("Nandi", 2) },
  { id: "PERM-NANDI-CHESUMEI", county: "Nandi County", constituency: "Chesumei", ward: "All Wards", locationName: "Cheptarit Catholic Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Cheptarit Catholic Church- Mosoriot", landmark: "Cheptarit Catholic Church", ...getLocationCoordinates("Nandi", 3) },
  { id: "PERM-NANDI-ALDAI", county: "Nandi County", constituency: "Aldai", ward: "All Wards", locationName: "St. Pauls Catholic Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "St. Pauls Catholic Church, Within Kobujoi Town", landmark: "St. Pauls Catholic Church", ...getLocationCoordinates("Nandi", 4) },
  { id: "PERM-NANDI-TINDIRET", county: "Nandi County", constituency: "Tindiret", ward: "All Wards", locationName: "Senetwo Social Hall", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Senetwo Social Hall", landmark: "Former World Vision Offices", ...getLocationCoordinates("Nandi", 5) },

  // NAROK COUNTY
  { id: "PERM-NAROK-KILGORIS", county: "Narok County", constituency: "Kilgoris", ward: "All Wards", locationName: "Old Kilgoris County Council Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Old Kilgoris County Council Offices", landmark: "Cooperative Bank Kilgoris", ...getLocationCoordinates("Narok", 0) },
  { id: "PERM-NAROK-EMRUADIK", county: "Narok County", constituency: "Emurua Dikkir", ward: "All Wards", locationName: "Emurua Dikkir", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Emurua Dikkir", landmark: "Sub County Offices", ...getLocationCoordinates("Narok", 1) },
  { id: "PERM-NAROK-NAROKNORTH", county: "Narok County", constituency: "Narok North", ward: "All Wards", locationName: "Narok North CDF Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Narok North CDF Offices", landmark: "Narok County Commisioner Offices", ...getLocationCoordinates("Narok", 2) },
  { id: "PERM-NAROK-NAROKEAST", county: "Narok County", constituency: "Narok East", ward: "All Wards", locationName: "Ntulele", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ntulele", landmark: "Ntulele Police Station", ...getLocationCoordinates("Narok", 3) },
  { id: "PERM-NAROK-NAROKSOUTH", county: "Narok County", constituency: "Narok South", ward: "All Wards", locationName: "Ololulunga", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ololulunga", landmark: "Ololulunga Police Station", ...getLocationCoordinates("Narok", 4) },
  { id: "PERM-NAROK-NAROKWEST", county: "Narok County", constituency: "Narok West", ward: "All Wards", locationName: "Ngoswani Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ngoswani Centre", landmark: "Drilled Water Solar Powerpoint", ...getLocationCoordinates("Narok", 5) },

  // NYAMIRA COUNTY
  { id: "PERM-NYAMIRA-KITUTUMASABA", county: "Nyamira County", constituency: "Kitutu Masaba", ward: "All Wards", locationName: "Manga DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Manga DCC Compound", landmark: "Manga Cliff", ...getLocationCoordinates("Nyamira", 0) },
  { id: "PERM-NYAMIRA-WESTMUGIRANGO", county: "Nyamira County", constituency: "West Mugirango", ward: "All Wards", locationName: "Nyamira Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nyamira Town", landmark: "County Commissioners' Headquarters (Next to Nyamira Law Courts)", ...getLocationCoordinates("Nyamira", 1) },
  { id: "PERM-NYAMIRA-NORTHMUGIRANGO", county: "Nyamira County", constituency: "North Mugirango", ward: "All Wards", locationName: "Ekerenyo Market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ekerenyo Market", landmark: "Ekerenyo Bus Stage", ...getLocationCoordinates("Nyamira", 2) },
  { id: "PERM-NYAMIRA-BORABU", county: "Nyamira County", constituency: "Borabu", ward: "All Wards", locationName: "DCC Office Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Office Compound in Kijauri Town", landmark: "DCC Offfice", ...getLocationCoordinates("Nyamira", 3) },

  // NYANDARUA COUNTY
  { id: "PERM-NYANDARUA-KINANGOP", county: "Nyandarua County", constituency: "Kinangop", ward: "All Wards", locationName: "Elacy Trading Center", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Elacy Trading Center First Floor", landmark: "North Kinangop Subcounty Headquarters", ...getLocationCoordinates("Nyandarua", 0) },
  { id: "PERM-NYANDARUA-KIPIPIRI", county: "Nyandarua County", constituency: "Kipipiri", ward: "All Wards", locationName: "Kipipiri Subcounty Headquaters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kipipiri Subcounty Headquaters", landmark: "Kipipiri Subcounty Headquaters", ...getLocationCoordinates("Nyandarua", 1) },
  { id: "PERM-NYANDARUA-OLKALOU", county: "Nyandarua County", constituency: "Ol Kalou", ward: "All Wards", locationName: "IEBC County Headqauters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "IEBC County Headqauters", landmark: "Posta Building Olkalou", ...getLocationCoordinates("Nyandarua", 2) },
  { id: "PERM-NYANDARUA-OLJOROK", county: "Nyandarua County", constituency: "Ol Jorok", ward: "All Wards", locationName: "Nyandarua West Subcounty Headquaters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nyandarua West Subcounty Headquaters", landmark: "Nyandarua West Subcounty Headquaters", ...getLocationCoordinates("Nyandarua", 3) },
  { id: "PERM-NYANDARUA-NDARAGWA", county: "Nyandarua County", constituency: "Ndaragwa", ward: "All Wards", locationName: "Ndaragwa Township", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ndaragwa Township Next to Central Ward MCA Office", landmark: "Ndaragwa Police Station", ...getLocationCoordinates("Nyandarua", 4) },

  // NYERI COUNTY
  { id: "PERM-NYERI-TETU", county: "Nyeri County", constituency: "Tetu", ward: "All Wards", locationName: "Tetu Sub County Headquarters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Tetu Sub County Headquarters Wamagana", landmark: "Deputy County Commissioner(DCC) Offices or Tetu National Government Constituency Development Fund (NGCDF) Offices", ...getLocationCoordinates("Nyeri", 0) },
  { id: "PERM-NYERI-KIENI", county: "Nyeri County", constituency: "Kieni", ward: "All Wards", locationName: "Mweiga Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mweiga Town", landmark: "Next To Equity Atm", ...getLocationCoordinates("Nyeri", 1) },
  { id: "PERM-NYERI-MATHIRA", county: "Nyeri County", constituency: "Mathira", ward: "All Wards", locationName: "Mathira East DCC Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "2nd Floor Room 18, Mathira East DCC Complex, Karatina Town", landmark: "Karatina Law Courts", ...getLocationCoordinates("Nyeri", 2) },
  { id: "PERM-NYERI-OTHAYA", county: "Nyeri County", constituency: "Othaya", ward: "All Wards", locationName: "DCC Offices Grounds", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Offices Grounds", landmark: "DCC Office", ...getLocationCoordinates("Nyeri", 3) },
  { id: "PERM-NYERI-MUKURWEINI", county: "Nyeri County", constituency: "Mukurwe-Ini", ward: "All Wards", locationName: "Mukurwe-ini DCC Grounds", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mukurwe-ini DCC Grounds Offices", landmark: "Near mukurwe-ini sub county hospital", ...getLocationCoordinates("Nyeri", 4) },
  { id: "PERM-NYERI-NYERITN", county: "Nyeri County", constituency: "Nyeri-Town", ward: "All Wards", locationName: "DCC Offices Grounds", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Offices Grounds", landmark: "Huduma Center", ...getLocationCoordinates("Nyeri", 5) },

  // SAMBURU COUNTY
  { id: "PERM-SAMBURU-SAMBURUWEST", county: "Samburu County", constituency: "Samburu West", ward: "All Wards", locationName: "Maralal Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maralal Town", landmark: "Samburu County Assembly", ...getLocationCoordinates("Samburu", 0) },
  { id: "PERM-SAMBURU-SAMBURUNORTH", county: "Samburu County", constituency: "Samburu North", ward: "All Wards", locationName: "Baragoi Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Baragoi Town", landmark: "DCC Office", ...getLocationCoordinates("Samburu", 1) },
  { id: "PERM-SAMBURU-SAMBURUEAST", county: "Samburu County", constituency: "Samburu East", ward: "All Wards", locationName: "Wambaa Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Wambaa Town", landmark: "Wamba Parish", ...getLocationCoordinates("Samburu", 2) },

  // SIAYA COUNTY
  { id: "PERM-SIAYA-UGENYA", county: "Siaya County", constituency: "Ugenya", ward: "All Wards", locationName: "Ukwala", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Ukwala - Opposite Sub County Officers", landmark: "Posta - Ukwala", ...getLocationCoordinates("Siaya", 0) },
  { id: "PERM-SIAYA-UGUNJA", county: "Siaya County", constituency: "Ugunja", ward: "All Wards", locationName: "Along Savana - Ambira Hospital Road", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Along Savana - Ambira Hospital Road", landmark: "Savana Hotel", ...getLocationCoordinates("Siaya", 1) },
  { id: "PERM-SIAYA-ALEGOUSONGA", county: "Siaya County", constituency: "Alego Usonga", ward: "All Wards", locationName: "Siaya Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Siaya Town- Within County Commissioners Office Compound", landmark: "County Commissioner's Office", ...getLocationCoordinates("Siaya", 2) },
  { id: "PERM-SIAYA-GEM", county: "Siaya County", constituency: "Gem", ward: "All Wards", locationName: "Nyangweso Market Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Nyangweso Market Centre - Adjacent to Ids Office, Next to Sawagongo High School", landmark: "Sawagongo High School", ...getLocationCoordinates("Siaya", 3) },
  { id: "PERM-SIAYA-BONDO", county: "Siaya County", constituency: "Bondo", ward: "All Wards", locationName: "Adjacent Municipal Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Adjacent Municipal Offices, Next to Bondo Law Court", landmark: "Bondo Law Courts", ...getLocationCoordinates("Siaya", 4) },
  { id: "PERM-SIAYA-RARIEDA", county: "Siaya County", constituency: "Rarieda", ward: "All Wards", locationName: "Kalandini Market Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kalandini Market Centre - Within Rarieda Kerra Compound", landmark: "Kalandini Market", ...getLocationCoordinates("Siaya", 5) },

  // TAITA TAVETA COUNTY
  { id: "PERM-TAITA-TAVETA", county: "Taita Taveta County", constituency: "Taveta", ward: "All Wards", locationName: "Next to Probation office Taveta", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Next to Probation office Taveta", landmark: "Probation Office Taveta", ...getLocationCoordinates("Taita Taveta", 0) },
  { id: "PERM-TAITA-WUNDANYI", county: "Taita Taveta County", constituency: "Wundanyi", ward: "All Wards", locationName: "Along Administration offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Along Administration offices", landmark: "Next to Kenya Forest Service County office", ...getLocationCoordinates("Taita Taveta", 1) },
  { id: "PERM-TAITA-MWATATE", county: "Taita Taveta County", constituency: "Mwatate", ward: "All Wards", locationName: "Mwatate old market", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Mwatate old market, along Wundanyi road", landmark: "Tavevo water and sewerage company ltd", ...getLocationCoordinates("Taita Taveta", 2) },
  { id: "PERM-TAITA-VOI", county: "Taita Taveta County", constituency: "Voi", ward: "All Wards", locationName: "Behind Taita Taveta County Public Service Board", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Behind Taita Taveta County Public Service Board", landmark: "Voi Remand GK prison", ...getLocationCoordinates("Taita Taveta", 3) },

  // TANA RIVER COUNTY
  { id: "PERM-TANARIVER-GARSEN", county: "Tana River County", constituency: "Garsen", ward: "All Wards", locationName: "Garsen Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Garsen Town", landmark: "Kcb Bank", ...getLocationCoordinates("Tana River", 0) },
  { id: "PERM-TANARIVER-GALOLE", county: "Tana River County", constituency: "Galole", ward: "All Wards", locationName: "Hola Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Hola Town", landmark: "Kenya Medical Training", ...getLocationCoordinates("Tana River", 1) },
  { id: "PERM-TANARIVER-BURA", county: "Tana River County", constituency: "Bura", ward: "All Wards", locationName: "Bura Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bura Town", landmark: "National Government Offices", ...getLocationCoordinates("Tana River", 2) },

  // THARAKA-NITHI COUNTY
  { id: "PERM-THARAKANITHI-MAARA", county: "Tharaka-Nithi County", constituency: "Maara", ward: "All Wards", locationName: "DCC Compound, Kienganguru", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound, Kienganguru", landmark: "DCC Compound", ...getLocationCoordinates("Tharaka-Nithi", 0) },
  { id: "PERM-THARAKANITHI-CHUKA", county: "Tharaka-Nithi County", constituency: "Chuka/Igambang'ombe", ward: "All Wards", locationName: "Chuka Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Chuka Town, Sub County Office Compound", landmark: "Opposite Trans National Bank", ...getLocationCoordinates("Tharaka-Nithi", 1) },
  { id: "PERM-THARAKANITHI-THARAKA", county: "Tharaka-Nithi County", constituency: "Tharaka", ward: "All Wards", locationName: "Marimanti Town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Marimanti Town, DCC Compound", landmark: "DCC Offices", ...getLocationCoordinates("Tharaka-Nithi", 2) },

  // TRANS NZOIA COUNTY
  { id: "PERM-TRANSNZOIA-KWANZA", county: "Trans Nzoia County", constituency: "Kwanza", ward: "All Wards", locationName: "KFA Building kitale town", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "KFA Building kitale town", landmark: "KFA Building", ...getLocationCoordinates("Trans Nzoia", 0) },
  { id: "PERM-TRANSNZOIA-ENDEBESS", county: "Trans Nzoia County", constituency: "Endebess", ward: "All Wards", locationName: "Endebess Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Endebess Centre", landmark: "DCCs office", ...getLocationCoordinates("Trans Nzoia", 1) },
  { id: "PERM-TRANSNZOIA-SABOTI", county: "Trans Nzoia County", constituency: "Saboti", ward: "All Wards", locationName: "Maendeleo ya wanawake building", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Maendeleo ya wanawake building Kitale", landmark: "Old Ambwere Plaza", ...getLocationCoordinates("Trans Nzoia", 2) },
  { id: "PERM-TRANSNZOIA-KIMININI", county: "Trans Nzoia County", constituency: "Kiminini", ward: "All Wards", locationName: "Kiminini centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kiminini centre", landmark: "St Peters Cleavers Catholic Church", ...getLocationCoordinates("Trans Nzoia", 3) },
  { id: "PERM-TRANSNZOIA-CHERANGANY", county: "Trans Nzoia County", constituency: "Cherangany", ward: "All Wards", locationName: "Kachibora", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kachibora", landmark: "DCCs office", ...getLocationCoordinates("Trans Nzoia", 4) },

  // TURKANA COUNTY
  { id: "PERM-TURKANA-TURKANANORTH", county: "Turkana County", constituency: "Turkana North", ward: "All Wards", locationName: "DCC's Compound Lokitaung", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound Lokitaung'", landmark: "DCC's Office", ...getLocationCoordinates("Turkana", 0) },
  { id: "PERM-TURKANA-TURKANAWEST", county: "Turkana County", constituency: "Turkana West", ward: "All Wards", locationName: "Old DCC's Office Kakuma", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Old DCC's Office Kakuma", landmark: "Refugees Affairs Services Offices", ...getLocationCoordinates("Turkana", 1) },
  { id: "PERM-TURKANA-TURKANACENTRAL", county: "Turkana County", constituency: "Turkana Central", ward: "All Wards", locationName: "DCC's Compound Lodwar", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound Lodwar", landmark: "Huduma Centre", ...getLocationCoordinates("Turkana", 2) },
  { id: "PERM-TURKANA-LOIMA", county: "Turkana County", constituency: "Loima", ward: "All Wards", locationName: "DCC's Compound Lorgum", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound Lorgum", landmark: "DCC's Office", ...getLocationCoordinates("Turkana", 3) },
  { id: "PERM-TURKANA-TURKANASOUTH", county: "Turkana County", constituency: "Turkana South", ward: "All Wards", locationName: "DCC's Compound Lokichar", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound Lokichar", landmark: "DCC's Office", ...getLocationCoordinates("Turkana", 4) },
  { id: "PERM-TURKANA-TURKANAEAST", county: "Turkana County", constituency: "Turkana East", ward: "All Wards", locationName: "DCC's Compound Lokori", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC's Compound Lokori", landmark: "DCC's Office", ...getLocationCoordinates("Turkana", 5) },

  // UASIN GISHU COUNTY
  { id: "PERM-UASNGISHU-SOY", county: "Uasin Gishu County", constituency: "Soy", ward: "All Wards", locationName: "Meadows Plaza", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Meadows Plaza, opposite Sirikwa Hotel", landmark: "Meadows plaza", ...getLocationCoordinates("Uasin Gishu", 0) },
  { id: "PERM-UASNGISHU-TURBO", county: "Uasin Gishu County", constituency: "Turbo", ward: "All Wards", locationName: "Within NCCK North headquarters", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Within NCCK North headquarters, West Indies", landmark: "NCCK North Headquarters, West Indies", ...getLocationCoordinates("Uasin Gishu", 1) },
  { id: "PERM-UASNGISHU-MOIBEN", county: "Uasin Gishu County", constituency: "Moiben", ward: "All Wards", locationName: "Kimumu Ward Administrative Offices", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Kimumu Ward Administrative Offices in Ainabtich, Eldoret Town", landmark: "Kimumu Ward Administrative Offices", ...getLocationCoordinates("Uasin Gishu", 2) },
  { id: "PERM-UASNGISHU-AINABKOI", county: "Uasin Gishu County", constituency: "Ainabkoi", ward: "All Wards", locationName: "Adjacent To Eldoret East District Hqs", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Adjacent To Eldoret East District Hqs, Off Kapsoya Road , Kapsoya Estate", landmark: "Eldoret East District Hqs", ...getLocationCoordinates("Uasin Gishu", 3) },
  { id: "PERM-UASNGISHU-KAPSERET", county: "Uasin Gishu County", constituency: "Kapseret", ward: "All Wards", locationName: "Inside R.C.E.A Ushirika Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Inside R.C.E.A Ushirika Church Compound, Opposite Hills School - On Eldoret Kisimu Road", landmark: "R.C.E.A Ushirika Church, Opposite Hills School", ...getLocationCoordinates("Uasin Gishu", 4) },
  { id: "PERM-UASNGISHU-KESSES", county: "Uasin Gishu County", constituency: "Kesses", ward: "All Wards", locationName: "Jamboni Complex", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Jamboni Complex Near DCC's Office", landmark: "Moi Unversity Law School", ...getLocationCoordinates("Uasin Gishu", 5) },

  // VIHIGA COUNTY
  { id: "PERM-VIHIGA-VIHIGA", county: "Vihiga County", constituency: "Vihiga", ward: "All Wards", locationName: "Vihiga Educational Resource Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Vihiga Educational Resource Centre", landmark: "Vihiga High School", ...getLocationCoordinates("Vihiga", 0) },
  { id: "PERM-VIHIGA-SABATIA", county: "Vihiga County", constituency: "Sabatia", ward: "All Wards", locationName: "DCC Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "DCC Compound", landmark: "Sabatia Eye Hospital", ...getLocationCoordinates("Vihiga", 1) },
  { id: "PERM-VIHIGA-HAMISI", county: "Vihiga County", constituency: "Hamisi", ward: "All Wards", locationName: "Hamisi Youth Empowerment Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Hamisi Youth Empowerment Centre", landmark: "Hamisi Sub-County Hospital", ...getLocationCoordinates("Vihiga", 2) },
  { id: "PERM-VIHIGA-LUANDA", county: "Vihiga County", constituency: "Luanda", ward: "All Wards", locationName: "Luanda Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Luanda Centre", landmark: "Bunyore Girls High School", ...getLocationCoordinates("Vihiga", 3) },
  { id: "PERM-VIHIGA-EMUHAYA", county: "Vihiga County", constituency: "Emuhaya", ward: "All Wards", locationName: "Esibuye Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Esibuye Centre", landmark: "Bunyore Medical Hospital", ...getLocationCoordinates("Vihiga", 4) },

  // WAJIR COUNTY
  { id: "PERM-WAJIR-WAJNORTH", county: "Wajir County", constituency: "Wajir North", ward: "All Wards", locationName: "Bute", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Bute", landmark: "Police Station", ...getLocationCoordinates("Wajir", 0) },
  { id: "PERM-WAJIR-WAJEAST", county: "Wajir County", constituency: "Wajir East", ward: "All Wards", locationName: "Wajir", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Wajir", landmark: "Huduma Centre", ...getLocationCoordinates("Wajir", 1) },
  { id: "PERM-WAJIR-TARBAJ", county: "Wajir County", constituency: "Tarbaj", ward: "All Wards", locationName: "Tarbaj", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Tarbaj", landmark: "Ward Administrator's Office", ...getLocationCoordinates("Wajir", 2) },
  { id: "PERM-WAJIR-WAJWEST", county: "Wajir County", constituency: "Wajir West", ward: "All Wards", locationName: "Giriftu", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Giriftu", landmark: "DCC's Office", ...getLocationCoordinates("Wajir", 3) },
  { id: "PERM-WAJIR-ELDAS", county: "Wajir County", constituency: "Eldas", ward: "All Wards", locationName: "Eldas", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Eldas", landmark: "DC's Residence", ...getLocationCoordinates("Wajir", 4) },
  { id: "PERM-WAJIR-WAJSOUTH", county: "Wajir County", constituency: "Wajir South", ward: "All Wards", locationName: "Habaswein", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Habaswein", landmark: "AP Camp", ...getLocationCoordinates("Wajir", 5) },

  // WEST POKOT COUNTY
  { id: "PERM-WESTPOKOT-KAPENGURIA", county: "West Pokot County", constituency: "Kapenguria", ward: "All Wards", locationName: "Deputy Commissioner's Compound", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Deputy Commissioner's Compound", landmark: "DCC Offices", ...getLocationCoordinates("West Pokot", 0) },
  { id: "PERM-WESTPOKOT-SIGOR", county: "West Pokot County", constituency: "Sigor", ward: "All Wards", locationName: "KVDA", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "KVDA", landmark: "KVDA Offices", ...getLocationCoordinates("West Pokot", 1) },
  { id: "PERM-WESTPOKOT-KACHELIBA", county: "West Pokot County", constituency: "Kacheliba", ward: "All Wards", locationName: "Holy Cross Catholic Church", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "Holy Cross Catholic Church Kacheliba", landmark: "Catholic Church", ...getLocationCoordinates("West Pokot", 2) },
  { id: "PERM-WESTPOKOT-POKOSOUTH", county: "West Pokot County", constituency: "Pokot South", ward: "All Wards", locationName: "St Marks Development Centre", locationType: "Permanent_Office", operatingHours: "8:00 AM - 5:00 PM (Mon-Fri)", address: "St Marks Development Centre", landmark: "DCC Offices", ...getLocationCoordinates("West Pokot", 3) }
];