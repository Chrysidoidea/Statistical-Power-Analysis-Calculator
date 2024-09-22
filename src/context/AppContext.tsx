import { createContext, useState, useContext } from "react";

type AppContextProps = {
    inputType: string;
    setInputType: (inputType: string) => void;
    fade: boolean;
    setFade: (fade: boolean) => void;
    alpha: number;
    setAlpha: (alpha: number) => void;
    desiredPower: number;
    setDesiredPower: (desiredPower: number) => void;
    sampleSize: number;
    setSampleSize: (sampleSize: number) => void;
}
const AppContext = createContext<AppContextProps | undefined>(undefined) as React.Context<AppContextProps>;
export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [inputType, setInputType] = useState("neutral");
    const [fade, setFade] = useState(false);
    const [alpha, setAlpha] = useState(0.05);
    const [desiredPower, setDesiredPower] = useState(0.8);
    const [sampleSize, setSampleSize] = useState(30);

    return (
        <AppContext.Provider value={{
            inputType,
            setInputType,
            fade,
            setFade,
            alpha,
            setAlpha,
            desiredPower,
            setDesiredPower,
            sampleSize,
            setSampleSize
        }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        console.log("Error: useAppContext must be used within a AppContextProvider");
    }
    return context;
}