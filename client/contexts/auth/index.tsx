import React, { useEffect, useState } from "react";
import {
  removeUserFromLocalStorage,
  saveUserInLocalStorage,
} from "../../utils";
import axios from "axios";

import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [addresses, setAddresses] = useState(null);
  const [payments, setPayments] = useState({
    isFetched:false,
    data:[]
  });
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/auth/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCurrentUser(data.data.user);
        console.log("user :", data.data);
      } catch (error) {}
    })();
  }, []);

  const fetchUserSavedAddresses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/auth/getSavedAddresses",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setAddresses(data.data);
    } catch (error) {}
  };

  const fetchUserpayments = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/auth/payments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setPayments({ isFetched:true , data:data.data});
    } catch (error) {}
  };

  const addNewPaymentMethod  = async (cvv:string, card:string, expiry:string) => {
    try {
      await axios.post(
        "http://localhost:4000/auth/addPayment",
        { cvv, card, expiry },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      throw error
    }
  }

  const fetchUserSavedOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/product/orderedItems",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setOrders(data.data);
    } catch (error) {}
  };

  const login = async (data: any) => {
    const { token, user } = data;
    setCurrentUser(user);
    saveUserInLocalStorage({ token, user });
  };

  const signup = async (data: any) => {
    const { token, user } = data;
    setCurrentUser(user);
    saveUserInLocalStorage({ token, user });
  };

  const logout = () => {
    removeUserFromLocalStorage();
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return currentUser != null ? true : false;
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated,
    fetchUserSavedAddresses,
    addresses,
    fetchUserSavedOrders,
    fetchUserpayments,
    addNewPaymentMethod,
    payments,
    orders,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
