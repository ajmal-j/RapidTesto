import { Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <Link
      href='https://www.linkedin.com/in/ajmal-jaleel-1267b9275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      className='fixed left-0 flex px-2 bottom-0 ms-4 mb-2 rounded-full gap-1 items-center text-primary/60 divide-x-2'
      target='_blank'
    >
      <Linkedin size={16} />
      <span className='text-sm ps-1'>ajmal jaleel</span>
    </Link>
  );
};

export default Footer;
