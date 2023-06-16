import { IConstraints } from '@/core/types';

export const ConstraintCard = ({constraint}: {constraint: IConstraints}) => {
  return (
    <article className="mt-3 flex w-full cursor-pointer flex-col rounded-lg border border-slate-300 p-2 transition-all hover:animate-pulse">
      <div>
        <div>
          <h4 className="text-xs">Available times:</h4>
          {constraint.available_times.map((time, index) => (
            <p key={index} className="text-xs">
              Start: {time.start}, End: {time.end}
            </p>
          ))}
        </div>
        <div>
          <h4 className="text-xs">Preferred locations:</h4>
          {constraint.preferred_locations.map(location => (
            <p key={location.id} className="text-xs">
              {location.value}
            </p>
          ))}
        </div>
        <div>
          <h4 className="text-xs">Preferred gender:</h4>
            <p className="text-xs">{constraint.preferred_gender}</p>
        </div>
      </div>
    </article>
  );
}
