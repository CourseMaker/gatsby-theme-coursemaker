module.exports = {
  toSeconds: duration => {
    if (isNaN(duration)) {
      const addZero = number => (number.length === 1 ? "0" + number : number);

      const split = duration.split(":");

      let time;
      if (split.length === 2)
        time = `00:${addZero(split[0])}:${addZero(split[1])}`;
      else
        time = `${addZero(split[0])}:${addZero(split[1])}:${addZero(split[2])}`;

      return new Date("1970-01-01T" + time + "Z").getTime() / 1000;
    } else {
      return duration;
    }
  },
  toHoursMinutes: seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);

    return (hours ? `${hours} H ` : "") + (minutes ? `${minutes} MIN` : "");
  }
};