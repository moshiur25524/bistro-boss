import { useEffect } from "react";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const History = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/payment?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.data);
      });
  }, []);
  return (
    <div>
      <SectionTitile subHeading={"At a Glance"} heading={"payment history"} />
      <div className="bg-white p-5">
        <div className="flex justify-between uppercase font-semibold font-[Cinzel] mb-5">
          <h3 className="text-3xl">Total Payments: {payments.length}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#D1A054] rounded-[12px] text-white uppercase ">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Quantity</th>
                <th>TransationId</th>
                <th>Total Price</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td>{pay.email}</td>
                  <td>{pay.quantity}</td>
                  <td>{pay.TransactionId}</td>
                  <td>${pay.price}</td>
                  <td>{pay.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
