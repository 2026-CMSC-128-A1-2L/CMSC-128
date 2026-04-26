import RightArrow from '../../../../assets/iconamoon_arrow-right-2.svg'

export default function Header() {
  return (
    <div className='flex py-2 items-center font-lora text-num-14 font-semibold'>
      <p>User Profile</p>
      <img src={RightArrow}></img>
      <p>Current Dorm</p>
      <img src={RightArrow}></img>
      <p>Report</p>
      
    </div>
  )
}
