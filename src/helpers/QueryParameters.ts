export class QueryParameters {
  public static hasValidBeatmapId(id: number) {
    if (isNaN(id)) return false;

    if (id < 1) return false;

    return true;
  }

  public static hasValidMode(mode: string) {
    const sanitizedMode = mode.toString().toLowerCase().trim();

    const stringModes = ["osu", "taiko", "mania", "fruits", "catch"];
    const numberModes = [0, 1, 2, 3];

    if (isNaN(Number(sanitizedMode)) && !stringModes.includes(sanitizedMode))
      return false;
    if (
      !isNaN(Number(sanitizedMode)) &&
      !numberModes.includes(Number(sanitizedMode))
    )
      return false;

    return true;
  }

  public static sanitizeMode(mode: string | number) {
    const sanitizedMode = mode.toString().toLowerCase().trim();

    const stringModes = ["osu", "taiko", "mania", "fruits", "catch"];
    const stringModesIndex = {
      osu: 0,
      taiko: 1,
      fruits: 2,
      catch: 2,
      mania: 3,
    } as { [key: string]: number };

    const numberModes = [0, 1, 2, 3];

    if (isNaN(Number(sanitizedMode)) && stringModes.includes(sanitizedMode))
      return stringModesIndex[sanitizedMode];

    if (
      !isNaN(Number(sanitizedMode)) &&
      numberModes.includes(Number(sanitizedMode))
    )
      return Number(sanitizedMode);

    return 0;
  }

  public static parseAccuracy(accuracy?: string) {
    console.log("acccccccccccc", accuracy);

    if (!accuracy) return [100];

    const accArray = decodeURIComponent(accuracy)
      .split(" ")
      .map((acc) => Number(acc.trim().replace("%", "")))
      .filter((acc) => !isNaN(acc) && acc <= 100 && acc > 0);

    if (accArray.length < 1) return [100];

    return accArray.sort((a, b) => a - b);
  }

  public static parseOdArOrCs(value?: string) {
    if (!value) return undefined;

    return this.parseRangeValue(Number(value), 0, 10);
  }

  public static parseStarRating(sr?: string) {
    if (!sr) return undefined;

    return this.parseRangeValue(Number(sr), 0, 15);
  }

  public static parseMods(mods?: string | string[] | number) {
    if (!mods) return "NM";

    if (typeof mods != "string") return "Nm";

    return mods;
  }

  public static parseRangeValue(input: number, min: number, max: number) {
    const valueNumber = Number(input);

    if (isNaN(valueNumber)) return undefined;

    if (valueNumber > max || valueNumber < min) return undefined;

    return valueNumber;
  }
}
