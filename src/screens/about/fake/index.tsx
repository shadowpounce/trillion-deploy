import {FC, useEffect} from "react"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

interface IFake {}

export const Fake: FC<IFake> = () => {
  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide} = useGsapSlideContext()

  useEffect(() => {
    if (isActiveSlide && stage == "before-transition") {
      setStage("transition")
    }
  }, [isActiveSlide, stage, direction])

  return <></>
}
