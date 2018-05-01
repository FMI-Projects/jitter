import { placeholderService } from "../../services";

function* placeholderSaga() {
  const placeholder = yield call(
    [placeholderSaga, "placeholderMethodGetById"],
    5
  );
}
