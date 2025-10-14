import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "next-themes"
import { store } from "./store/store"
import Index from "./pages/Index"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { SocketProvider } from "./context/socketContext"

const queryClient = new QueryClient()

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SocketProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/chat' element={<Chat />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
)

export default App
