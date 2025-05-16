import FinanceIcon from "@/components/icons/finance-icon";
import { getOrder } from "@/core/actions/get-order";
import useOrderStore from "@/core/state-management/order-state-store";
import { formatPrice } from "@/utils/formats";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/Colors";

import AddIcon from "@/components/icons/add-icon";
import EmailIcon from "@/components/icons/email-icon";
import LinkIcon from "@/components/icons/link-icon";
import QRIcon from "@/components/icons/qr-icon";
import UploadIcon from "@/components/icons/upload-icon";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import QRModal from "@/components/qr-modal";

const SharePaymentScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { order } = useOrderStore();
  const [cloudOrder, setCloudOrder] = useState<
    Record<string, number | any> | undefined
  >();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const socket = new WebSocket(
    `wss://payments.pre-bnvo.com/ws/merchant/${order?.identifier}`
  );

  console.log("socket", socket);

  const handleGetOrderInfo = async (id?: string) => {
    if (!id) return;
    const order = await getOrder(id as string);
    if (order?.[0]?.identifier) {
      setCloudOrder(order?.[0]);
    }
  };

  useEffect(() => {
    handleGetOrderInfo(id as string);
  }, [id]);

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.light.background, padding: 16 }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.lightGray,
          padding: 20,
          borderRadius: 8,
          height: 150,
          width: "100%",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 60,
              height: 40,
            }}
          >
            <FinanceIcon />
          </View>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Text style={{ fontSize: 14, color: colors.gray }}>
              Solicitud de pago
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: colors.light.text,
              }}
            >
              {formatPrice(cloudOrder?.fiat_amount, cloudOrder?.fiat)}
            </Text>
          </View>
        </View>
        <Text style={{ color: colors.gray, fontSize: 14 }}>
          Comparte el enlace de pago con el cliente
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginTop: 16,
          marginBottom: 16,
          width: "100%",
        }}
      >
        <View style={styles.linkContainer}>
          <View style={styles.linkIconContainer}>
            <LinkIcon />
          </View>
          <Text style={styles.linkText}>
            {order?.web_url.replace("https://", "")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => setModalVisible(true)}
        >
          <QRIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.linkIconContainer}>
          <EmailIcon />
        </View>
        <Text style={styles.optionText}>Enviar por correo electrónico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.linkIconContainer}>
          <WhatsAppIcon />
        </View>
        <Text style={styles.optionText}>Enviar a número de WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.linkIconContainer}>
          <UploadIcon />
        </View>
        <Text style={styles.optionText}>Compartir con otras aplicaciones</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: colors.lightGray,
            padding: 12,
            borderRadius: 8,
            width: "100%",
          }}
          onPress={() => router.push("/")}
        >
          <Text style={{ color: colors.light.text, fontSize: 16 }}>
            Nueva Solicitud
          </Text>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <QRModal
        url={order?.web_url as string}
        fiatAmount={cloudOrder?.fiat_amount}
        currency={cloudOrder?.currency}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
    flexDirection: "column",
    gap: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#002859",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },
  amountContainer: {
    flexDirection: "row",
  },
  amountInput: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 36,
    borderColor: "transparent",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    outlineColor: "#fff",
  },
  amountInputFocused: {
    borderColor: "#fff",
  },
  currencySelector: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    width: 60,
    height: 28,
    marginRight: 16,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#002859",
  },
  createButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#a0d1f8",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyView: { backgroundColor: "transparent", width: 60, height: 40 },
  tip: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  linkIconContainer: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray,
    fontWeight: "500",
  },
  qrButton: {
    backgroundColor: "#0062DD",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: "500",
  },
});

export default SharePaymentScreen;
