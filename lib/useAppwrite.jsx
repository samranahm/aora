import {useEffect, useState } from "react";
import { Alert } from "react-native";
const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoadig] = useState(true);
  
    
    const fetchData = async () => {
      setIsLoadig(true);
  
      try {
        const response = await fn();

        setData(response);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally{
        setIsLoadig(false);
      }
    }
    useEffect(() => {
      fetchData()
    }, []);


    const refetch = () => fetchData();
  
    return { data, isLoading, refetch }
}

export default useAppwrite;