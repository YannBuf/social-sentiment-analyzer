declare module "embla-carousel-react" {
  import * as React from "react";

  export interface EmblaCarouselType {
    scrollNext: () => void;
    scrollPrev: () => void;
    // 其他方法或属性根据需要补充
    [key: string]: any;
  }

  export type UseEmblaCarouselType = [React.RefObject<HTMLElement>, EmblaCarouselType | undefined];

  export default function useEmblaCarousel(
    options?: Record<string, any>,
    plugins?: any[]
  ): UseEmblaCarouselType;
}
