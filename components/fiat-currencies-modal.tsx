import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyFlag from "./common/currency-flag";
import Header from "./common/header";

type FiatCurrenciesModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectCurrency: (currency: string) => void;
  fiatCurrencies: { name: string; code: string }[];
  fiat: string;
  setFiat: (fiat: string) => void;
  currency: string;
  onHandleChangeText: () => void;
};

const FiatCurrenciesModal = ({
  modalVisible,
  setModalVisible,
  selectCurrency,
  fiatCurrencies,
  fiat,
  setFiat,
  currency,
  onHandleChangeText,
}: FiatCurrenciesModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Header
            title="Selecciona una divisa"
            headerLeft={
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="arrowleft" size={16} color="#002859" />
              </TouchableOpacity>
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={fiat}
              onChangeText={onHandleChangeText}
              onChange={(e) => setFiat(e.nativeEvent.text)}
              placeholder="Buscar"
            />
          </View>

          {fiatCurrencies.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.currencyOption}
              onPress={() => selectCurrency(item.code)}
            >
              <View style={styles.currencyOptionContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <View style={{ width: 24, height: 24 }}>
                    <CurrencyFlag code={item.code} />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.currencyOptionText}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: "#999" }}>
                      {item.code}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "column" }}>
                  {item.code.toLowerCase() === currency.toLowerCase() ? (
                    <AntDesign name="checkcircle" size={14} color="#70b0ff" />
                  ) : (
                    <Entypo
                      name="chevron-small-right"
                      size={24}
                      color="#002859"
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  currencyOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  currencyOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currencyOptionText: {
    fontSize: 16,
    color: "#002859",
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
  },
  currencyButton: {
    position: "absolute",
    right: 16,
    top: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
  },
  backButton: {
    backgroundColor: "#cecece",
    borderRadius: "100%",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 4,
    paddingRight: 4,
    color: "#002859",
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },
});

export default FiatCurrenciesModal;
