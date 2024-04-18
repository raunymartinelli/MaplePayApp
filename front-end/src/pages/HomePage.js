import Header from '../components/Header'
import Transactions from '../components/Transactions'
import { MdSplitscreen } from "react-icons/md";
import { MdAddCard } from "react-icons/md";
import { MdAddChart } from "react-icons/md";
import { MdSearch } from 'react-icons/md';
import Footer from '../components/Footer'
import WalletPage from '../pages/WalletPage';

const HomePage = () => {
    return (
        <>
        <div className=" font-inter ">
            <Header></Header>
            <div className="fixed">
                <div className="h-screen w-1/2 fixed z-10 overflow-x-hidden pt-20 bg-custom-faf8f5 left-0">
                    {/* balance display */}
                    <div className="bg-white h-1/6 w-8/12 ml-32 rounded-xl right-0">
                        <div className="p-4 ">
                            <h2 className="p-2 text-lg font-bold">MaplePay balance</h2>
                            <h1 className="p-1 text-2xl font-thin">$0.00</h1>
                            <p className="ml-1 text-sm font-thin">available</p>
                            <button className="mt-6 p-1 w-1/2 bg-custom-maplered hover:bg-red-500 transition duration-300 text-white font-bold rounded-2xl " >Transfer Money</button>
                        </div>
                    </div>  
                    <div className="bg-white h-1/6 w-8/12 mt-4 ml-32 rounded-xl">
                        <div className="p-4 ">
                            <p className="p-2 text-lg font-bold">Recent Acitivty</p>
                            <ul className="p-2 border rounded-md">
                                <Transactions ></Transactions>
                            </ul>
                        </div>
                    </div>  
                </div>  
                <div className="h-screen w-2/4 fixed overflow-x-hidden right-0">
                    {/* balance display */}
                    <div className="bg-white max-w-md">
                        <div className=" flex flex-row p-4">
                            <button className="rounded-3xl p-2 mt-10 bg-custom-maplered hover:bg-red-500 transition duration-300 text-white font-bold text-lg"><a href="/sendMoney">Send</a></button>
                            <button className="rounded-3xl p-2 mt-10 bg-custom-maplered hover:bg-red-500 transition duration-300 text-white font-bold text-lg ml-4">Request</button>
                        </div>
                        <div className=" flex flex-row p-4 justify-start">
                            <div className="flex flex-col p-2 items-center">
                                <MdSplitscreen className="size-16 rounded-full p-4 bg-custom-faf8f5 border-0 hover:bg-slate-300"/>  
                                <button className="border-0 hover:underline w-3/4">Split a bill</button>
                            </div>
                            <div className="flex flex-col p-2 items-center">
                                <MdAddCard className="size-16 rounded-full p-4 bg-custom-faf8f5 border-0 hover:bg-slate-300"/>  
                                <button className="border-0 hover:underline w-3/4">Add card or bank</button>
                            </div>
                            <div className="flex flex-col p-2 items-center ">
                                <MdAddChart className="size-16 rounded-full p-4 bg-custom-faf8f5 border-0 hover:bg-slate-300 "/>
                                <button className="border-0 hover:underline w-3/4">Create invoice</button>
                            </div>
                        </div>
                        <div className="">
                            <p className="p-4 font-bold text-xl ml-1">Send again</p>
                            <div className=" flex flex-row p-4 justify-start">
                                <div className="flex flex-col p-2 items-center ">
                                    <MdSearch className="size-16 rounded-full p-4 bg-custom-faf8f5 border-0 hover:bg-slate-300 "/>
                                    <button className="border-0 hover:underline w-3/4">Search</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="p-4 font-bold text-xl ml-1">Bank accounts and cards</p>
                        </div>
                    </div>  
                </div> 
            </div>
        </div>  
        </>  
        
    );
};
export default HomePage;