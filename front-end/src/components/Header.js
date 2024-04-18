import WalletPage from '../pages/WalletPage';

export default function Header () {
    return (
<nav className="bg-custom-maplered h-16 items-center content-center">
    <div class="flex flex-row justify-around">
        <ul class="flex space-x-4 self-center">
            <a href="#" class="">Logo</a>
            <li><a href="#" class="p-3 text-white active:bg-custom-lightmaplered rounded-xl hover:border border-custom-lightmaplered " aria-current="page">Home</a></li>
            <li><a href="/wallet" class="p-3 text-white active:bg-custom-lightmaplered rounded-xl hover:border border-custom-lightmaplered ">Wallet</a></li>
            <li><a href="#" class="p-3 text-white active:bg-custom-lightmaplered rounded-xl hover:border border-custom-lightmaplered ">Activity</a></li>
        </ul>
        <ul class="flex space-x-4 self-center">
            <li class="p-3 text-white active:bg-custom-lightmaplered rounded-xl hover:border border-custom-lightmaplered">Setting</li>
            <li class="p-3 text-white active:bg-custom-lightmaplered rounded-xl hover:border border-custom-lightmaplered">Log out</li>
        </ul>
    </div>
</nav>
    )
}