import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, laoding } = useAuth();
  const token = localStorage.getItem("access-token");

  const { data: isAdmin, isLoading: isAdminLaoding } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !laoding,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users/admin/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  return [isAdmin, isAdminLaoding];
};

export default useAdmin;
