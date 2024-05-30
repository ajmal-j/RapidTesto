import { motion } from "framer-motion";

export default function Caret({ isFinished }: { isFinished: boolean }) {
  if (isFinished) return null;

  return (
    <motion.div
      aria-hidden={true}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
      className='inline-block bg-primary/60 w-0.5 h-12 md:mb-0 mb-[-2px] xl:h-10 rounded-full'
    />
  );
}
