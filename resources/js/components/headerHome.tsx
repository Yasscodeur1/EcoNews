import HeaderImg from '../../../public/Images/biodiversite1.jpeg'

export default function headerHome() {
  return (
    <div className="relative">
  <img 
    className="w-full h-64 sm:h-80 md:h-96 object-cover bg-gray-300"
    src={HeaderImg} 
    alt="EcoNews" 
  />
  <div className="absolute inset-0 flex items-center justify-center px-4">
    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-emerald-500 bg-slate-50/80 p-4 rounded">
      EcoNews : com
      <span className="bg-amber-300 text-white px-1">prendre l'écologie,</span><br />
      changer notre 
      <span className="bg-amber-200 text-white px-1 ml-2">quotidien</span>
    </h1>
  </div>
</div>

  )
}
