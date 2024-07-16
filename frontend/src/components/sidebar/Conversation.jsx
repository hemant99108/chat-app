
const Conversation = () => {
  return (
    <>
        <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
            <div className="w-12 rounded-full ">
                <img src="https://i.pravatar.cc/150?u=jackjone" alt="user avatar "/>
            </div>
        </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200 ">John doe </p>
                        <span className="text-xl"> 😊</span>
                         
                    </div>
                </div>

        </div>

        <div className="divider py-0 my-0 h-1"/>
    </>
  )
}

export default Conversation