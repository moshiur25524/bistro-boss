import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import Loading from "../pages/Shared/Loading";

const useCart = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (loading) {
        return <Loading />;
      }
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
