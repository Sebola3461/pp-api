import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorsHandler } from "../../../helpers/ErrorsHandler";
import { QueryParameters } from "../../../helpers/QueryParameters";
import { BeatmapCalculator } from "@kionell/osu-pp-calculator";
import { ResponseHandler } from "../../../helpers/ResponseHandler";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const beatmapId = req.query.beatmapId;
  const accuracy = QueryParameters.parseAccuracy(
    req.query.accuracy?.toString()
  );
  const mode = req.query.mode;
  const mods = req.query.mods;

  const Error = new ErrorsHandler(res);

  if (!beatmapId || typeof beatmapId != "string")
    return Error.missingParameter("beatmapId");

  if (mode && !QueryParameters.hasValidMode(mode.toString()))
    return Error.invalidParameterValue("mode", mode);

  const calculator = new BeatmapCalculator();

  calculator
    .calculate({
      beatmapId: beatmapId,
      accuracy: accuracy,
      mods: QueryParameters.parseMods(mods),
      rulesetId:
        mode && typeof mode == "string"
          ? QueryParameters.sanitizeMode(mode)
          : undefined,
    })
    .then((result) => {
      ResponseHandler.buildResponse(
        res,
        200,
        "Calculated",
        ResponseHandler.buildCalculationResponse(
          result,
          accuracy,
          mode != undefined
        )
      );
    })
    .catch((e) => {
      console.error(e);
      Error.internalServerError();
    });

  return void {};
}
