//figma to code divs are fucking horrendous
//Report page from scratch
import SideBar from "../../../../components/user/SideBar"
import Header from "../../../../components/user-report/Header"
import Content from "../../../../components/user-report/Content"
export default function Reportv2() {
    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="flex flex-col">
                    <Header />
                    <Content />
                </div>
                
            </div>
            
        </>
    )
}
