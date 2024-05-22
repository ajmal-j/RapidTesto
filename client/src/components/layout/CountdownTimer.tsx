export default function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  return (
    <div>
      <h2 className='font-medium'>Time : {timeLeft} </h2>
    </div>
  );
}
