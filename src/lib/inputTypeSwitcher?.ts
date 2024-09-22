type inputTypeSwitcherType = {
    setInputType: (inputType: string) => void;
    type: string;
}

export const inputTypeSwitcher = ({setInputType, type}: inputTypeSwitcherType) => {
    setInputType(type)
}