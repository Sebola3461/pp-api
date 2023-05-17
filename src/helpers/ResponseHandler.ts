import { ICalculatedBeatmap } from "@kionell/osu-pp-calculator";
import { NextApiResponse } from "next";
import { PerformanceAttributes } from "osu-classes";

export class ResponseHandler {
  public static buildResponse(
    res: NextApiResponse<any>,
    status: number,
    statusText: string,
    data?: any
  ) {
    res.status(status).send({
      status: status,
      statusText,
      data: data || null,
    });
  }

  public static buildCalculationResponse(
    calculation: ICalculatedBeatmap,
    accuracies: number[],
    convert: boolean
  ) {
    const sortedAccs = accuracies.sort((a, b) => a - b);

    return {
      beatmap: Object.assign(calculation.beatmapInfo, {
        starRating: calculation.difficulty.starRating,
      }),
      performance: calculation.performance.map((p, i) => {
        return {
          pp: p.totalPerformance,
          mods: p.mods,
          accuracy: sortedAccs[i],
        };
      }),
    };
  }
}
