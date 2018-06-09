import { fromJS } from "immutable";

const toNormalisedImmutable = (data, normalizer) => fromJS(normalizer(data));

export default toNormalisedImmutable;
