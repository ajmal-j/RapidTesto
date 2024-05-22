export default function CountdownTimer({
  timeLeft,
  isFinished,
}: {
  timeLeft: number;
  isFinished: boolean;
}) {
  return (
    <div>
      <h2 className='font-medium text-nowrap'>
        Time :{" "}
        <span className='font-bold text-xl tabular-nums'>{timeLeft}</span>
        <span className='text-primary/50 ps-1'>
          {isFinished ? "second's left." : ""}
        </span>
      </h2>
    </div>
  );
}
