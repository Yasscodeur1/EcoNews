import HeaderImg from '../../../public/Images/biodiversite1.jpeg'

export default function headerHome() {
  return (
    <div>
        <img 
            className='relative bg-gray-300 blur-xs'
            src={HeaderImg} alt="EcoNews" 
        />
        <h1 className='absolute top-2/5 text-center w-full text-emerald-300 text-3xl font-black'>EcoNews est la pour vous informer sur l'ecologie notre mode de vie est à adapter </h1>
    </div>
  )
}
