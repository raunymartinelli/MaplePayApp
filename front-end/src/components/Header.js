// import WalletPage from '../pages/WalletPage';
import logo from './logo.png'; // Import the logo image

export default function Header() {
    return (
        <nav className="bg-custom-maplered h-16 flex items-center justify-between px-6">
            <div className="flex items-center">
                <img
                    className="h-8 w-auto mr-4"
                    src={logo} // Use the imported logo image
                    alt="Maple Pay"
                />
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
                    <li><a href="/wallet" className="text-white hover:text-gray-300">Wallet</a></li>
                    <li><a href="/AccountView" className="text-white hover:text-gray-300">Account</a></li>
                </ul>
            </div>
            <ul className="flex space-x-4">
                <li className="text-white hover:text-gray-300">Settings</li>
                <li className="text-white hover:text-gray-300">Log out</li>
            </ul>
        </nav>
    );
}
