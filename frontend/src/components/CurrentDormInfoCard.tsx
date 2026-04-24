import DormImage from '../../assets/image.png'
import MapPin from '../../assets/pin_location_icon.svg'
import Home from '../../assets/House.svg'
export default function CurrentDormInfoCard() {
  return (
  <div className="flex flex-col md:flex-row w-full max-w-4xl md:max-h-[196px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm font-sans">
      
      {/* Image Section */}
      <div className="md:w-1/3 h-64 md:h-auto">
        <img 
          src={DormImage} // Replace with your actual image path
          alt="One Sapphire Place exterior" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col p-2 md:p-4 md:w-2/3">
        <div className="flex text-center justify-items-center gap-2">
          <h2 className="text-[24px] text-black font-bold font-inter">One Sapphire Place</h2>
          <span className="text-silver-200 font-semibold text-[18px] content-center">Room 31</span>
        </div>
        

        <div className="flex flex-col gap-1 py-2">
          
          <div className="flex items-center gap-3 text-black px-2">
            <img className="w-4 h-4" src={MapPin} />
            <span className="font-medium text-[14px] font-lora">Batong Malake, Los Banos, Laguna</span>
          </div>
          
          <div className="flex gap-4  text-black px-2">
            <img className="w-4 h-4" src={Home} />
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-[14px] font-lora">Quevin Custodio</span>
              <span className="text-[8px] text-silver-200 font-medium ">Landlord</span>
            </div>
          </div>
          
          <div className="flex gap-4  text-black px-2">
            <img className="w-4 h-4" src={Home} />
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-[14px] font-lora">Nathaniel Cunanan</span>
              <span className="text-[8px] text-silver-200 font-medium ">Manager</span>
            </div>
          </div>

        </div>

        <div className="flex overflow-x-auto gap-3 mt-auto">
          <span className="px-5 py-2.5 rounded-lg bg-[#cbf6ed] border border-[#024338] text-[#024338] text-[15px] font-medium">
            Single Room
          </span>
          <span className="px-5 py-2.5 rounded-lg bg-[#cbf6ed] border border-[#024338] text-[#024338] text-[15px] font-medium">
            ~18 sqm
          </span>
          <span className="px-5 py-2.5 rounded-lg bg-[#cbf6ed] border border-[#024338] text-[#024338] text-[15px] font-medium">
            Contract: April 2026 - April 2027
          </span>
        </div>

      </div>
    </div>
  )
}
