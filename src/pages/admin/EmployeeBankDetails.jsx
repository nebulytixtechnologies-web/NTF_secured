//src/pages/admin/EmployeeBankDetails.jsx
// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";
// import { fetchEmployeeBank } from "../../store/bankSlice";

// export default function EmployeeBankDetails() {
//   const { employeeId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { bank, loading } = useSelector((s) => s.bank);

//   useEffect(() => {
//     dispatch(fetchEmployeeBank(employeeId));
//   }, [employeeId, dispatch]);

//   return (
//     <div className="space-y-6">
//       <EmployeeActionTabs />

//       <div className="p-6 space-y-6">
//         <Header title="Bank Details" onBack={() => navigate(-1)} />

//         {loading && <p>Loading...</p>}

//         {!loading && !bank && (
//           <div className="bg-white p-6 rounded shadow text-center">
//             <p className="text-gray-600 mb-4">Bank details not added yet</p>
//             <button
//               onClick={() =>
//                 navigate(
//                   `/admin/user-lists/employees/${employeeId}/add-bank-details`
//                 )
//               }
//               className="px-5 py-2 bg-indigo-600 text-white rounded"
//             >
//               Add Bank Details
//             </button>
//           </div>
//         )}

//         {bank && (
//           <Card>
//             <Detail label="Bank Name">{bank.bankName}</Detail>
//             <Detail label="Account Number">{bank.bankAccountNumber}</Detail>
//             <Detail label="IFSC Code">{bank.ifscCode}</Detail>
//             <Detail label="PF Number">{bank.pfNumber || "-"}</Detail>
//             <Detail label="PAN Number">{bank.panNumber || "-"}</Detail>
//             <Detail label="UAN Number">{bank.uanNumber || "-"}</Detail>
//             <Detail label="EPS Number">{bank.epsNumber || "-"}</Detail>
//             <Detail label="ESI Number">{bank.esiNumber || "-"}</Detail>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= UI ================= */

// function Header({ title, onBack }) {
//   return (
//     <div className="flex justify-between items-center">
//       <h2 className="text-2xl font-semibold">{title}</h2>
//       <button
//         onClick={onBack}
//         className="text-sm text-blue-600 hover:underline"
//       >
//         ← Back
//       </button>
//     </div>
//   );
// }

// function Card({ children }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
//       {children}
//     </div>
//   );
// }

// function Detail({ label, children }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-medium">{children}</p>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";
import { fetchEmployeeBank } from "../../store/bankSlice";

export default function EmployeeBankDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bank, loading } = useSelector((s) => s.bank);

  useEffect(() => {
    dispatch(fetchEmployeeBank(employeeId));
  }, [employeeId, dispatch]);

  return (
    <div className="space-y-6">
      <EmployeeActionTabs />

      <div className="p-6 space-y-6">
        <Header title="Bank Details" onBack={() => navigate(-1)} />

        {loading && <p>Loading...</p>}

        {!loading && !bank && (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600 mb-4">Bank details not added yet</p>
            <button
              onClick={() =>
                navigate(
                  `/admin/user-lists/employees/${employeeId}/add-bank-details`
                )
              }
              className="px-5 py-2 bg-indigo-600 text-white rounded"
            >
              Add Bank Details
            </button>
          </div>
        )}

        {bank && (
          <>
            <Card>
              <Detail label="Bank Name">{bank.bankName}</Detail>
              <Detail label="Account Number">{bank.bankAccountNumber}</Detail>
              <Detail label="IFSC Code">{bank.ifscCode}</Detail>
              <Detail label="PF Number">{bank.pfNumber || "-"}</Detail>
              <Detail label="PAN Number">{bank.panNumber || "-"}</Detail>
              <Detail label="UAN Number">{bank.uanNumber || "-"}</Detail>
              <Detail label="EPS Number">{bank.epsNumber || "-"}</Detail>
              <Detail label="ESI Number">{bank.esiNumber || "-"}</Detail>
            </Card>

            <div className="pt-4">
              <button
                onClick={() =>
                  navigate(
                    `/admin/user-lists/employees/${employeeId}/update-bank-details`
                  )
                }
                className="px-6 py-2 bg-indigo-600 text-white rounded"
              >
                Update Bank Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= UI ================= */

function Header({ title, onBack }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button onClick={onBack} className="text-sm text-blue-600">
        ← Back
      </button>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
      {children}
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
