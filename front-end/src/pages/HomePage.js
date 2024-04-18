import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="grid grid-cols-2 gap-4 p-10">
                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-lg font-bold mb-4">MaplePay balance</h2>
                    <h1 className="text-2xl font-bold">$0.00</h1>
                    <p className="text-gray-600">available</p>
                    <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Transfer Money
                    </button>
                </div>
                <div className="bg-white rounded-xl p-6">
                    <p className="text-gray-600 mb-2">Earn rewards by referring your friends!</p>
                    <p className="text-gray-600 mb-4"><a href="#" className="text-red-600 font-bold">Terms apply</a></p>
                    <h1 className="text-2xl font-bold mb-2">Invite friends</h1>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Invite Now
                    </button>
                </div>
            </div>
            <div className="col-span-2 bg-white rounded-xl p-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Transfer Money
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Split a Bill
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Add Card or Bank
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Create Invoice
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Send Again
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-full">
                        Bank Accounts and Cards
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 text-white text-center">
                <ul className="flex justify-center space-x-8">
                    <li>Help</li>
                    <li>Contact us</li>
                    <li>Security</li>
                </ul>
                <p className="mt-4">2024 Maple pay</p>
            </div>
        </div>
    );
};

export default HomePage;
