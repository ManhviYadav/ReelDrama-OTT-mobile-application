import { Modal, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LogoutModalProps {
  visible: boolean;
  loading?: boolean;
  onCancel: () => void;
// void= return nothinggg
  onLogout: () => void;
}

const LogoutModal = ({
  visible,
  loading = false,
  onCancel,
  onLogout,
}: LogoutModalProps) => {
    
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/75 justify-center items-center px-6">
        <View className="w-full rounded-3xl bg-[#070A17] px-8 py-10 items-center">


          <View className="h-20 w-20 rounded-full bg-[#B24BE6] justify-center items-center">
            <MaterialCommunityIcons
              name="logout"
              size={38}
              color="white"
            />
          </View>


          <Text className="text-white text-xl font-bold mt-8">
            Are you sure you want to log out ?
          </Text>


          <Pressable
            onPress={onCancel}
            className="mt-10 w-full h-12 rounded-xl border border-[#D24AFF] justify-center items-center"
          >
            <Text className="text-white font-semibold text-base">
              Stay Logged In
            </Text>
          </Pressable>


          <Pressable
            disabled={loading}
            onPress={onLogout}
            className="mt-5 w-full h-12 rounded-xl bg-[#D24AFF] justify-center items-center"
          >
            <Text className="text-white font-bold text-base">
              {loading ? "Logging Out..." : "Yes, Log out!"}
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;