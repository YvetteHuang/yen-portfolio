/**
 * Flow strip: lane labels and chevrons share the same CSS grid columns so brackets
 * align with the blocks below. Chevron overlap uses a fixed notch width.
 */

const FLOW = {
  fill: "#E5D9FF",
  ink: "#6233C1",
  text: "#2A1146",
};

const NOTCH = 14;

function LaneLabel({ children }) {
  return (
    <span className="mb-1 block text-center text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-zinc-400 min-[1024px]:text-[0.6875rem]">
      {children}
    </span>
  );
}

function LaneBracket() {
  return (
    <div
      className="h-2 w-full rounded-t-sm border border-b-0"
      style={{ borderColor: FLOW.ink }}
      aria-hidden
    />
  );
}

/**
 * @param {object} props
 * @param {"first" | "middle" | "last"} props.shape
 * @param {boolean} props.overlap
 */
function ChevronStep({ shape, overlap, children }) {
  const clip =
    shape === "first"
      ? `polygon(0 0, calc(100% - ${NOTCH}px) 0, 100% 50%, calc(100% - ${NOTCH}px) 100%, 0 100%)`
      : shape === "last"
        ? `polygon(${NOTCH}px 0, 100% 0, 100% 100%, ${NOTCH}px 100%, 0 50%)`
        : `polygon(${NOTCH}px 0, calc(100% - ${NOTCH}px) 0, 100% 50%, calc(100% - ${NOTCH}px) 100%, ${NOTCH}px 100%, 0 50%)`;

  return (
    <div
      className="relative min-h-[3.25rem] w-full min-w-0"
      style={{
        marginLeft: overlap ? -NOTCH : undefined,
        backgroundColor: FLOW.fill,
        clipPath: clip,
        WebkitClipPath: clip,
        color: FLOW.text,
      }}
    >
      <div className="flex h-full min-h-[3.25rem] items-center justify-center px-2 py-2 text-center text-[0.65rem] font-medium leading-snug min-[1024px]:px-4 min-[1024px]:text-sm">
        {children}
      </div>
    </div>
  );
}

/** Same column template as chevron row — brackets line up with blocks */
const BEFORE_COLS =
  "grid-cols-[minmax(0,1.05fr)_minmax(0,1.85fr)_minmax(0,1.1fr)_minmax(0,1fr)]";

const AFTER_COLS = "grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)_minmax(0,1fr)]";

export function WonderaFlowBefore() {
  return (
    <div className="w-full min-w-0">
      <div className={`mb-3 grid w-full items-end ${BEFORE_COLS}`}>
        <div className="col-span-3 flex min-w-0 flex-col">
          <LaneLabel>Singing</LaneLabel>
          <LaneBracket />
        </div>
        <div className="col-span-1 flex min-w-0 flex-col">
          <LaneLabel>Training</LaneLabel>
          <LaneBracket />
        </div>
      </div>

      <div className={`grid w-full ${BEFORE_COLS}`}>
        <div className="relative z-[1] min-w-0">
          <ChevronStep shape="first" overlap={false}>
            <>
              Home:
              <br />
              Find a song to sing
            </>
          </ChevronStep>
        </div>
        <div className="relative z-[2] min-w-0">
          <ChevronStep shape="middle" overlap>
            <>
              Karaoke:
              <br />
              Collect voice material
            </>
          </ChevronStep>
        </div>
        <div className="relative z-[3] min-w-0">
          <ChevronStep shape="middle" overlap>
            <>
              Library:
              <br />
              Manage posts/props
            </>
          </ChevronStep>
        </div>
        <div className="relative z-[4] min-w-0">
          <ChevronStep shape="last" overlap>
            <>
              My AI:
              <br />
              Manage training progress
            </>
          </ChevronStep>
        </div>
      </div>
    </div>
  );
}

export function WonderaFlowAfter() {
  return (
    <div className="w-full min-w-0">
      <div className={`mb-3 grid w-full items-end ${AFTER_COLS}`}>
        <div className="flex min-w-0 flex-col">
          <LaneLabel>Training</LaneLabel>
          <LaneBracket />
        </div>
        <div className="flex min-w-0 flex-col">
          <LaneLabel>Singing</LaneLabel>
          <LaneBracket />
        </div>
        <div className="flex min-w-0 flex-col">
          <LaneLabel>Training</LaneLabel>
          <LaneBracket />
        </div>
      </div>

      <div className={`grid w-full ${AFTER_COLS}`}>
        <div className="relative z-[1] min-w-0">
          <ChevronStep shape="first" overlap={false}>
            <>
              Training:
              <br />
              Overview the journey
            </>
          </ChevronStep>
        </div>
        <div className="relative z-[2] min-w-0">
          <ChevronStep shape="middle" overlap>
            <>
              Karaoke:
              <br />
              Collect voice material
            </>
          </ChevronStep>
        </div>
        <div className="relative z-[3] min-w-0">
          <ChevronStep shape="last" overlap>
            <>
              Training:
              <br />
              Manage training progress
            </>
          </ChevronStep>
        </div>
      </div>
    </div>
  );
}
