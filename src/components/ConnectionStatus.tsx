import { TOURNAMENT_DAY } from '../data/plan';
import { fromISO, toISO } from '../lib/dates';

export default function ConnectionStatus() {
  const today = toISO(new Date());
  const tournamentDate = fromISO(TOURNAMENT_DAY);
  const todayDate = fromISO(today);
  const diffMs = tournamentDate.getTime() - todayDate.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return <span className="text-xs leading-5 font-medium text-green-400">Tournament day</span>;
  }

  return (
    <span className="text-xs leading-5 font-medium text-green-400">
      {daysLeft} days left
    </span>
  );
}
