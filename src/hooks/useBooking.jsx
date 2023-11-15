import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import Loading from "../pages/Shared/Loading";

const useBooking = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/booking?email=${user?.email}`,
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
  return [bookings, refetch];
};

export default useBooking;
