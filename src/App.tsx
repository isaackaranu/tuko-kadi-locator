import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Clock, Share2, Search, Navigation, ShieldCheck } from 'lucide-react';
import { registrationLocations, RegistrationLocation } from './registrationData';

function getTodayNairobi(): string {
  const date = new Date();
  return date.toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' });
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;  
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

export default function App() {
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedConstituency, setSelectedConstituency] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  const counties = useMemo(() => {
    const uniqueCounties = new Set(registrationLocations.map(loc => loc.county));
    return Array.from(uniqueCounties).sort();
  }, []);

  const constituencies = useMemo(() => {
    if (!selectedCounty) return [];
    const uniqueConstituencies = new Set(
      registrationLocations
        .filter(loc => loc.county === selectedCounty)
        .map(loc => loc.constituency)
    );
    return Array.from(uniqueConstituencies).sort();
  }, [selectedCounty]);

  const wards = useMemo(() => {
    if (!selectedConstituency) return [];
    const uniqueWards = new Set(
      registrationLocations
        .filter(loc => loc.county === selectedCounty && loc.constituency === selectedConstituency)
        .map(loc => loc.ward)
    );
    return Array.from(uniqueWards).sort();
  }, [selectedCounty, selectedConstituency]);

  const filteredLocations = useMemo(() => {
    let results = registrationLocations;

    // Apply dropdown filters
    if (selectedCounty) results = results.filter(l => l.county === selectedCounty);
    if (selectedConstituency) results = results.filter(l => l.constituency === selectedConstituency);
    
    if (selectedCounty || selectedConstituency) {
      if (!selectedWard) {
        // Rule 1: No ward selected -> Only Permanent Offices
        results = results.filter(l => l.locationType === "Permanent_Office");
      } else if (selectedWard === "All Wards") {
        // Rule 2: "All Wards" -> Show all locations in the constituency
        // No additional filtering needed, already filtered by constituency
      } else {
        // Rule 3: Specific ward -> Show specific ward + Permanent Office ("All Wards")
        results = results.filter(l => l.ward === selectedWard || l.ward === "All Wards");
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(l => 
        l.locationName.toLowerCase().includes(q) ||
        l.constituency.toLowerCase().includes(q) ||
        l.ward.toLowerCase().includes(q) ||
        l.county.toLowerCase().includes(q)
      );
    }

    // Apply geolocation sorting
    if (userLocation) {
      results = [...results].sort((a, b) => {
        if (a.lat && a.lng && b.lat && b.lng) {
          const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
          const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
          return distA - distB;
        }
        if (a.lat && a.lng) return -1;
        if (b.lat && b.lng) return 1;
        return 0;
      });
    }

    return results;
  }, [selectedCounty, selectedConstituency, selectedWard, searchQuery, userLocation]);

  const today = getTodayNairobi();

  const activeMobileKits = filteredLocations.filter(loc => 
    loc.locationType === 'Mobile_Kit' && 
    loc.schedule?.some(entry => entry.date === today)
  );

  const permanentOffices = filteredLocations.filter(loc => 
    loc.locationType === 'Permanent_Office'
  );

  const handleShare = (location: RegistrationLocation) => {
    // Determine if we should show the ward (hide if it's "All Wards")
    const wardText = location.ward !== "All Wards" ? ` in ${location.ward}` : "";
    
    // Clean, professional template
    const rawMessage = `Time to get that voter's card!\nYou can register today at: ${location.locationName}${wardText}.\nOpen: ${location.operatingHours}\n\nSkiza Wakenya. Your vote is your power.\nCheck where your nearest kit is: ${window.location.origin}\n\n#TukoKadi #ECVR2026 #DCP`;
    
    // Encode the entire string once
    const encodedMessage = encodeURIComponent(rawMessage);
    
    // Open WhatsApp
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError('');
    
    setSearchQuery('');
    setSelectedCounty('');
    setSelectedConstituency('');
    setSelectedWard('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          setLocationError('Unable to retrieve location. Please check permissions.');
          setIsLocating(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };

  const shouldShowResults = selectedCounty !== '' || searchQuery.trim().length > 0 || userLocation !== null;
  const isSearchActive = searchQuery.trim().length > 0 || selectedCounty !== '' || userLocation !== null;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCounty('');
    setSelectedConstituency('');
    setSelectedWard('');
    setUserLocation(null);
    setLocationError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#1B5E20] to-[#0A3D0C] text-white py-12 px-4 text-center shadow-lg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#AAFA97] blur-3xl"></div>
          <div className="absolute bottom-10 -left-10 w-32 h-32 rounded-full bg-[#822B2B] blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Faux Logo */}
          <div className="flex justify-center items-center mb-5 relative">
            <div className="relative flex items-center justify-center w-20 h-20 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
              <ShieldCheck className="w-12 h-12 text-[#AAFA97]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Badge */}
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 shadow-sm">
            DCP Youth League
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Tuko Kadi Locator
          </h1>
          
          {/* Tagline */}
          <div className="bg-[#AAFA97] px-5 py-2 rounded-full shadow-lg inline-block transform -rotate-1">
            <p className="text-[#822B2B] italic font-bold text-lg md:text-xl drop-shadow-sm">
              Skiza Wakenya — Track the Kit. Secure Your Vote.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-md w-full mx-auto p-4 flex flex-col gap-6 -mt-6 relative z-20">
        
        {/* Search & Filters Section */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-semibold text-[#000000]">Find Your Registration Center</h2>
            {isSearchActive && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#822B2B] font-bold hover:underline bg-red-50 px-3 py-1.5 rounded-md transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ward, constituency..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setSelectedCounty('');
                  setSelectedConstituency('');
                  setSelectedWard('');
                  setUserLocation(null);
                }
              }}
              className="w-full h-12 pl-10 pr-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-[#000000] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">OR</span>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          {/* Geolocation Button */}
          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className="w-full h-12 bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#1B5E20] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#a5d6a7] disabled:opacity-70 shadow-sm"
          >
            <Navigation className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} />
            {isLocating ? 'Detecting Location...' : userLocation ? 'Location Active - Update' : 'Use My Current Location'}
          </button>
          
          {locationError && (
            <p className="text-xs text-[#822B2B] text-center font-medium">{locationError}</p>
          )}

          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">OR FILTER</span>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          {/* Dropdowns */}
          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">County</label>
            <select
              id="county"
              value={selectedCounty}
              onChange={(e) => {
                setSelectedCounty(e.target.value);
                setSelectedConstituency('');
                setSelectedWard('');
                if (e.target.value) {
                  setSearchQuery('');
                  setUserLocation(null);
                }
              }}
              className="w-full h-12 px-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-[#000000] transition-colors"
            >
              <option value="">Select County</option>
              {counties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
            <select
              id="constituency"
              value={selectedConstituency}
              onChange={(e) => {
                setSelectedConstituency(e.target.value);
                setSelectedWard('');
              }}
              disabled={!selectedCounty}
              className="w-full h-12 px-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-[#000000] disabled:opacity-50 disabled:bg-gray-100 transition-colors"
            >
              <option value="">Select Constituency</option>
              {constituencies.map(constituency => (
                <option key={constituency} value={constituency}>{constituency}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
            <select
              id="ward"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!selectedConstituency}
              className="w-full h-12 px-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-[#000000] disabled:opacity-50 disabled:bg-gray-100 transition-colors"
            >
              <option value="">Select Ward</option>
              {wards.map(ward => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Results Section */}
        {shouldShowResults && (
          <section className="flex flex-col gap-5 pb-8">
            {selectedCounty && (
              <div className="bg-[#e8f5e9] border border-[#a5d6a7] text-[#1B5E20] px-4 py-3 rounded-xl shadow-sm">
                {selectedWard ? (
                  <p className="font-medium text-sm">
                    📍 Showing results for <span className="font-bold">{selectedWard === 'All Wards' ? 'All Wards in ' + selectedConstituency : selectedWard + ' Ward'}</span>.
                  </p>
                ) : selectedConstituency ? (
                  <p className="font-medium text-sm">
                    Found <span className="font-bold">{filteredLocations.length}</span> locations in <span className="font-bold">{selectedConstituency}</span>. Select your Ward to check for today's mobile kits.
                  </p>
                ) : (
                  <p className="font-medium text-sm">
                    Found <span className="font-bold">{filteredLocations.length}</span> Permanent Offices in <span className="font-bold">{selectedCounty}</span>. Select a Constituency to narrow down.
                  </p>
                )}
              </div>
            )}

            {filteredLocations.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
                <p className="text-gray-500">No registration data available matching your criteria.</p>
              </div>
            ) : (
              <>
                {/* Mobile Kits */}
                {activeMobileKits.map(kit => (
                  <div key={kit.id} className="bg-white rounded-xl shadow-md border-2 border-[#AAFA97] overflow-hidden flex flex-col">
                    <div className="bg-[#822B2B] text-white text-xs font-bold px-3 py-2 flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm">
                      <span className="w-2.5 h-2.5 bg-[#AAFA97] rounded-full animate-pulse"></span>
                      KIT IS HERE TODAY
                    </div>
                    <div className="p-6 flex flex-col gap-4 text-[#000000]">
                      <h3 className="text-xl font-bold flex items-start gap-3">
                        <div className="bg-[#1B5E20] p-1.5 rounded-lg shrink-0 mt-0.5">
                          <MapPin className="w-5 h-5 text-[#AAFA97]" />
                        </div>
                        {kit.locationName}
                      </h3>
                      
                      <div className="flex flex-col gap-2 text-sm ml-11">
                        {userLocation && kit.lat && kit.lng && (
                          <div className="flex items-center gap-1.5 text-[#1B5E20] font-semibold mt-1">
                            <Navigation className="w-4 h-4" />
                            {getDistance(userLocation.lat, userLocation.lng, kit.lat, kit.lng).toFixed(1)} km away
                          </div>
                        )}
                        {kit.landmark && (
                          <p><span className="font-medium text-gray-600">Landmark:</span> {kit.landmark}</p>
                        )}
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-4 h-4 text-[#1B5E20]" />
                          {kit.schedule?.find(s => s.date === today)?.hours || kit.operatingHours}
                        </div>
                      </div>

                      {/* Upcoming Schedule Display */}
                      {kit.schedule && kit.schedule.length > 0 && (
                        <div className="mt-2 pt-4 border-t border-gray-100 ml-11">
                          <p className="text-sm font-bold mb-3 flex items-center gap-1.5">
                            🗓️ Full Kit Schedule for this Ward
                          </p>
                          <div className="flex flex-col gap-2">
                            {kit.schedule.map((entry, idx) => {
                              const isToday = entry.date === today;
                              const dateObj = new Date(entry.date);
                              const dateString = isNaN(dateObj.getTime()) 
                                ? entry.date 
                                : dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
                                
                              return (
                                <div 
                                  key={idx} 
                                  className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg border ${
                                    isToday 
                                      ? 'bg-[#AAFA97] border-[#AAFA97] font-bold shadow-sm' 
                                      : 'bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    {dateString}
                                    {isToday && (
                                      <span className="text-[10px] bg-[#822B2B] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Current
                                      </span>
                                    )}
                                  </span>
                                  <span className={isToday ? 'text-[#000000]' : 'text-gray-600'}>{entry.hours}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => handleShare(kit)}
                        className="mt-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <Share2 className="w-5 h-5" />
                        Share on WhatsApp
                      </button>
                    </div>
                  </div>
                ))}

                {/* Permanent Offices */}
                {permanentOffices.map(office => (
                  <div key={office.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col gap-4 text-[#000000]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-gray-200">
                          Permanent Office
                        </span>
                      </div>
                      <h3 className="text-xl font-bold flex items-start gap-3">
                        <div className="bg-gray-100 p-1.5 rounded-lg shrink-0 mt-0.5">
                          <MapPin className="w-5 h-5 text-gray-500" />
                        </div>
                        {office.locationName}
                      </h3>
                      
                      <div className="flex flex-col gap-2 text-sm ml-11">
                        {userLocation && office.lat && office.lng && (
                          <div className="flex items-center gap-1.5 text-[#1B5E20] font-semibold mt-1">
                            <Navigation className="w-4 h-4" />
                            {getDistance(userLocation.lat, userLocation.lng, office.lat, office.lng).toFixed(1)} km away
                          </div>
                        )}
                        {office.address && (
                          <p>{office.address}</p>
                        )}
                        {office.landmark && (
                          <p><span className="font-medium text-gray-600">Landmark:</span> {office.landmark}</p>
                        )}
                        <div className="flex items-center gap-1.5 font-medium mt-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {office.operatingHours}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleShare(office)}
                        className="mt-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <Share2 className="w-5 h-5" />
                        Share on WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 text-center mt-auto">
        <p className="text-sm text-gray-400 font-medium">
          Powered by <span className="text-white">DCP Youth League</span> | #ECVR2026 | #YourVoteYourFuture
        </p>
      </footer>
    </div>
  );
}
