import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { data: isAdmin, isLoading: isAdminLaoding } = useQuery({
    queryKey: ["isAdmin", user?.email],
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

  console.log("admin", isAdmin);

  return [isAdmin, isAdminLaoding];
};

export default useAdmin;
