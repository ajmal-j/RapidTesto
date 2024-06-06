import Image from "next/image";

type Props = {};

export default function Loading(props: Props) {
  return (
    <div className='w-full min-h-[calc(100vh_-_10rem)] flex justify-center items-center'>
      <Image
        src='/logo.svg'
        className='invert dark:invert-0 animate-pulse size-12 duration-700'
        alt='logo'
        width={0}
        height={0}
      />
    </div>
  );
}
