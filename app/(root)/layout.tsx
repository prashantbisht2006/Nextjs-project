import Navbar from "../componet/Navbar";

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return (
       
            
                <main className="flex-grow">
                    <Navbar/>
                    {children}
                    
                </main>
               
    
    )
}