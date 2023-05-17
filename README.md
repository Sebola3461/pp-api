# pp-api
### Free pp calculation api for any language!

## How to use
### Endpoint: https://freepp.vercel.app/api/calculate/beatmap
#### Query Parameters
- `beatmapId` Target beatmap id to calculate (required)
- `accuracy` Accuracies to calculate with url stringified array format (`?accuracy=100+99+98`)
- `mode` Game mode for converted beatmaps [`osu`,`taiko`,`catch`,`mania`]
- `mods` Calculate with mods? (Example: `?mods=dt` or `?mods=dthr`)
### Example request
https://freepp.vercel.app/api/calculate/beatmap?beatmapId=3648878&accuracy=100+99+95&mods=dthr&mode=taiko
