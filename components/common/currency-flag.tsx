import { View } from "react-native";
import EUR from "../icons/eur";
import GBP from "../icons/gbp";
import USD from "../icons/usd";

const CurrencyFlag = ({ code = 'USD' }: { code: string }) => {
  return (
    <View>
      {code === "EUR" && <EUR />}
      {code === "GBP" && <GBP />}
      {code === "USD" && <USD />}
    </View>
  );
};

export default CurrencyFlag;