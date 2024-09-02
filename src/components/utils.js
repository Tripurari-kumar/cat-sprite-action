export const motionConfig = [
  {
    id: "move",
    label: "Move",
    type: "input",
    unit: "steps",
    action: "moveCat",
    value: 10,
    placeholder: 10,
  },
  {
    id: "turnClockwise",
    label: "Turn Clockwise",
    type: "input",
    unit: "degrees",
    action: "rotateClockwise",
    icon: "↻",
    value: 15,
    placeholder: 15,
  },
  {
    id: "turnAnticlockwise",
    label: "Turn Anticlockwise",
    type: "input",
    unit: "degrees",
    action: "rotateAnticlockwise",
    icon: "↺",
    value: 15,
    placeholder: 15,
  },
  {
    id: "gotoPosition",
    label: "Go To Position",
    type: "input-group",
    inputs: [
      { name: "goto.x", placeholder: "X Coordinate", unit: "X", value: 0 },
      { name: "goto.y", placeholder: "Y Coordinate", unit: "Y", value: 0 },
    ],
    action: "goToPosition",
  },
  {
    id: "direction",
    label: "Pointing Direction",
    type: "input",
    unit: "degrees",
    action: "setDirection",
    value: 0,
    placeholder: 0,
  },
  {
    id: "positionType",
    label: "Go To",
    type: "select",
    options: [
      { value: "random", label: "Random Position" },
      { value: "mouse", label: "Mouse Pointer" },
    ],
    action: "setPositionType",
    value: "random",
  },
];

export const lookConfig = [
  {
    id: "sayDuration",
    action: "say",
    duration: 2,
    actionMessage: "",
    placeholder: "Hello..",
  },
  {
    id: "thinkDuration",
    action: "Think",
    duration: 2,
    actionMessage: "",
    placeholder: "Hmmm..",
  },
  {
    id: "say",
    action: "say",
    actionMessage: "",
    placeholder: "Hello",
  },
  {
    id: "think",
    action: "Think",
    actionMessage: "",
    placeholder: "Hmmm..",
  },
  {
    id: "sizeChangeByPercent",
    action: "Change size by",
    percent: 0,
    placeholder: "100",
  },
];

export const replayConfig = [
  {
    id: "replayAllActions",
    label: "Replay All Actions",
  },
  {
    id: "replayNthAction",
    label: "Replay N(th) Action",
    type: "input",
    value: 0,
  },
];

export const getBounds = (previewRef) => {
  if (!previewRef.current) return { width: 0, height: 0 };

  const { width, height } = previewRef.current.getBoundingClientRect();
  return { width, height };
};

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
