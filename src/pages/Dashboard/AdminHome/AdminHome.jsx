import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAttachMoney, MdOutlineRestaurantMenu } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { FaFileInvoiceDollar } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });
  console.log(stats);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const data = [
    {
      name: "Salad",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Pizza",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Soups",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Desserts",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Drinks",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const data2 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h1 className="text-3xl text-[#151515] font-[Cinzel] uppercase font-semibold">
        Hi, welcome back{" "}
        <span className="text-orange-500">{user?.displayName}</span>
      </h1>

      <div className="stats shadow mt-10 w-full">
        <div className="stat">
          <div className="stat-figure text-primary text-4xl font-bold">
            <MdAttachMoney />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value text-primary">${stats.fixedrevenue}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl font-bold">
            <HiUserGroup />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{stats.users}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary  text-4xl font-bold">
            <MdOutlineRestaurantMenu />
          </div>
          <div className="stat-title">Total Menu</div>
          <div className="stat-value text-primary">{stats.products}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary text-4xl font-bold">
            <FaFileInvoiceDollar />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value text-secondary">{stats.orders}</div>
        </div>
      </div>
      <div className="flex mt-16">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data2}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <LabelList dataKey="name" position="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
