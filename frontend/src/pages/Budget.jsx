import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToExcel } from "../utils/exportUtils";
import { incomeStyles as styles } from "../assets/dummyStyles";

import {
  Wallet,
  Plus,
  IndianRupee,
  Calendar,
  Utensils,
  Home,
  Car,
  ShoppingBag,
  Tv,
  HeartPulse,
  Zap,
  MoreHorizontal,
  X,
  Download,
} from "lucide-react";

const categories = [
  {
    name: "Food",
    icon: <Utensils size={18} />,
    color: "bg-orange-100 text-orange-500",
  },

  {
    name: "Housing",
    icon: <Home size={18} />,
    color: "bg-blue-100 text-blue-500",
  },

  {
    name: "Transport",
    icon: <Car size={18} />,
    color: "bg-purple-100 text-purple-500",
  },

  {
    name: "Shopping",
    icon: <ShoppingBag size={18} />,
    color: "bg-pink-100 text-pink-500",
  },

  {
    name: "Entertainment",
    icon: <Tv size={18} />,
    color: "bg-green-100 text-green-500",
  },

  {
    name: "Utilities",
    icon: <Zap size={18} />,
    color: "bg-yellow-100 text-yellow-500",
  },

  {
    name: "Healthcare",
    icon: <HeartPulse size={18} />,
    color: "bg-red-100 text-red-500",
  },

  {
    name: "Other",
    icon: <MoreHorizontal size={18} />,
    color: "bg-gray-100 text-gray-500",
  },
];

const Budget = () => {

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [month, setMonth] = useState("");

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // FETCH BUDGETS

  const fetchBudgets = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/budget",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH EXPENSES

  const fetchExpenses = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/expense/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchBudgets();

    fetchExpenses();

  }, []);

  // ADD BUDGET

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/budget/add",
        {
          category,
          limit,
          month,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategory("");
      setLimit("");
      setMonth("");

      setShowModal(false);

      fetchBudgets();

    } catch (error) {
      console.log(error);
    }
  };

  //Delete Budget 

  const deleteBudget = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:4000/api/budget/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBudgets();

  } catch (error) {
    console.log(error);
  }
};

  // TOTAL BUDGET

  const totalBudget = budgets.reduce(
    (acc, item) => acc + Number(item.limit),
    0
  );

  // TOTAL SPENT

  const totalSpent = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  // REMAINING

  const remainingAmount = totalBudget - totalSpent;



  const handleBudgetExport = () => {
  const data = budgets.map((budget) => {
    const spent = expenses
      .filter((exp) => exp.category === budget.category)
      .reduce((acc, item) => acc + item.amount, 0);

    const remaining = budget.limit - spent;

    return {
      Category: budget.category,
      Month: budget.month,
      Budget: budget.limit,
      Spent: spent,
      Remaining: remaining > 0 ? remaining : 0,
    };
  });

  exportToExcel(data, "budget-report");
};

  return (

    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="bg-white rounded-3xl p-6 shadow-sm border mb-6">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <p className="text-sm text-gray-500 mb-2">
              Budget Overview (This Month)
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              Budget Management
            </h1>

            <p className="text-gray-500 mt-1">
              Set and manage your monthly spending limits
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-md transition-all"
          >
            <Plus size={18} />
            Add Budget
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* TOTAL BUDGET */}

        <div className="bg-white border border-orange-200 rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Budget
              </p>

              <h1 className="text-3xl font-bold mt-2">
                ${totalBudget}
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Monthly Budget
              </p>

            </div>

            <div className="bg-orange-100 text-orange-500 p-4 rounded-2xl">
              <Wallet size={24} />
            </div>

          </div>

        </div>

        {/* TOTAL SPENT */}

        <div className="bg-white border border-red-200 rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Spent
              </p>

              <h1 className="text-3xl font-bold mt-2">
                ${totalSpent}
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Current Expenses
              </p>

            </div>

            <div className="bg-red-100 text-red-500 p-4 rounded-2xl">
              <IndianRupee size={24} />
            </div>

          </div>

        </div>

        {/* REMAINING */}

        <div className="bg-white border border-green-200 rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Remaining Budget
              </p>

              <h1 className="text-3xl font-bold mt-2">
                ${remainingAmount > 0 ? remainingAmount : 0}
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Available Balance
              </p>

            </div>

            <div className="bg-green-100 text-green-500 p-4 rounded-2xl">
              <Calendar size={24} />
            </div>

          </div>

        </div>

      </div>

     

      {/* MAIN SECTION */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}

        <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-5">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-bold text-gray-800">
              Budget Categories
            </h2>

          </div>

          <div className="space-y-4">

            {budgets.map((budget) => {

              const matchedCategory = categories.find(
                (cat) => cat.name === budget.category
              );

              // CATEGORY EXPENSES

              const spent = expenses
                .filter(
                  (exp) => exp.category === budget.category
                )
                .reduce(
                  (acc, item) => acc + item.amount,
                  0
                );

              // REMAINING

              const remaining = budget.limit - spent;

              // PERCENTAGE

              const percentage = Math.min(
                (spent / budget.limit) * 100,
                100
              );

              return (

                <div
                  key={budget._id}
                  className="border rounded-2xl p-4 hover:shadow-md transition-all"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className={`p-3 rounded-2xl ${matchedCategory?.color}`}>
                        {matchedCategory?.icon}
                      </div>

                      <div>

                        <h1 className="font-semibold text-gray-800">
                          {budget.category}
                        </h1>

                        <p className="text-sm text-gray-500">
                          {budget.month}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

  <h1 className="text-2xl font-bold text-gray-800">
    ${budget.limit}
  </h1>

  <p className="text-sm text-gray-500">
    Budget Limit
  </p>

  <button
    onClick={() => deleteBudget(budget._id)}
    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
  >
    Delete
  </button>

</div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">

                    <div className="w-full bg-gray-200 h-3 rounded-full">

                      <div
                        className={`h-3 rounded-full ${
                          percentage > 90
                            ? "bg-red-500"
                            : percentage > 70
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>

                    </div>

                    <div className="flex justify-between mt-2 text-sm">

                      <p className="text-gray-600">
                        ${spent} Spent
                      </p>

                      <p
                        className={`font-medium ${
                          remaining <= 0
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        ${remaining > 0 ? remaining : 0} Remaining
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* RIGHT */}

        <div className="bg-white rounded-3xl border shadow-sm p-5 h-fit">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Categories
          </h2>

          <div className="grid grid-cols-2 gap-3">

            {categories.map((cat) => (

              <div
                key={cat.name}
                className={`flex items-center gap-3 p-3 rounded-2xl ${cat.color}`}
              >

                {cat.icon}

                <span className="text-sm font-medium">
                  {cat.name}
                </span>

              </div>
            ))}

          </div>
          {/* Export Button */}
          
       <button
  onClick={handleBudgetExport}
  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl flex items-right gap-2 font-semibold shadow-md transition-all mt-6 " > <Download size={16} className="md:size-6" />
Export Data
</button>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">

            {/* CLOSE */}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            {/* TITLE */}

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Add New Budget
            </h2>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* CATEGORY */}

              <div>

                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* LIMIT */}

              <div>

                <label className="text-sm font-medium text-gray-600">
                  Budget Limit
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="0.00"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                />

              </div>

              {/* MONTH */}

              <div>

                <label className="text-sm font-medium text-gray-600">
                  Month
                </label>

              <input
  type="month"
  value={month}
  min={new Date().toISOString().slice(0, 7)}
  onChange={(e) => setMonth(e.target.value)}
  className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
/>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-all"
              >
                + Add Budget
              </button>

            </form>

          </div>

        </div>

      )}


    </div>
  );
};

export default Budget;