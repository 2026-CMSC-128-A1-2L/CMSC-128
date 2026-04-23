import RightArrow from '../../assets/iconamoon_arrow-right-2.svg'

export default function Header() {
  return (
    <div className='flex'>
      <p>User Profile</p>
      <img src={RightArrow}></img>
      <p>Current Dorm</p>
      <img src={RightArrow}></img>
      <p>Report</p>
      <img src={RightArrow}></img>
      
    </div>
  )
}
