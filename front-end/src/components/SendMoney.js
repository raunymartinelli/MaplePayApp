import Header from './Header'
import SendRequestNavBar from './SendRequestNavbar'
import { MdSearch } from 'react-icons/md';
import Footer from './Footer'
export default function SendMoney() {
    return (
    <>
        <Header></Header>
        <SendRequestNavBar></SendRequestNavBar>
        <div className="ml-20">
            <h1 className="mt-20 mb-7 text-3xl font-bold"> Send Money</h1>
            <div className="flex align-center">
                <MdSearch className="size-12 p-2"></MdSearch>
                <input type="text" placeholder="Name, username, email, mobile" className=" w-1/3 p-3 rounded-2xl"></input>
            </div>
        <p className="py-8 text-2xl font-bold">Your contact</p>
        </div>
    </>
    )
}