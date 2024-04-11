import Header from '../components/Header'

const HomePage = () => {
    return (
        <>
        {/* nav bar */}
        <div className=" bg-custom-faf8f5">
            <Header></Header>
            <div className="h-full w-1/2 fixed z-10 overflow-x-hidden pt-20 bg-custom-faf8f5 left-0">
                {/* balance display */}
                <div className="bg-slate-400 h-48 w-96 ml-32 rounded-xl">
                    <div>
                        <h2>MaplePay balance</h2>
                        <h1>$0.00</h1>
                        <p>available</p>
                        <button>Transfer Money</button>
                    </div>
                </div>  
                <div className="bg-slate-400 h-48 w-96 mt-4 ml-32 rounded-xl">
                    <div>
                        <p>Earn rewards by refering your friends! </p>
                        <p><a href="#">Terms apply</a></p>
                        <h1>Invite friends</h1>
                    </div>
                </div>  
            </div>  
            <div className="h-full w-1/2 fixed z-10 overflow-x-hidden bg-white right-0">
                {/* balance display */}
                <div className="bg-white">
                    <div>
                        <button>Transfer Money</button>
                        <button>Transfer Money</button>
                    </div>
                    <div>
                        <button>Split a bill</button>
                        <button>Add card or bank</button>
                        <button>Create invoice</button>
                    </div>
                    <div>
                        <p>Send again</p>
                    </div>
                    <div>
                        <p>Bank accounts and cards</p>
                    </div>
                </div>  
            </div> 
        </div>  
        <div className="w-full">
                <ul>
                    <li>Help</li>
                    <li>Contact us</li>
                    <li>Security</li>
                </ul>
                <p>2024 Maple pay</p>
            </div>
        </>  
    );
};
export default HomePage;