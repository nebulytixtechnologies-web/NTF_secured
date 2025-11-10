// src/components/hr/ConfirmDialog.jsx
export default function ConfirmDialog({
  title = "Confirm",
  message = "Are you sure?",
  onCancel,
  onConfirm,
  loading = false,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative max-w-md w-full bg-white rounded shadow p-6 z-10">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-3 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 bg-gray-100 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
