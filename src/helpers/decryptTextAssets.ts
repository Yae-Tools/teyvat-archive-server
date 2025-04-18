import { TextAssets, LanguageCode } from "enka-network-api";

function decryptTextAsset(param: TextAssets | undefined, lang = "en") {
  if (param) return param.get(lang as LanguageCode);
  return "";
}

export default decryptTextAsset;
