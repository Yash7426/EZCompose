import Image, { StaticImageData } from 'next/image';

interface GradientBackgroundProps {
  leftImageSrc: StaticImageData;
  rightImageSrc: StaticImageData;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ leftImageSrc, rightImageSrc }) => {
  return (
    <div className="relative translate-y-[-300px] translate-z-[0px] z-50">
      <Image
        alt="left gradient"
        src={leftImageSrc}
        objectFit="cover"
        objectPosition="left"
        className="transition duration-1000 opacity-1 absolute left-0 select-none pointer-events-none bg-transparent border-none"
        width={1023}
        height={2052}
      />
      <Image
        alt="right gradient"
        src={rightImageSrc}
          objectFit="cover"
        objectPosition="right"
        className="transition duration-1000 opacity-1 absolute right-0 select-none pointer-events-none bg-transparent border-none"
        width={1023}
        height={1052}
      />
    </div>
  );
};

export default GradientBackground;
