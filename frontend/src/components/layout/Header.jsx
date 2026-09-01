 

function Header() {
  return (
    <header className=" bg-white flex items-center justify-end p-2">

     
      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3">
          
          <div className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

        </div>
      </div>

    </header>
  );
}

export default Header;