// src/pages/admin/AddEmployeeBankDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addEmployeeBank,
  updateEmployeeBank,
  fetchEmployeeBank,
} from "../../store/bankSlice";

export default function AddEmployeeBankDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bank } = useSelector((s) => s.bank);
  const isEdit = Boolean(bank);

  useEffect(() => {
    dispatch(fetchEmployeeBank(employeeId));
  }, [employeeId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      bankName: e.target.bankName.value,
      bankAccountNumber: e.target.bankAccountNumber.value,
      ifscCode: e.target.ifscCode.value,
      pfNumber: e.target.pfNumber.value,
      panNumber: e.target.panNumber.value,
      uanNumber: e.target.uanNumber.value,
      epsNumber: e.target.epsNumber.value,
      esiNumber: e.target.esiNumber.value,
    };

    if (isEdit) {
      dispatch(updateEmployeeBank({ employeeId, payload }));
    } else {
      dispatch(addEmployeeBank({ employeeId, payload }));
    }

    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Update Bank Details" : "Add Bank Details"}
        </h2>
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600">
          ← Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        <Section title="Bank Details">
          <div className="grid grid-cols-2 gap-6">
            <Input label="Bank Name">
              <input
                name="bankName"
                defaultValue={bank?.bankName || ""}
                required
                className="input-base"
              />
            </Input>

            <Input label="Account Number">
              <input
                name="bankAccountNumber"
                defaultValue={bank?.bankAccountNumber || ""}
                required
                className="input-base"
              />
            </Input>

            <Input label="IFSC Code">
              <input
                name="ifscCode"
                defaultValue={bank?.ifscCode || ""}
                required
                className="input-base"
              />
            </Input>
          </div>
        </Section>

        <Section title="Compliance Details">
          <div className="grid grid-cols-2 gap-6">
            <Input label="PF Number">
              <input
                name="pfNumber"
                defaultValue={bank?.pfNumber || ""}
                className="input-base"
              />
            </Input>

            <Input label="PAN Number">
              <input
                name="panNumber"
                defaultValue={bank?.panNumber || ""}
                className="input-base"
              />
            </Input>

            <Input label="UAN Number">
              <input
                name="uanNumber"
                defaultValue={bank?.uanNumber || ""}
                className="input-base"
              />
            </Input>

            <Input label="EPS Number">
              <input
                name="epsNumber"
                defaultValue={bank?.epsNumber || ""}
                className="input-base"
              />
            </Input>

            <Input label="ESI Number">
              <input
                name="esiNumber"
                defaultValue={bank?.esiNumber || ""}
                className="input-base"
              />
            </Input>
          </div>
        </Section>

        <div className="flex justify-end pt-4 border-t">
          <button className="px-6 py-2 bg-pink-600 text-white rounded">
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= UI ================= */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold uppercase">{title}</h4>
      <div className="border-b mt-2 mb-6" />
      {children}
    </div>
  );
}

function Input({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
