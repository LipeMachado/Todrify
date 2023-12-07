import { Toaster as ToasterProvider } from "react-hot-toast"

export function Toaster() {
    return (
        <>
            <ToasterProvider
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        iconTheme: {
                            primary: '#9880F2',
                            secondary: '#ffffff',
                        },
                    }
                }}
            />
        </>
    )
}