
type transitionEffectType = {
    setFade: (input: boolean) => void
}
export const transitionEffect = ({setFade}: transitionEffectType) => {
    setFade(true);

    setTimeout(() => {
      setFade(false);
    }, 200);
};