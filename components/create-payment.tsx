import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "https://payments.pre-bnvo.com/api/v1";

const CreatePaymentScreen = ({ navigation }: any) => {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { code: "EUR", name: "Euro" },
    { code: "USD", name: "Dólar Estadounidense" },
    { code: "GBP", name: "Libra Esterlina" },
  ];

  const selectCurrency = (currencyCode: any) => {
    setCurrency(currencyCode);
    setModalVisible(false);
  };

  const validateForm = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Por favor ingrese un importe válido");
      return false;
    }
    if (!concept.trim()) {
      Alert.alert("Error", "Por favor ingrese un concepto");
      return false;
    }
    return true;
  };

  const createPayment = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      // Reemplazar esto con la API key correcta y los datos requeridos por la API
      const response = await axios.post(
        `${API_URL}/currencies_list`,
        {
          amount: parseFloat(amount),
          currency_id: currency,
          concept,
          // Agregar otros parámetros requeridos por la API
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Device_Id": "d497719b-905f-4a41-8dbe-cf124c442f42",
          },
        }
      );

      console.log("Payment created:", response.data);

      // Navegar a la pantalla de compartir con los datos del pago
      navigation.navigate("SharePayment", {
        orderData: response.data,
        identifier: response.data.identifier,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      Alert.alert(
        "Error",
        "No se pudo crear el pago. Por favor intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Importe</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
            />
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.currencyText}>{currency}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Concepto</Text>
          <TextInput
            style={styles.input}
            value={concept}
            onChangeText={setConcept}
            placeholder="Añade descripción del pago"
          />
        </View>

        <TouchableOpacity
          style={[styles.createButton, loading && styles.disabledButton]}
          onPress={createPayment}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Creando..." : "Crear Pago"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar moneda */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Moneda</Text>

            {currencies.map(
              (
                item // Mapa de monedas
              ) => (
                <TouchableOpacity
                  key={item.code}
                  style={styles.currencyOption}
                  onPress={() => selectCurrency(item.code)}
                >
                  <Text style={styles.currencyOptionText}>
                    {item.name} ({item.code})
                  </Text>
                </TouchableOpacity>
              )
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#002859",
    fontWeight: "semibold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: "row",
  },
  amountInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 24,
    fontWeight: "bold",
  },
  currencySelector: {
    backgroundColor: "#f0f0f0",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
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
    backgroundColor: "#035AC5",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  currencyOptionText: {
    fontSize: 16,
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
});

export default CreatePaymentScreen;
