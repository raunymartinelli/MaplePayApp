export default function Header () {
    return (
        <nav className="bg-slate-400 h-16 items-center content-center">
                <div class="flex flex-row justify-around">
                    <ul class="flex space-x-4 self-center">
                        <a href="#" class="">Logo</a>
                        <li><a href="#" class="">Home</a></li>
                        <li><a href="#" class="">Wallet</a></li>
                        <li><a href="#" class="">Transaction</a></li>
                        <li><a href="#" class="">Setting</a></li>
                    </ul>
                    <ul class="flex space-x-4 self-center">
                        <li>Setting</li>
                        <li>Log out</li>
                    </ul>
                </div>
        </nav>
    )
}