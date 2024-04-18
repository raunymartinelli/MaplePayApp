export default function SendRequestNavBar(){
    return (
        <>
        <nav className="bg-white h-16 items-center content-center shadow-md ">
            <div class="flex flex-row justify-around">
                <ul class="flex space-x-4 self-center">
                    <li><a href="/sendMoney" class="p-3 text-custom-maplered shadow-md  rounded-xl hover:border border-custom-lightmaplered " aria-current="page">Send</a></li>
                    <li><a href="/request" class="p-3 text-custom-maplered shadow-md  rounded-xl hover:border border-custom-lightmaplered ">Request</a></li>
                    <li><a href="#" class="p-3 text-custom-maplered shadow-md  rounded-xl hover:border border-custom-lightmaplered ">Activity</a></li>
                </ul>
            </div>
        </nav>
        </>
    )
}