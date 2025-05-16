import { colors } from "@/constants/Colors";
import { formatPrice } from "@/utils/formats";
import { AntDesign } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-qr-code";
import Header from "./common/header";
import AlertCircleIcon from "./icons/info-icon";

type QRModalProps = {
  url: string;
  fiatAmount: number | string;
  currency: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const QRModal = ({
  url,
  fiatAmount,
  currency,
  modalVisible,
  setModalVisible,
}: QRModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Header
        title=""
        headerLeft={
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="arrowleft" size={16} color="#002859" />
          </TouchableOpacity>
        }
      />
      <View style={[styles.modalContainer, { position: "relative" }]}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.light.primary },
          ]}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
              backgroundColor: colors.light.primary,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 60,
                backgroundColor: colors.dark.text,
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                borderRadius: 8,
              }}
            >
              <View style={{ width: 20, height: 20 }}>
                <AlertCircleIcon />
              </View>
              <Text style={{ fontSize: 14, color: colors.light.text }}>
                Escanea el QR y serás redirigido a la pasarela de pago de
                Bitnovo Pay.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                height: 316,
                padding: 8,
                backgroundColor: colors.light.background,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QRCode value={url} size={300} color={colors.light.text} />
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: colors.dark.text,
                marginBottom: 8,
              }}
            >
              {formatPrice(fiatAmount, currency)}
            </Text>
            <Text style={{ fontSize: 14, color: "white" }}>
              Esta pantalla se actualizará automáticamente.
            </Text>
          </View>
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
    marginLeft: 16,
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

export default QRModal;
