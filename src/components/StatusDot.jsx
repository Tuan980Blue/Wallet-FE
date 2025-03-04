import {statusColors, statusStrings} from '../util/status.util.js';

function StatusDot({status}) {
  return (
      <div className="flex items-center justify-center gap-2">
      <span
          className={`inline-block w-2 h-2 rounded-full bg-${statusColors[status]}`}
      ></span>
        <span className="font-semibold">{statusStrings[status]}</span>
      </div>
  );
}

export default StatusDot;
