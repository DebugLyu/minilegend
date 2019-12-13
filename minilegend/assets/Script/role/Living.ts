import thing from "./Thing";
import { G } from "../common/G";

export default class living extends thing {
    name: string = "";

    livingType: G.LivingType = G.LivingType.NOTHING;
}
