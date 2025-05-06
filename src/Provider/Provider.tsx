import UserProvider from '@/context/UserContext';
import { Toaster } from 'sonner';
const Provider = ({children}:{children:React.ReactNode})=>{
    return <UserProvider>
          <Toaster richColors position="top-right"  />
        {children}
    </UserProvider>
}

export default Provider