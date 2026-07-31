import { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { logout } from "../services/logout";
import { removeToken } from "../storage/authStorage";

export const useLogout = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleLogout = async (uuid: string) => {
    try {
      setLoading(true);

      await logout(uuid);

      await removeToken();
// will remove jwt token
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogout,
  };
};