import Header from "@/components/common/header";
import FiatCurrenciesModal from "@/components/fiat-currencies-modal";
import { FIAT_CURRENCIES } from "@/constants/fiat";
import { createOrder } from "@/core/actions/create-order";
import { getCurrencies } from "@/core/actions/get-currencies";
import useOrderStore from "@/core/state-management/order-state-store";
import { formatPrice } from "@/utils/formats";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreatePaymentScreen = () => {
  const router = useRouter();
  const { setOrder } = useOrderStore();
  const [amount, setAmount] = useState<string | number>("");
  const [concept, setConcept] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fiatCurrencies, setFiatCurrencies] =
    useState<{ name: string; code: string }[]>(FIAT_CURRENCIES);
  const [fiat, setFiat] = useState<string>("");
  const [conceptHeight, setConceptHeight] = useState<number>(0);
  const [amountFocused, setAmountFocused] = useState<boolean>(false);

  const selectCurrency = (currency: string) => {
    setCurrency(currency);
    setModalVisible(false);
  };

  const disabledButton = Boolean(amount && currency);

  const onHandleChangeText = () => {
    if (fiat.length > 0) {
      setFiatCurrencies(
        FIAT_CURRENCIES.filter(
          (item) => item.name.toLowerCase() === fiat.toLowerCase()
        )
      );
    }
    setFiatCurrencies(FIAT_CURRENCIES);
  };

  const onHandleChangeAmount = (value: string | number) => {
    setAmount(value);
  };

  const onHandleChangeConcept = (value: string) => {
    if (value.length === 141) {
      return;
    }
    setConcept(value);
  };

  const validateForm = () => {
    if (
      !amount ||
      isNaN(parseFloat(String(amount))) ||
      parseFloat(String(amount)) <= 0
    ) {
      Alert.alert("Error", "Por favor ingrese un importe válido");
      return false;
    }
    if (!concept.trim()) {
      Alert.alert("Error", "Por favor ingrese un concepto");
      return false;
    }
    return true;
  };

  const onHandleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await createOrder({
        expected_output_amount: Number(amount),
        input_currency: "XRP_TEST",
        fiat: currency,
        notes: concept,
      });
      setOrder(response);
      router.push(`/${response.identifier}`);
    } catch (error) {
      console.error("Error creating payment:", error);
      Alert.alert("Error", "Ocurrió un error al crear el pago");
      return;
    }
  };

  const onGetCurrencies = async () => {
    const currencies = await getCurrencies();
    console.log("currencies", currencies);
    return currencies;
  };

  useEffect(() => {
    onGetCurrencies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Crear Pago"
        headerLeft={<View style={styles.emptyView}></View>}
        headerRight={
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.currencyText}>{currency}</Text>
            <Entypo name="chevron-small-down" size={16} color="#002859" />
          </TouchableOpacity>
        }
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.amountContainer}>
            <TextInput
              value={formatPrice(amount, currency)}
              onChangeText={(text) => {
                // Sanitiza el input eliminando símbolos, letras y espacios
                const numeric = text.replace(/[^0-9.]/g, "");
                onHandleChangeAmount(numeric);
              }}
              keyboardType="numeric"
              placeholder="0.00"
              onFocus={() => setAmountFocused(true)}
              style={[
                styles.amountInput,
                {
                  color:
                    amountFocused && String(amount).length > 0
                      ? "#002859"
                      : "#C0CCDA",
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Concepto</Text>
          <TextInput
            multiline={true}
            onContentSizeChange={(event) => {
              setConceptHeight(event.nativeEvent.contentSize.height);
            }}
            style={[
              styles.input,
              {
                height: conceptHeight,
              },
            ]}
            value={concept}
            onChangeText={onHandleChangeConcept}
            placeholder="Añade descripción del pago"
          />
          <Text style={styles.tip}>{concept.length}/140 caracteres</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.createButton,
            Number(amount) <= 0 && styles.disabledButton,
          ]}
          onPress={() => onHandleSubmit()}
          disabled={!disabledButton}
        >
          <Text style={styles.createButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      <FiatCurrenciesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectCurrency={selectCurrency}
        fiatCurrencies={fiatCurrencies}
        fiat={fiat}
        setFiat={setFiat}
        currency={currency}
        onHandleChangeText={onHandleChangeText}
      />
    </SafeAreaView>
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
});

export default CreatePaymentScreen;
